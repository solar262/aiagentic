import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Calendar, 
  MessageSquare, 
  Settings, 
  CheckCircle, 
  Clock,
  TrendingUp
} from "lucide-react";
import { ProspectInteractionDemo } from "./ProspectInteractionDemo";

interface BookingConversation {
  id: string;
  prospect_id: string;
  conversation_stage: string;
  ai_confidence_score: number;
  booking_intent_detected: boolean;
  appointment_type: string;
  created_at: string;
  prospects: {
    first_name: string;
    last_name: string;
    title: string;
    companies: {
      name: string;
    };
  };
}

interface BookingRules {
  id: string;
  auto_book_enabled: boolean;
  min_confidence_score: number;
  booking_message_template: string;
  trigger_keywords: string[];
}

interface BookingAgentProps {
  user: any;
}

export const BookingAgent = ({ user }: BookingAgentProps) => {
  const [conversations, setConversations] = useState<BookingConversation[]>([]);
  const [rules, setRules] = useState<BookingRules | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalConversations: 0,
    bookingReady: 0,
    appointmentsBooked: 0,
    avgConfidenceScore: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load booking conversations
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('booking_conversations')
        .select(`
          *,
          prospects (
            first_name,
            last_name,
            title,
            companies (name)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (conversationsError) throw conversationsError;

      // Load booking rules
      const { data: rulesData, error: rulesError } = await supabase
        .from('booking_automation_rules')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (rulesError && rulesError.code !== 'PGRST116') throw rulesError;

      setConversations(conversationsData || []);
      setRules(rulesData);

      // Calculate stats
      const totalConversations = conversationsData?.length || 0;
      const bookingReady = conversationsData?.filter(c => c.conversation_stage === 'booking_ready').length || 0;
      const appointmentsBooked = conversationsData?.filter(c => c.conversation_stage === 'appointment_booked').length || 0;
      const avgConfidenceScore = conversationsData?.length > 0 
        ? conversationsData.reduce((sum, c) => sum + c.ai_confidence_score, 0) / conversationsData.length 
        : 0;

      setStats({
        totalConversations,
        bookingReady,
        appointmentsBooked,
        avgConfidenceScore: Math.round(avgConfidenceScore * 100)
      });

    } catch (error) {
      console.error('Error loading booking agent data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingRules = async (updatedRules: Partial<BookingRules>) => {
    if (!rules) return;

    try {
      const { error } = await supabase
        .from('booking_automation_rules')
        .update(updatedRules)
        .eq('id', rules.id);

      if (error) throw error;

      setRules({ ...rules, ...updatedRules });
      toast({
        title: "Settings updated",
        description: "Your booking automation rules have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking rules.",
        variant: "destructive",
      });
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'initial': return 'bg-gray-100 text-gray-800';
      case 'qualifying': return 'bg-blue-100 text-blue-800';
      case 'booking_ready': return 'bg-green-100 text-green-800';
      case 'appointment_booked': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'initial': return 'Initial Contact';
      case 'qualifying': return 'Qualifying';
      case 'booking_ready': return 'Ready to Book';
      case 'appointment_booked': return 'Appointment Booked';
      case 'completed': return 'Completed';
      default: return stage;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Bot className="w-8 h-8 animate-pulse text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading AI Booking Agent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations}</div>
            <p className="text-xs text-slate-600">AI-managed prospects</p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Book</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bookingReady}</div>
            <p className="text-xs text-slate-600">Qualified prospects</p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked Appointments</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointmentsBooked}</div>
            <p className="text-xs text-slate-600">Scheduled consultations</p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgConfidenceScore}%</div>
            <p className="text-xs text-slate-600">AI accuracy score</p>
          </CardContent>
        </Card>
      </div>

      {/* Demo Section */}
      <ProspectInteractionDemo user={user} />

      {/* Agent Settings */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <span>AI Booking Agent Settings</span>
          </CardTitle>
          <CardDescription>
            Configure how the AI agent qualifies prospects and books consultation appointments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {rules && (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-booking">Auto-Booking Enabled</Label>
                  <p className="text-sm text-slate-600">Allow AI to automatically book consultations</p>
                </div>
                <Switch
                  id="auto-booking"
                  checked={rules.auto_book_enabled}
                  onCheckedChange={(checked) => updateBookingRules({ auto_book_enabled: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence-threshold">Minimum Confidence Score: {Math.round(rules.min_confidence_score * 100)}%</Label>
                <input
                  id="confidence-threshold"
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.05"
                  value={rules.min_confidence_score}
                  onChange={(e) => updateBookingRules({ min_confidence_score: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <p className="text-sm text-slate-600">AI confidence required before booking appointments</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-template">Booking Message Template</Label>
                <Textarea
                  id="booking-template"
                  value={rules.booking_message_template}
                  onChange={(e) => updateBookingRules({ booking_message_template: e.target.value })}
                  placeholder="Template for booking consultation appointments..."
                  rows={4}
                />
                <p className="text-sm text-slate-600">Use {`{company_name}`} for dynamic company names</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Active Conversations */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>Active AI Conversations</span>
          </CardTitle>
          <CardDescription>
            Prospects currently being managed by the AI booking agent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {conversations.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No Active Conversations</h3>
              <p className="text-slate-600">The AI agent will start managing conversations once prospects engage.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div key={conversation.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {conversation.prospects?.first_name} {conversation.prospects?.last_name}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {conversation.prospects?.title} at {conversation.prospects?.companies?.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStageColor(conversation.conversation_stage)}>
                        {getStageLabel(conversation.conversation_stage)}
                      </Badge>
                      {conversation.booking_intent_detected && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <Calendar className="w-3 h-3 mr-1" />
                          Booking Intent
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Confidence: {Math.round(conversation.ai_confidence_score * 100)}%</span>
                    <span>Type: {conversation.appointment_type}</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(conversation.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
