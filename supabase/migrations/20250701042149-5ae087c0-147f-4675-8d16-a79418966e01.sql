
-- Create subscribers table for subscription management
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create usage tracking table
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL, -- Format: "2024-01"
  connections_used INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  templates_created INTEGER DEFAULT 0,
  reports_generated INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, month_year)
);

-- Create team workspaces table
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier TEXT DEFAULT 'free',
  max_members INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create workspace members table
CREATE TABLE public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'owner', 'admin', 'member'
  invited_by UUID REFERENCES auth.users(id),
  joined_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscribers
CREATE POLICY "Users can manage their own subscription" 
  ON public.subscribers 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage tracking
CREATE POLICY "Users can view their own usage" 
  ON public.usage_tracking 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for workspaces
CREATE POLICY "Users can manage workspaces they own" 
  ON public.workspaces 
  FOR ALL 
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can view workspaces they're members of" 
  ON public.workspaces 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members 
      WHERE workspace_id = id AND user_id = auth.uid()
    )
  );

-- RLS Policies for workspace members
CREATE POLICY "Workspace owners can manage members" 
  ON public.workspace_members 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.workspaces 
      WHERE id = workspace_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own workspace memberships" 
  ON public.workspace_members 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Function to get user subscription info
CREATE OR REPLACE FUNCTION public.get_user_subscription_limits(user_uuid UUID)
RETURNS TABLE (
  tier TEXT,
  max_connections INTEGER,
  max_templates INTEGER,
  max_team_members INTEGER,
  has_advanced_analytics BOOLEAN,
  has_api_access BOOLEAN
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_tier TEXT;
BEGIN
  -- Get user's subscription tier
  SELECT subscription_tier INTO user_tier
  FROM public.subscribers 
  WHERE user_id = user_uuid AND subscribed = true
  LIMIT 1;
  
  -- Default to free tier if no subscription found
  IF user_tier IS NULL THEN
    user_tier := 'free';
  END IF;
  
  -- Return limits based on tier
  CASE user_tier
    WHEN 'enterprise' THEN
      RETURN QUERY SELECT 
        'enterprise'::TEXT,
        -1, -- Unlimited
        -1, -- Unlimited  
        50,
        true,
        true;
    WHEN 'pro' THEN
      RETURN QUERY SELECT 
        'pro'::TEXT,
        -1, -- Unlimited
        -1, -- Unlimited
        10,
        true,
        false;
    ELSE -- free tier
      RETURN QUERY SELECT 
        'free'::TEXT,
        25,
        3,
        1,
        false,
        false;
  END CASE;
END;
$$;

-- Function to check if user can perform action
CREATE OR REPLACE FUNCTION public.can_user_perform_action(
  user_uuid UUID,
  action_type TEXT -- 'connection', 'template', 'message'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_month TEXT;
  current_usage INTEGER;
  user_limits RECORD;
BEGIN
  current_month := TO_CHAR(CURRENT_DATE, 'YYYY-MM');
  
  -- Get user limits
  SELECT * INTO user_limits 
  FROM public.get_user_subscription_limits(user_uuid) 
  LIMIT 1;
  
  -- If unlimited access, return true
  IF (action_type = 'connection' AND user_limits.max_connections = -1) OR
     (action_type = 'template' AND user_limits.max_templates = -1) THEN
    RETURN true;
  END IF;
  
  -- Get current usage
  IF action_type = 'connection' THEN
    SELECT COALESCE(connections_used, 0) INTO current_usage
    FROM public.usage_tracking 
    WHERE user_id = user_uuid AND month_year = current_month;
    
    RETURN COALESCE(current_usage, 0) < user_limits.max_connections;
    
  ELSIF action_type = 'template' THEN
    SELECT COUNT(*) INTO current_usage
    FROM public.message_templates 
    WHERE user_id = user_uuid;
    
    RETURN current_usage < user_limits.max_templates;
  END IF;
  
  RETURN true;
END;
$$;
