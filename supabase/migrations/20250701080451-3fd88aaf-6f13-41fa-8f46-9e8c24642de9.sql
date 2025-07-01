
-- Drop the existing function first
DROP FUNCTION IF EXISTS public.get_adjusted_usage_limits(uuid);

-- Add AI template generation tracking to usage_tracking table
ALTER TABLE public.usage_tracking 
ADD COLUMN IF NOT EXISTS ai_templates_generated INTEGER DEFAULT 0;

-- Create the updated get_adjusted_usage_limits function with AI template limits
CREATE OR REPLACE FUNCTION public.get_adjusted_usage_limits(user_uuid uuid)
RETURNS TABLE(
  max_connections integer, 
  max_templates integer, 
  max_ai_templates integer,
  requires_verification boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_tier TEXT;
  is_verified BOOLEAN;
  is_flagged BOOLEAN;
BEGIN
  -- Get user's subscription and verification status
  SELECT s.subscription_tier, p.phone_verified, s.is_flagged_duplicate
  INTO user_tier, is_verified, is_flagged
  FROM public.subscribers s
  LEFT JOIN public.profiles p ON p.id = s.user_id
  WHERE s.user_id = user_uuid
  LIMIT 1;
  
  -- Default values
  IF user_tier IS NULL THEN user_tier := 'free'; END IF;
  IF is_verified IS NULL THEN is_verified := false; END IF;
  IF is_flagged IS NULL THEN is_flagged := false; END IF;
  
  -- Return limits based on tier and verification
  CASE user_tier
    WHEN 'enterprise' THEN
      RETURN QUERY SELECT -1, -1, -1, false; -- Unlimited
    WHEN 'pro' THEN
      RETURN QUERY SELECT -1, -1, 100, false; -- 100 AI templates per month
    ELSE -- free tier
      IF is_flagged OR NOT is_verified THEN
        -- Stricter limits for unverified/flagged accounts
        RETURN QUERY SELECT 5, 1, 2, true; -- 2 AI templates for unverified
      ELSE
        -- Normal free tier limits for verified accounts
        RETURN QUERY SELECT 25, 3, 10, false; -- 10 AI templates per month
      END IF;
  END CASE;
END;
$$;

-- Function to check if user can generate AI templates
CREATE OR REPLACE FUNCTION public.can_generate_ai_template(user_uuid uuid)
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
  FROM public.get_adjusted_usage_limits(user_uuid) 
  LIMIT 1;
  
  -- If unlimited access, return true
  IF user_limits.max_ai_templates = -1 THEN
    RETURN true;
  END IF;
  
  -- Get current AI template usage
  SELECT COALESCE(ai_templates_generated, 0) INTO current_usage
  FROM public.usage_tracking 
  WHERE user_id = user_uuid AND month_year = current_month;
  
  RETURN COALESCE(current_usage, 0) < user_limits.max_ai_templates;
END;
$$;

-- Function to increment AI template usage
CREATE OR REPLACE FUNCTION public.increment_ai_template_usage(user_uuid uuid)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_month TEXT;
BEGIN
  current_month := TO_CHAR(CURRENT_DATE, 'YYYY-MM');
  
  -- Insert or update usage tracking
  INSERT INTO public.usage_tracking (user_id, month_year, ai_templates_generated)
  VALUES (user_uuid, current_month, 1)
  ON CONFLICT (user_id, month_year)
  DO UPDATE SET 
    ai_templates_generated = usage_tracking.ai_templates_generated + 1,
    updated_at = now();
END;
$$;
