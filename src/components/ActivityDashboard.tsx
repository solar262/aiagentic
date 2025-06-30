
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Activity, 
  MessageSquare, 
  UserPlus, 
  Calendar,
  TrendingUp,
  Clock,
  Mail,
  Target,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ActivityDashboardProps {
  user?: any;
}

export const ActivityDashboard = ({ user }: ActivityDashboardProps) => {
  // Fetch real recent interactions with error handling
  const { data: recentInteractions, isLoading: interactionsLoading, error: interactionsError } = useQuery({
    queryKey: ['recent-interactions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('interactions')
        .select(`
          *,
          prospects (
            first_name,
            last_name,
            companies (name)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching interactions:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user?.id
  });

  // Fetch real analytics for weekly stats with error handling
  const { data: weeklyAnalytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['weekly-analytics', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: true });
      
      if (error) {
        console.error('Error fetching analytics:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user?.id
  });

  // Fetch real appointments for today's metrics with error handling
  const { data: todayAppointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['today-appointments', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .gte('scheduled_at', `${today}T00:00:00`)
        .lt('scheduled_at', `${today}T23:59:59`);
      
      if (error) {
        console.error('Error fetching appointments:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user?.id
  });

  // Calculate real metrics with safe defaults
  const todayStats = {
    outreach: recentInteractions?.filter(i => 
      new Date(i.created_at).toDateString() === new Date().toDateString()
    ).length || 0,
    responseRate: recentInteractions && recentInteractions.length > 0 
      ? Math.round((recentInteractions.filter(i => i.replied).length / recentInteractions.length) * 100)
      : 0,
    meetingsBooked: todayAppointments?.length || 0,
    activeProspects: recentInteractions?.filter(i => i.replied && !i.response_content?.toLowerCase().includes('not interested')).length || 0
  };

  // Prepare weekly stats data with safe defaults
  const weeklyStatsData = weeklyAnalytics?.map(day => ({
    day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    connections: day.connections_sent || 0,
    messages: day.messages_sent || 0,
    responses: day.messages_replied || 0
  })) || [];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'connection': return UserPlus;
      case 'message': return MessageSquare;
      case 'meeting': return Calendar;
      case 'response': return Mail;
      default: return MessageSquare;
    }
  };

  const getStatusColor = (replied: boolean, responseContent?: string) => {
    if (!replied) return "bg-blue-500";
    if (responseContent?.toLowerCase().includes('not interested')) return "bg-red-500";
    return "bg-green-500";
  };

  const getStatusBadge = (replied: boolean, responseContent?: string) => {
    if (!replied) return <Badge className="bg-blue-500 text-white">Sent</Badge>;
    if (responseContent?.toLowerCase().includes('not interested')) return <Badge className="bg-red-500 text-white">Declined</Badge>;
    return <Badge className="bg-green-500 text-white">Positive</Badge>;
  };

  // Show loading state
  if (interactionsLoading || analyticsLoading || appointmentsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Activity Dashboard</h2>
            <p className="text-slate-600">Loading your activity data...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Activity Dashboard</h2>
          <p className="text-slate-600">Track your outreach activities and engagement metrics</p>
        </div>
        <Button variant="outline">
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Today's Outreach</p>
                <p className="text-2xl font-bold text-slate-900">{todayStats.outreach}</p>
                <p className="text-xs text-slate-500">Messages & connections</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Response Rate</p>
                <p className="text-2xl font-bold text-slate-900">{todayStats.responseRate}%</p>
                <p className="text-xs text-slate-500">From recent outreach</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Meetings Booked</p>
                <p className="text-2xl font-bold text-slate-900">{todayStats.meetingsBooked}</p>
                <p className="text-xs text-slate-500">Today</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Prospects</p>
                <p className="text-2xl font-bold text-slate-900">{todayStats.activeProspects}</p>
                <p className="text-xs text-slate-500">In conversation</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!recentInteractions || recentInteractions.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Recent Activity</h3>
                <p className="text-slate-600">Start reaching out to prospects to see activity here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentInteractions.slice(0, 5).map((interaction) => {
                  const IconComponent = getActivityIcon(interaction.type);
                  return (
                    <div key={interaction.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(interaction.replied, interaction.response_content)}`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-slate-900 text-sm">
                            {interaction.type === 'connection' ? 'Connection request sent' : 'Message sent'}
                          </p>
                          {getStatusBadge(interaction.replied, interaction.response_content)}
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          To {interaction.prospects?.first_name} {interaction.prospects?.last_name} at {interaction.prospects?.companies?.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {new Date(interaction.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Button variant="ghost" className="w-full mt-4">
                  View All Activity
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Weekly Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weeklyStatsData.length === 0 ? (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Weekly Data</h3>
                <p className="text-slate-600">Analytics will appear here once you start tracking activities.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {weeklyStatsData.map((day, index) => {
                  const totalActivity = day.connections + day.messages + day.responses;
                  const maxActivity = Math.max(...weeklyStatsData.map(d => d.connections + d.messages + d.responses), 1);
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">{day.day}</span>
                        <span className="text-sm font-bold text-slate-900">{totalActivity} activities</span>
                      </div>
                      <Progress value={(totalActivity / maxActivity) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{day.connections} connections</span>
                        <span>{day.messages} messages</span>
                        <span>{day.responses} responses</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights - Only show if we have data */}
      {recentInteractions && recentInteractions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>What's Working Well</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p className="text-sm text-blue-100">
                    {todayStats.responseRate}% response rate from recent outreach
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p className="text-sm text-blue-100">
                    {todayStats.meetingsBooked} meetings booked today
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p className="text-sm text-blue-100">
                    {todayStats.activeProspects} active conversations in progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Optimization Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p className="text-sm text-orange-100">
                    {todayStats.outreach < 10 ? 'Increase daily outreach volume for better results' : 'Good outreach volume maintained'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p className="text-sm text-orange-100">
                    {todayStats.responseRate < 30 ? 'Consider A/B testing message templates' : 'Strong response rate performance'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p className="text-sm text-orange-100">
                    Focus on converting active prospects to meetings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
