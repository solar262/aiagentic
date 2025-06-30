
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Settings,
  LogOut,
  Linkedin,
  Target
} from "lucide-react";
import { LinkedInConnector } from "./LinkedInConnector";
import { LeadFilters } from "./LeadFilters";

interface DashboardProps {
  user: any;
}

export const Dashboard = ({ user }: DashboardProps) => {
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);
  const [stats, setStats] = useState({
    totalProspects: 0,
    activeConnections: 0,
    scheduledMeetings: 0,
    responseRate: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load prospects count
      const { data: prospects } = await supabase
        .from('prospects')
        .select('id')
        .eq('user_id', user.id);

      // Load interactions for response rate
      const { data: interactions } = await supabase
        .from('interactions')
        .select('replied')
        .eq('user_id', user.id);

      // Load appointments
      const { data: appointments } = await supabase
        .from('appointments')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'scheduled');

      const totalProspects = prospects?.length || 0;
      const totalInteractions = interactions?.length || 0;
      const repliedInteractions = interactions?.filter(i => i.replied).length || 0;
      const responseRate = totalInteractions > 0 ? (repliedInteractions / totalInteractions) * 100 : 0;

      setStats({
        totalProspects,
        activeConnections: Math.floor(totalProspects * 0.7), // Estimated
        scheduledMeetings: appointments?.length || 0,
        responseRate: Math.round(responseRate)
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">The Peoples Partner</h1>
                <p className="text-sm text-slate-600">LinkedIn AI Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant={isLinkedInConnected ? "default" : "secondary"}>
                {isLinkedInConnected ? "LinkedIn Connected" : "LinkedIn Disconnected"}
              </Badge>
              <span className="text-sm text-slate-600">Welcome, {user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProspects}</div>
              <p className="text-xs text-slate-600">HR decision-makers identified</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeConnections}</div>
              <p className="text-xs text-slate-600">Engaged prospects</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.scheduledMeetings}</div>
              <p className="text-xs text-slate-600">Discovery calls scheduled</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.responseRate}%</div>
              <p className="text-xs text-slate-600">Average response rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="linkedin" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="linkedin">LinkedIn Setup</TabsTrigger>
            <TabsTrigger value="prospects">Find Prospects</TabsTrigger>
            <TabsTrigger value="messages">Message Templates</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="linkedin" className="space-y-6">
            <LinkedInConnector 
              isConnected={isLinkedInConnected}
              onConnectionChange={setIsLinkedInConnected}
            />
          </TabsContent>

          <TabsContent value="prospects" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Find Your Ideal HR Prospects</h2>
              <p className="text-slate-600">Use advanced filters to identify HR decision-makers at companies with 100+ employees.</p>
            </div>
            <LeadFilters />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span>Message Templates</span>
                </CardTitle>
                <CardDescription>
                  Craft personalized, empathetic messages that resonate with HR professionals and drive meaningful conversations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Message Templates Coming Soon</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    We're building AI-powered message templates specifically designed for The Peoples Partner's approach to building authentic relationships with HR leaders.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Calendar Integration</span>
                </CardTitle>
                <CardDescription>
                  Seamlessly book discovery calls and manage your appointments with HR professionals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Calendar Integration Coming Soon</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Direct integration with Calendly and other scheduling tools to streamline your meeting booking process.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span>Account Settings</span>
                </CardTitle>
                <CardDescription>
                  Customize your profile and preferences for The Peoples Partner LinkedIn AI Assistant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Profile Information</h4>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p><strong>Company:</strong> The Peoples Partner</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Specialization:</strong> Employee retention strategies, inclusive leadership, and culture design</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Value Proposition</h4>
                    <p className="text-sm text-slate-600">
                      "Helping organizations build people-first cultures through employee retention strategies, inclusive leadership, and culture design."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
