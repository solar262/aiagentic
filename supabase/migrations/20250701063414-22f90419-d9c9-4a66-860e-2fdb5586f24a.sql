
-- Add anti-abuse tracking tables
CREATE TABLE public.device_fingerprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint_hash TEXT NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_count INTEGER DEFAULT 1,
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Track user sessions and IP addresses
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address INET NOT NULL,
  fingerprint_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add phone verification to profiles
ALTER TABLE public.profiles 
ADD COLUMN phone_number TEXT,
ADD COLUMN phone_verified BOOLEAN DEFAULT false,
ADD COLUMN phone_verified_at TIMESTAMPTZ;

-- Add stricter usage limits
ALTER TABLE public.subscribers
ADD COLUMN account_creation_ip INET,
ADD COLUMN is_flagged_duplicate BOOLEAN DEFAULT false,
ADD COLUMN verification_required BOOLEAN DEFAULT false;

-- Enable RLS on new tables
ALTER TABLE public.device_fingerprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for device fingerprints (admin only)
CREATE POLICY "Only service can manage fingerprints" 
  ON public.device_fingerprints 
  FOR ALL 
  USING (false);

-- RLS policies for user sessions
CREATE POLICY "Users can view their own sessions" 
  ON public.user_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Function to detect suspicious account creation
CREATE OR REPLACE FUNCTION public.detect_duplicate_account(
  user_email TEXT,
  user_ip INET,
  device_fingerprint TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  ip_user_count INTEGER;
  fingerprint_user_count INTEGER;
BEGIN
  -- Check how many users from this IP
  SELECT COUNT(DISTINCT user_id) INTO ip_user_count
  FROM public.user_sessions 
  WHERE ip_address = user_ip;
  
  -- Check how many users with this fingerprint
  SELECT user_count INTO fingerprint_user_count
  FROM public.device_fingerprints 
  WHERE fingerprint_hash = device_fingerprint;
  
  -- Flag as suspicious if more than 2 accounts from same IP or device
  IF ip_user_count >= 2 OR fingerprint_user_count >= 2 THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Function to update usage limits based on verification status
CREATE OR REPLACE FUNCTION public.get_adjusted_usage_limits(user_uuid UUID)
RETURNS TABLE (
  max_connections INTEGER,
  max_templates INTEGER,
  requires_verification BOOLEAN
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
      RETURN QUERY SELECT -1, -1, false;
    WHEN 'pro' THEN
      RETURN QUERY SELECT -1, -1, false;
    ELSE -- free tier
      IF is_flagged OR NOT is_verified THEN
        -- Stricter limits for unverified/flagged accounts
        RETURN QUERY SELECT 5, 1, true;
      ELSE
        -- Normal free tier limits for verified accounts
        RETURN QUERY SELECT 25, 3, false;
      END IF;
  END CASE;
END;
$$;
