
-- Clean up duplicate policies on message_templates table
DROP POLICY IF EXISTS "Users can view their own templates" ON public.message_templates;
DROP POLICY IF EXISTS "Users can create their own templates" ON public.message_templates;
DROP POLICY IF EXISTS "Users can update their own templates" ON public.message_templates;
DROP POLICY IF EXISTS "Users can delete their own templates" ON public.message_templates;

-- Ensure we have clean, single policies for message_templates
DROP POLICY IF EXISTS "Users can view their own message templates" ON public.message_templates;
DROP POLICY IF EXISTS "Users can create their own message templates" ON public.message_templates;
DROP POLICY IF EXISTS "Users can update their own message templates" ON public.message_templates;
DROP POLICY IF EXISTS "Users can delete their own message templates" ON public.message_templates;

-- Create single, clean policies
CREATE POLICY "Users can manage their own message templates" 
  ON public.message_templates 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Clean up any duplicate policies on other tables
DROP POLICY IF EXISTS "Users can view their own prospects" ON public.prospects;
DROP POLICY IF EXISTS "Users can create their own prospects" ON public.prospects;
DROP POLICY IF EXISTS "Users can update their own prospects" ON public.prospects;
DROP POLICY IF EXISTS "Users can delete their own prospects" ON public.prospects;

CREATE POLICY "Users can manage their own prospects" 
  ON public.prospects 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Clean up interactions table
DROP POLICY IF EXISTS "Users can view their own interactions" ON public.interactions;
DROP POLICY IF EXISTS "Users can create their own interactions" ON public.interactions;
DROP POLICY IF EXISTS "Users can update their own interactions" ON public.interactions;

CREATE POLICY "Users can manage their own interactions" 
  ON public.interactions 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Clean up campaigns table
DROP POLICY IF EXISTS "Users can view their own campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Users can create their own campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Users can update their own campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Users can delete their own campaigns" ON public.campaigns;

CREATE POLICY "Users can manage their own campaigns" 
  ON public.campaigns 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Clean up appointments table
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can create their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;

CREATE POLICY "Users can manage their own appointments" 
  ON public.appointments 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Clean up analytics table
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.analytics;
DROP POLICY IF EXISTS "Users can create their own analytics" ON public.analytics;
DROP POLICY IF EXISTS "Users can update their own analytics" ON public.analytics;

CREATE POLICY "Users can manage their own analytics" 
  ON public.analytics 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Clean up user_settings table
DROP POLICY IF EXISTS "Users can view their own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can create their own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can update their own settings" ON public.user_settings;

CREATE POLICY "Users can manage their own settings" 
  ON public.user_settings 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
