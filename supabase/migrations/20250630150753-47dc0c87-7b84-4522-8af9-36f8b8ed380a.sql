
-- Create table for tracking automated booking conversations
CREATE TABLE public.booking_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  conversation_stage TEXT NOT NULL DEFAULT 'initial' CHECK (conversation_stage IN ('initial', 'qualifying', 'booking_ready', 'appointment_booked', 'completed')),
  ai_confidence_score NUMERIC(3,2) DEFAULT 0.0 CHECK (ai_confidence_score >= 0.0 AND ai_confidence_score <= 1.0),
  last_ai_response TEXT,
  prospect_responses TEXT[],
  booking_intent_detected BOOLEAN DEFAULT false,
  appointment_type TEXT DEFAULT 'consultation' CHECK (appointment_type IN ('discovery', 'consultation', 'strategy')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for automated booking rules
CREATE TABLE public.booking_automation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  trigger_keywords TEXT[] DEFAULT ARRAY['interested', 'meeting', 'call', 'schedule', 'consultation', 'discuss'],
  qualification_questions TEXT[] DEFAULT ARRAY['What challenges are you facing with employee retention?', 'How large is your HR team?', 'What''s your current approach to building company culture?'],
  booking_message_template TEXT DEFAULT 'Great! I''d love to schedule a consultation to discuss how we can help build a people-first culture at {company_name}. I have availability for a 60-minute session this week. What works best for your schedule?',
  auto_book_enabled BOOLEAN DEFAULT true,
  min_confidence_score NUMERIC(3,2) DEFAULT 0.75,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for booking tables
ALTER TABLE public.booking_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_automation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own booking conversations" 
  ON public.booking_conversations 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own booking rules" 
  ON public.booking_automation_rules 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert default booking automation rules for new users
INSERT INTO public.booking_automation_rules (user_id, trigger_keywords, qualification_questions, booking_message_template)
SELECT 
  id as user_id,
  ARRAY['interested', 'meeting', 'call', 'schedule', 'consultation', 'discuss', 'learn more', 'tell me more'],
  ARRAY['What challenges are you facing with employee retention?', 'How large is your HR team currently?', 'What''s your biggest people-first culture goal?'],
  'I''d love to schedule a consultation to discuss how The Peoples Partner can help build a stronger people-first culture at ' || COALESCE(company_name, 'your organization') || '. I have availability for a 60-minute consultation this week. What day and time works best for you?'
FROM public.profiles 
WHERE NOT EXISTS (
  SELECT 1 FROM public.booking_automation_rules 
  WHERE booking_automation_rules.user_id = profiles.id
);
