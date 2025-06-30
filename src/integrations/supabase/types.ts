export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          calls_booked: number | null
          calls_completed: number | null
          connections_accepted: number | null
          connections_sent: number | null
          created_at: string
          date: string
          deals_closed: number | null
          id: string
          messages_replied: number | null
          messages_sent: number | null
          revenue_generated: number | null
          user_id: string
        }
        Insert: {
          calls_booked?: number | null
          calls_completed?: number | null
          connections_accepted?: number | null
          connections_sent?: number | null
          created_at?: string
          date?: string
          deals_closed?: number | null
          id?: string
          messages_replied?: number | null
          messages_sent?: number | null
          revenue_generated?: number | null
          user_id: string
        }
        Update: {
          calls_booked?: number | null
          calls_completed?: number | null
          connections_accepted?: number | null
          connections_sent?: number | null
          created_at?: string
          date?: string
          deals_closed?: number | null
          id?: string
          messages_replied?: number | null
          messages_sent?: number | null
          revenue_generated?: number | null
          user_id?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          calendly_event_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          meeting_link: string | null
          next_steps: string | null
          outcome: string | null
          prospect_id: string
          reminder_sent: boolean | null
          scheduled_at: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          calendly_event_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          next_steps?: string | null
          outcome?: string | null
          prospect_id: string
          reminder_sent?: boolean | null
          scheduled_at: string
          status?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          calendly_event_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          next_steps?: string | null
          outcome?: string | null
          prospect_id?: string
          reminder_sent?: boolean | null
          scheduled_at?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_automation_rules: {
        Row: {
          auto_book_enabled: boolean | null
          booking_message_template: string | null
          created_at: string
          id: string
          min_confidence_score: number | null
          qualification_questions: string[] | null
          trigger_keywords: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_book_enabled?: boolean | null
          booking_message_template?: string | null
          created_at?: string
          id?: string
          min_confidence_score?: number | null
          qualification_questions?: string[] | null
          trigger_keywords?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_book_enabled?: boolean | null
          booking_message_template?: string | null
          created_at?: string
          id?: string
          min_confidence_score?: number | null
          qualification_questions?: string[] | null
          trigger_keywords?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      booking_conversations: {
        Row: {
          ai_confidence_score: number | null
          appointment_type: string | null
          booking_intent_detected: boolean | null
          conversation_stage: string
          created_at: string
          id: string
          last_ai_response: string | null
          prospect_id: string
          prospect_responses: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_confidence_score?: number | null
          appointment_type?: string | null
          booking_intent_detected?: boolean | null
          conversation_stage?: string
          created_at?: string
          id?: string
          last_ai_response?: string | null
          prospect_id: string
          prospect_responses?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_confidence_score?: number | null
          appointment_type?: string | null
          booking_intent_detected?: boolean | null
          conversation_stage?: string
          created_at?: string
          id?: string
          last_ai_response?: string | null
          prospect_id?: string
          prospect_responses?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_conversations_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          booked_count: number | null
          connected_count: number | null
          created_at: string
          daily_connection_limit: number | null
          daily_message_limit: number | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          replied_count: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["campaign_status"]
          target_company_size_max: number | null
          target_company_size_min: number | null
          target_industry: string | null
          target_title: string[] | null
          total_prospects: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          booked_count?: number | null
          connected_count?: number | null
          created_at?: string
          daily_connection_limit?: number | null
          daily_message_limit?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          replied_count?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          target_company_size_max?: number | null
          target_company_size_min?: number | null
          target_industry?: string | null
          target_title?: string[] | null
          total_prospects?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          booked_count?: number | null
          connected_count?: number | null
          created_at?: string
          daily_connection_limit?: number | null
          daily_message_limit?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          replied_count?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          target_company_size_max?: number | null
          target_company_size_min?: number | null
          target_industry?: string | null
          target_title?: string[] | null
          total_prospects?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string
          description: string | null
          domain: string | null
          employee_count_max: number | null
          employee_count_min: number | null
          glassdoor_rating: number | null
          id: string
          industry: string | null
          linkedin_url: string | null
          location: string | null
          name: string
          recent_funding: string | null
          tech_stack: string[] | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          domain?: string | null
          employee_count_max?: number | null
          employee_count_min?: number | null
          glassdoor_rating?: number | null
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          location?: string | null
          name: string
          recent_funding?: string | null
          tech_stack?: string[] | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          domain?: string | null
          employee_count_max?: number | null
          employee_count_min?: number | null
          glassdoor_rating?: number | null
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          recent_funding?: string | null
          tech_stack?: string[] | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      interactions: {
        Row: {
          campaign_id: string | null
          clicked: boolean | null
          created_at: string
          id: string
          message: string | null
          opened: boolean | null
          prospect_id: string
          replied: boolean | null
          response_content: string | null
          response_received_at: string | null
          sent_at: string
          sentiment_score: number | null
          subject: string | null
          template_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          campaign_id?: string | null
          clicked?: boolean | null
          created_at?: string
          id?: string
          message?: string | null
          opened?: boolean | null
          prospect_id: string
          replied?: boolean | null
          response_content?: string | null
          response_received_at?: string | null
          sent_at?: string
          sentiment_score?: number | null
          subject?: string | null
          template_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          campaign_id?: string | null
          clicked?: boolean | null
          created_at?: string
          id?: string
          message?: string | null
          opened?: boolean | null
          prospect_id?: string
          replied?: boolean | null
          response_content?: string | null
          response_received_at?: string | null
          sent_at?: string
          sentiment_score?: number | null
          subject?: string | null
          template_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "message_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          industry_specific: string | null
          name: string
          performance_score: number | null
          response_rate: number | null
          subject: string | null
          times_used: number | null
          type: Database["public"]["Enums"]["message_type"]
          updated_at: string
          user_id: string
          variables: string[] | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          industry_specific?: string | null
          name: string
          performance_score?: number | null
          response_rate?: number | null
          subject?: string | null
          times_used?: number | null
          type: Database["public"]["Enums"]["message_type"]
          updated_at?: string
          user_id: string
          variables?: string[] | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          industry_specific?: string | null
          name?: string
          performance_score?: number | null
          response_rate?: number | null
          subject?: string | null
          times_used?: number | null
          type?: Database["public"]["Enums"]["message_type"]
          updated_at?: string
          user_id?: string
          variables?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      prospects: {
        Row: {
          company_id: string | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          interests: string[] | null
          last_interaction_at: string | null
          last_name: string
          lead_score: number | null
          linkedin_url: string | null
          location: string | null
          mutual_connections: number | null
          next_followup_at: string | null
          notes: string | null
          pain_points: string[] | null
          phone: string | null
          recent_posts: string[] | null
          response_likelihood: number | null
          status: Database["public"]["Enums"]["prospect_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          interests?: string[] | null
          last_interaction_at?: string | null
          last_name: string
          lead_score?: number | null
          linkedin_url?: string | null
          location?: string | null
          mutual_connections?: number | null
          next_followup_at?: string | null
          notes?: string | null
          pain_points?: string[] | null
          phone?: string | null
          recent_posts?: string[] | null
          response_likelihood?: number | null
          status?: Database["public"]["Enums"]["prospect_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          interests?: string[] | null
          last_interaction_at?: string | null
          last_name?: string
          lead_score?: number | null
          linkedin_url?: string | null
          location?: string | null
          mutual_connections?: number | null
          next_followup_at?: string | null
          notes?: string | null
          pain_points?: string[] | null
          phone?: string | null
          recent_posts?: string[] | null
          response_likelihood?: number | null
          status?: Database["public"]["Enums"]["prospect_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prospects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          auto_follow_up: boolean | null
          business_hours_end: string | null
          business_hours_start: string | null
          calendly_link: string | null
          company_description: string | null
          company_name: string | null
          created_at: string
          daily_connection_limit: number | null
          daily_message_limit: number | null
          follow_up_delay_hours: number | null
          id: string
          linkedin_username: string | null
          signature: string | null
          timezone: string | null
          updated_at: string
          user_id: string
          value_proposition: string | null
        }
        Insert: {
          auto_follow_up?: boolean | null
          business_hours_end?: string | null
          business_hours_start?: string | null
          calendly_link?: string | null
          company_description?: string | null
          company_name?: string | null
          created_at?: string
          daily_connection_limit?: number | null
          daily_message_limit?: number | null
          follow_up_delay_hours?: number | null
          id?: string
          linkedin_username?: string | null
          signature?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
          value_proposition?: string | null
        }
        Update: {
          auto_follow_up?: boolean | null
          business_hours_end?: string | null
          business_hours_start?: string | null
          calendly_link?: string | null
          company_description?: string | null
          company_name?: string | null
          created_at?: string
          daily_connection_limit?: number | null
          daily_message_limit?: number | null
          follow_up_delay_hours?: number | null
          id?: string
          linkedin_username?: string | null
          signature?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
          value_proposition?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_lead_score: {
        Args: { prospect_uuid: string }
        Returns: number
      }
    }
    Enums: {
      campaign_status: "draft" | "active" | "paused" | "completed"
      message_type:
        | "connection_request"
        | "follow_up"
        | "value_add"
        | "re_engagement"
        | "booking_request"
      prospect_status:
        | "researched"
        | "connection_sent"
        | "connected"
        | "message_sent"
        | "replied"
        | "call_booked"
        | "call_completed"
        | "qualified"
        | "closed_won"
        | "closed_lost"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      campaign_status: ["draft", "active", "paused", "completed"],
      message_type: [
        "connection_request",
        "follow_up",
        "value_add",
        "re_engagement",
        "booking_request",
      ],
      prospect_status: [
        "researched",
        "connection_sent",
        "connected",
        "message_sent",
        "replied",
        "call_booked",
        "call_completed",
        "qualified",
        "closed_won",
        "closed_lost",
      ],
    },
  },
} as const
