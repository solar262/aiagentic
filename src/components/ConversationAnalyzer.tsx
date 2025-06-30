
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ConversationAnalyzerProps {
  userId: string;
}

export class ConversationAnalyzer {
  private userId: string;
  private toast: any;

  constructor(userId: string, toast: any) {
    this.userId = userId;
    this.toast = toast;
  }

  async analyzeResponse(prospectId: string, responseText: string): Promise<{
    bookingIntent: boolean;
    confidenceScore: number;
    nextStage: string;
    suggestedResponse: string;
  }> {
    try {
      // Get booking rules for this user
      const { data: rules } = await supabase
        .from('booking_automation_rules')
        .select('*')
        .eq('user_id', this.userId)
        .single();

      if (!rules) {
        throw new Error('No booking rules found');
      }

      // Simple AI-like analysis (in production, this would call an AI service)
      const bookingIntent = this.detectBookingIntent(responseText, rules.trigger_keywords);
      const confidenceScore = this.calculateConfidenceScore(responseText, rules.trigger_keywords);
      
      // Determine next conversation stage
      let nextStage = 'initial';
      if (bookingIntent && confidenceScore >= rules.min_confidence_score) {
        nextStage = 'booking_ready';
      } else if (bookingIntent) {
        nextStage = 'qualifying';
      }

      // Generate suggested response
      const suggestedResponse = await this.generateResponse(
        prospectId, 
        responseText, 
        bookingIntent, 
        nextStage,
        rules
      );

      return {
        bookingIntent,
        confidenceScore,
        nextStage,
        suggestedResponse
      };

    } catch (error) {
      console.error('Error analyzing conversation:', error);
      throw error;
    }
  }

  private detectBookingIntent(text: string, triggerKeywords: string[]): boolean {
    const lowerText = text.toLowerCase();
    return triggerKeywords.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
  }

  private calculateConfidenceScore(text: string, triggerKeywords: string[]): number {
    const lowerText = text.toLowerCase();
    let score = 0;

    // Check for trigger keywords
    const keywordMatches = triggerKeywords.filter(keyword => 
      lowerText.includes(keyword.toLowerCase())
    ).length;
    
    score += (keywordMatches / triggerKeywords.length) * 0.4;

    // Check for positive sentiment indicators
    const positiveWords = ['yes', 'interested', 'definitely', 'absolutely', 'sounds good', 'great'];
    const positiveMatches = positiveWords.filter(word => 
      lowerText.includes(word)
    ).length;
    
    score += (positiveMatches / positiveWords.length) * 0.3;

    // Check for urgency indicators
    const urgencyWords = ['soon', 'quickly', 'asap', 'urgent', 'this week', 'tomorrow'];
    const urgencyMatches = urgencyWords.filter(word => 
      lowerText.includes(word)
    ).length;
    
    score += (urgencyMatches / urgencyWords.length) * 0.3;

    return Math.min(score, 1.0);
  }

  private async generateResponse(
    prospectId: string, 
    responseText: string, 
    bookingIntent: boolean, 
    stage: string,
    rules: any
  ): Promise<string> {
    // Get prospect and company information
    const { data: prospect } = await supabase
      .from('prospects')
      .select(`
        *,
        companies (name)
      `)
      .eq('id', prospectId)
      .single();

    if (!prospect) return '';

    const companyName = prospect.companies?.name || 'your organization';
    const firstName = prospect.first_name;

    if (stage === 'booking_ready') {
      return rules.booking_message_template.replace('{company_name}', companyName);
    } else if (stage === 'qualifying') {
      const randomQuestion = rules.qualification_questions[
        Math.floor(Math.random() * rules.qualification_questions.length)
      ];
      return `Hi ${firstName}, thanks for your interest! ${randomQuestion}`;
    } else {
      return `Hi ${firstName}, I appreciate you taking the time to connect. I'd love to learn more about ${companyName}'s people-first culture goals. What's your biggest challenge when it comes to employee retention?`;
    }
  }

  async updateConversation(
    prospectId: string, 
    analysis: {
      bookingIntent: boolean;
      confidenceScore: number;
      nextStage: string;
      suggestedResponse: string;
    },
    prospectResponse: string
  ) {
    try {
      // Check if conversation exists
      const { data: existing } = await supabase
        .from('booking_conversations')
        .select('*')
        .eq('prospect_id', prospectId)
        .eq('user_id', this.userId)
        .single();

      const conversationData = {
        prospect_id: prospectId,
        user_id: this.userId,
        conversation_stage: analysis.nextStage,
        ai_confidence_score: analysis.confidenceScore,
        last_ai_response: analysis.suggestedResponse,
        booking_intent_detected: analysis.bookingIntent,
        updated_at: new Date().toISOString()
      };

      if (existing) {
        // Update existing conversation
        const currentResponses = existing.prospect_responses || [];
        const { error } = await supabase
          .from('booking_conversations')
          .update({
            ...conversationData,
            prospect_responses: [...currentResponses, prospectResponse]
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new conversation
        const { error } = await supabase
          .from('booking_conversations')
          .insert({
            ...conversationData,
            prospect_responses: [prospectResponse]
          });

        if (error) throw error;
      }

      // If booking ready, potentially create appointment
      if (analysis.nextStage === 'booking_ready') {
        await this.createPendingAppointment(prospectId);
      }

    } catch (error) {
      console.error('Error updating conversation:', error);
      throw error;
    }
  }

  private async createPendingAppointment(prospectId: string) {
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          prospect_id: prospectId,
          user_id: this.userId,
          title: 'AI-Booked Consultation',
          description: 'Consultation booking automatically initiated by AI agent',
          status: 'pending_confirmation',
          scheduled_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
          duration_minutes: 60
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating pending appointment:', error);
    }
  }
}

export const useConversationAnalyzer = (userId: string) => {
  const { toast } = useToast();
  const [analyzer] = useState(() => new ConversationAnalyzer(userId, toast));
  
  return analyzer;
};
