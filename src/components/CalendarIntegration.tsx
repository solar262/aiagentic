
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Settings, 
  CheckCircle,
  AlertCircle,
  Link,
  User,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CalendarIntegrationProps {
  user?: any;
}

export const CalendarIntegration = ({ user }: CalendarIntegrationProps) => {
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({
    discovery: "30 min",
    strategy: "45 min",
    consultation: "60 min"
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user settings
  const { data: userSettings } = useQuery({
    queryKey: ['user_settings', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Fetch real appointments
  const { data: appointments = [] } = useQuery({
    queryKey: ['appointments', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('appointments')
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
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })
        .limit(10);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  const isConnected = !!(userSettings?.calendly_link || calendlyUrl);

  React.useEffect(() => {
    if (userSettings?.calendly_link) {
      setCalendlyUrl(userSettings.calendly_link);
    }
  }, [userSettings]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (newUrl: string) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          calendly_link: newUrl,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Calendar Settings Saved",
        description: "Your calendar integration settings have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['user_settings', user?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSaveSettings = () => {
    updateSettingsMutation.mutate(calendlyUrl);
  };

  const handleTestIntegration = () => {
    const urlToTest = calendlyUrl || userSettings?.calendly_link;
    if (!urlToTest) {
      toast({
        title: "No Calendar URL",
        description: "Please enter your Calendly URL first.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Integration Test",
      description: "Opening your calendar link to test the integration.",
    });
    window.open(urlToTest, '_blank');
  };

  const handleOpenCalendar = () => {
    const urlToOpen = calendlyUrl || userSettings?.calendly_link;
    if (urlToOpen) {
      window.open(urlToOpen, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Calendar Integration</h2>
          <p className="text-slate-600">Manage your meeting scheduling and calendar settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{isConnected ? "Connected" : "Not Connected"}</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Settings */}
        <div className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Calendar Configuration</span>
              </CardTitle>
              <CardDescription>
                Configure your calendar settings for automated meeting booking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calendly-url">Calendar Booking URL (Calendly, Cal.com, etc.)</Label>
                <Input
                  id="calendly-url"
                  value={calendlyUrl}
                  onChange={(e) => setCalendlyUrl(e.target.value)}
                  placeholder="https://calendly.com/your-profile/meeting"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Discovery Call Duration</Label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-md"
                    value={selectedTimeSlots.discovery}
                    onChange={(e) => setSelectedTimeSlots({...selectedTimeSlots, discovery: e.target.value})}
                  >
                    <option value="15 min">15 minutes</option>
                    <option value="30 min">30 minutes</option>
                    <option value="45 min">45 minutes</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Strategy Call Duration</Label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-md"
                    value={selectedTimeSlots.strategy}
                    onChange={(e) => setSelectedTimeSlots({...selectedTimeSlots, strategy: e.target.value})}
                  >
                    <option value="30 min">30 minutes</option>
                    <option value="45 min">45 minutes</option>
                    <option value="60 min">60 minutes</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Consultation Duration</Label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-md"
                    value={selectedTimeSlots.consultation}
                    onChange={(e) => setSelectedTimeSlots({...selectedTimeSlots, consultation: e.target.value})}
                  >
                    <option value="45 min">45 minutes</option>
                    <option value="60 min">60 minutes</option>
                    <option value="90 min">90 minutes</option>
                  </select>
                </div>
              </div>

              {isConnected ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Calendar integration is active. Meeting requests will automatically use your configured booking URL.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Enter your calendar booking URL to enable automated meeting scheduling.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-2">
                <Button onClick={handleSaveSettings} className="flex-1" disabled={updateSettingsMutation.isPending}>
                  {updateSettingsMutation.isPending ? 'Saving...' : 'Save Settings'}
                </Button>
                <Button variant="outline" onClick={handleTestIntegration}>
                  Test Integration
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
            <CardHeader>
              <CardTitle>Meeting Analytics</CardTitle>
              <CardDescription className="text-green-100">
                Track your meeting performance and booking rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-green-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">Scheduled Meetings</p>
                    <Badge className="bg-white text-green-600">{appointments.length}</Badge>
                  </div>
                  <p className="text-sm text-green-100">Total upcoming appointments</p>
                </div>
                <div className="bg-green-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">Booking Rate</p>
                    <Badge className="bg-white text-green-600">
                      {appointments.length > 0 ? 'Active' : 'Getting Started'}
                    </Badge>
                  </div>
                  <p className="text-sm text-green-100">Conversation to meeting conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Meetings */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>Upcoming Meetings</span>
            </CardTitle>
            <CardDescription>Your scheduled conversations with prospects</CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Meetings Scheduled</h3>
                <p className="text-slate-600 mb-4">
                  Start booking meetings with your prospects to see them here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => {
                  const prospect = appointment.prospects;
                  const company = prospect?.companies;
                  const scheduledDate = new Date(appointment.scheduled_at);
                  
                  return (
                    <div key={appointment.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                            {prospect ? `${prospect.first_name?.[0] || ''}${prospect.last_name?.[0] || ''}` : 'U'}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {prospect ? `${prospect.first_name} ${prospect.last_name}` : 'Unknown Contact'}
                            </p>
                            <p className="text-sm text-slate-600">{prospect?.title || 'No title'}</p>
                            <p className="text-sm text-slate-500">{company?.name || 'No company'}</p>
                          </div>
                        </div>
                        <Badge variant={appointment.status === "scheduled" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">{scheduledDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">{scheduledDate.toLocaleTimeString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-slate-900">{appointment.title}</span>
                          <span className="text-sm text-slate-500">{appointment.duration_minutes} min</span>
                        </div>
                        <div className="flex space-x-2">
                          {appointment.meeting_link && (
                            <Button variant="ghost" size="sm" onClick={() => window.open(appointment.meeting_link, '_blank')}>
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {appointments.length > 0 && (
              <Button variant="ghost" className="w-full mt-4">
                View All Meetings
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Calendar Embed Preview */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="w-5 h-5 text-blue-600" />
            <span>Calendar Booking Preview</span>
          </CardTitle>
          <CardDescription>
            This is how your calendar will appear when prospects click to book a meeting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 p-8 rounded-lg text-center">
            <div className="max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Schedule a Meeting</h3>
              <p className="text-slate-600 mb-4">
                Book a consultation to discuss your business needs and explore how we can help.
              </p>
              {(calendlyUrl || userSettings?.calendly_link) ? (
                <Button 
                  className="w-full" 
                  onClick={handleOpenCalendar}
                >
                  Open Calendar
                </Button>
              ) : (
                <Button className="w-full" disabled>
                  Configure Calendar URL First
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-3 text-center">
            Preview of your calendar booking page integration
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
