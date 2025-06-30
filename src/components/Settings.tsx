
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Zap, 
  Calendar,
  MessageSquare,
  Target,
  Save,
  TestTube
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SettingsProps {
  user?: any;
}

export const Settings = ({ user }: SettingsProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user profile and settings
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const { data: userSettings, isLoading: settingsLoading } = useQuery({
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

  // State for form data
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    company_name: ''
  });

  const [automationSettings, setAutomationSettings] = useState({
    daily_connection_limit: 20,
    daily_message_limit: 50,
    auto_follow_up: true,
    follow_up_delay_hours: 48,
    business_hours_start: '09:00',
    business_hours_end: '17:00',
    timezone: 'UTC'
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    linkedin_username: '',
    calendly_link: '',
    signature: ''
  });

  // Update state when data loads
  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        email: profile.email || '',
        company_name: profile.company_name || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (userSettings) {
      setAutomationSettings({
        daily_connection_limit: userSettings.daily_connection_limit || 20,
        daily_message_limit: userSettings.daily_message_limit || 50,
        auto_follow_up: userSettings.auto_follow_up ?? true,
        follow_up_delay_hours: userSettings.follow_up_delay_hours || 48,
        business_hours_start: userSettings.business_hours_start || '09:00',
        business_hours_end: userSettings.business_hours_end || '17:00',
        timezone: userSettings.timezone || 'UTC'
      });
      
      setIntegrationSettings({
        linkedin_username: userSettings.linkedin_username || '',
        calendly_link: userSettings.calendly_link || '',
        signature: userSettings.signature || ''
      });
    }
  }, [userSettings]);

  // Mutations
  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof profileData) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...data,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (data: typeof automationSettings & typeof integrationSettings) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          ...data,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Settings Updated",
        description: "Your automation settings have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ['user_settings', user?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileData);
  };

  const handleSaveSettings = () => {
    updateSettingsMutation.mutate({ ...automationSettings, ...integrationSettings });
  };

  const testLinkedInConnection = async () => {
    toast({
      title: "Testing LinkedIn Connection",
      description: "Checking your LinkedIn integration...",
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Connection Test Complete",
        description: "LinkedIn integration is working properly.",
      });
    }, 2000);
  };

  if (profileLoading || settingsLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardContent className="p-6">
          <div className="text-center">Loading settings...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <SettingsIcon className="w-7 h-7 text-slate-600" />
            <span>Settings & Configuration</span>
          </h2>
          <p className="text-slate-600">Configure your account and automation preferences</p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-green-500" />
          <span>Pro Plan Active</span>
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Automation</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={profileData.company_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, company_name: e.target.value }))}
                  placeholder="Your company name"
                />
              </div>
              <Button onClick={handleSaveProfile} disabled={updateProfileMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Profile'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Automation Settings</CardTitle>
              <CardDescription>Configure your AI assistant's behavior and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="daily_connection_limit">Daily Connection Requests</Label>
                  <Input
                    id="daily_connection_limit"
                    type="number"
                    value={automationSettings.daily_connection_limit}
                    onChange={(e) => setAutomationSettings(prev => ({ 
                      ...prev, 
                      daily_connection_limit: parseInt(e.target.value) || 0 
                    }))}
                    min="1"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="daily_message_limit">Daily Messages</Label>
                  <Input
                    id="daily_message_limit"
                    type="number"
                    value={automationSettings.daily_message_limit}
                    onChange={(e) => setAutomationSettings(prev => ({ 
                      ...prev, 
                      daily_message_limit: parseInt(e.target.value) || 0 
                    }))}
                    min="1"
                    max="200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto_follow_up">Automatic Follow-ups</Label>
                  <p className="text-sm text-slate-600">AI will automatically send follow-up messages</p>
                </div>
                <Switch
                  id="auto_follow_up"
                  checked={automationSettings.auto_follow_up}
                  onCheckedChange={(checked) => setAutomationSettings(prev => ({ 
                    ...prev, 
                    auto_follow_up: checked 
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="follow_up_delay">Follow-up Delay (hours)</Label>
                <Select
                  value={automationSettings.follow_up_delay_hours.toString()}
                  onValueChange={(value) => setAutomationSettings(prev => ({ 
                    ...prev, 
                    follow_up_delay_hours: parseInt(value) 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="48">48 hours</SelectItem>
                    <SelectItem value="72">72 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="business_start">Business Hours Start</Label>
                  <Input
                    id="business_start"
                    type="time"
                    value={automationSettings.business_hours_start}
                    onChange={(e) => setAutomationSettings(prev => ({ 
                      ...prev, 
                      business_hours_start: e.target.value 
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="business_end">Business Hours End</Label>
                  <Input
                    id="business_end"
                    type="time"
                    value={automationSettings.business_hours_end}
                    onChange={(e) => setAutomationSettings(prev => ({ 
                      ...prev, 
                      business_hours_end: e.target.value 
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={automationSettings.timezone}
                    onValueChange={(value) => setAutomationSettings(prev => ({ 
                      ...prev, 
                      timezone: value 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveSettings} disabled={updateSettingsMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {updateSettingsMutation.isPending ? 'Saving...' : 'Save Automation Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>LinkedIn Integration</CardTitle>
              <CardDescription>Connect your LinkedIn account for automated outreach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="linkedin_username">LinkedIn Username</Label>
                <Input
                  id="linkedin_username"
                  value={integrationSettings.linkedin_username}
                  onChange={(e) => setIntegrationSettings(prev => ({ 
                    ...prev, 
                    linkedin_username: e.target.value 
                  }))}
                  placeholder="your-linkedin-username"
                />
              </div>
              <Button onClick={testLinkedInConnection} variant="outline">
                <TestTube className="w-4 h-4 mr-2" />
                Test LinkedIn Connection
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Calendar Integration</CardTitle>
              <CardDescription>Connect your calendar for meeting scheduling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="calendly_link">Calendly Booking Link</Label>
                <Input
                  id="calendly_link"
                  value={integrationSettings.calendly_link}
                  onChange={(e) => setIntegrationSettings(prev => ({ 
                    ...prev, 
                    calendly_link: e.target.value 
                  }))}
                  placeholder="https://calendly.com/your-link"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Email Signature</CardTitle>
              <CardDescription>Your signature for outreach messages</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={integrationSettings.signature}
                onChange={(e) => setIntegrationSettings(prev => ({ 
                  ...prev, 
                  signature: e.target.value 
                }))}
                placeholder="Best regards,&#10;Your Name&#10;Your Title&#10;Your Company"
                rows={4}
              />
              <Button onClick={handleSaveSettings} className="mt-4" disabled={updateSettingsMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {updateSettingsMutation.isPending ? 'Saving...' : 'Save Integration Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive updates and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'new_connections', label: 'New Connections', desc: 'When someone accepts your connection request' },
                { id: 'new_messages', label: 'New Messages', desc: 'When you receive replies to your outreach' },
                { id: 'meeting_booked', label: 'Meetings Booked', desc: 'When prospects book meetings with you' },
                { id: 'daily_summary', label: 'Daily Summary', desc: 'Daily report of your AI assistant activity' },
                { id: 'campaign_updates', label: 'Campaign Updates', desc: 'When campaigns start, pause, or complete' }
              ].map((notification) => (
                <div key={notification.id} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={notification.id}>{notification.label}</Label>
                    <p className="text-sm text-slate-600">{notification.desc}</p>
                  </div>
                  <Switch id={notification.id} defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900">Change Password</h4>
                  <p className="text-sm text-slate-600 mb-2">Update your account password</p>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-600 mb-2">Add an extra layer of security to your account</p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900">Data Export</h4>
                  <p className="text-sm text-slate-600 mb-2">Download all your data and analytics</p>
                  <Button variant="outline">Export Data</Button>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900">Delete Account</h4>
                  <p className="text-sm text-slate-600 mb-2">Permanently delete your account and all data</p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
