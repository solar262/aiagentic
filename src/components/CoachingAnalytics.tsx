import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Mail, Calendar, DollarSign, Target, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface CoachingAnalyticsProps {
  user?: any;
}

interface AnalyticsData {
  totalCampaigns: number;
  activeCampaigns: number;
  totalProspects: number;
  totalEmails: number;
  totalReplies: number;
  totalBookings: number;
  completedConsultations: number;
  revenueGenerated: number;
  responseRate: number;
  bookingRate: number;
  conversionRate: number;
}

export const CoachingAnalytics = ({ user }: CoachingAnalyticsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Check if user is authenticated
  const isAuthenticated = user && user.id && user.id !== "demo-user";

  // Fetch analytics data
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['coaching-analytics', user?.id],
    queryFn: async () => {
      if (!isAuthenticated) {
        return {
          totalCampaigns: 0,
          activeCampaigns: 0,
          totalProspects: 0,
          totalEmails: 0,
          totalReplies: 0,
          totalBookings: 0,
          completedConsultations: 0,
          revenueGenerated: 0,
          responseRate: 0,
          bookingRate: 0,
          conversionRate: 0,
        };
      }

      // Fetch campaigns data
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id);

      // Fetch appointments data
      const { data: appointments } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id);

      // Fetch interactions data
      const { data: interactions } = await supabase
        .from('interactions')
        .select('*')
        .eq('user_id', user.id);

      // Calculate analytics
      const totalCampaigns = campaigns?.length || 0;
      const activeCampaigns = campaigns?.filter(c => c.status === 'active').length || 0;
      const totalProspects = campaigns?.reduce((sum, c) => sum + (c.total_prospects || 0), 0) || 0;
      const totalEmails = campaigns?.reduce((sum, c) => sum + (c.connected_count || 0), 0) || 0;
      const totalReplies = campaigns?.reduce((sum, c) => sum + (c.replied_count || 0), 0) || 0;
      const totalBookings = campaigns?.reduce((sum, c) => sum + (c.booked_count || 0), 0) || 0;
      const completedConsultations = appointments?.filter(a => a.status === 'completed').length || 0;
      
      // Calculate rates
      const responseRate = totalEmails > 0 ? (totalReplies / totalEmails) * 100 : 0;
      const bookingRate = totalReplies > 0 ? (totalBookings / totalReplies) * 100 : 0;
      const conversionRate = totalProspects > 0 ? (totalBookings / totalProspects) * 100 : 0;
      
      // Estimate revenue (assuming £2000 per completed consultation)
      const revenueGenerated = completedConsultations * 2000;

      return {
        totalCampaigns,
        activeCampaigns,
        totalProspects,
        totalEmails,
        totalReplies,
        totalBookings,
        completedConsultations,
        revenueGenerated,
        responseRate: Math.round(responseRate * 10) / 10,
        bookingRate: Math.round(bookingRate * 10) / 10,
        conversionRate: Math.round(conversionRate * 10) / 10,
      };
    },
    enabled: isAuthenticated
  });

  // Fetch recent performance data
  const { data: recentPerformance } = useQuery({
    queryKey: ['recent-performance', user?.id],
    queryFn: async () => {
      if (!isAuthenticated) return [];

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data } = await supabase
        .from('analytics')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('date', { ascending: true });

      return data || [];
    },
    enabled: isAuthenticated
  });

  // Demo/unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <BarChart3 className="w-7 h-7 text-orange-600" />
              <span>Analytics Dashboard</span>
            </h2>
            <p className="text-slate-600">Track your coaching business performance and ROI</p>
          </div>
        </div>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Authentication Required</h3>
            <p className="text-slate-600 text-center mb-4">
              Please sign in to view your coaching business analytics and performance metrics.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !analytics) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardContent className="p-6">
          <div className="text-center">Loading analytics...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <BarChart3 className="w-7 h-7 text-orange-600" />
            <span>Analytics Dashboard</span>
          </h2>
          <p className="text-slate-600">Track your coaching business performance and ROI</p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Revenue Generated</p>
                <p className="text-2xl font-bold text-green-600">
                  £{analytics.revenueGenerated.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Consultations Completed</p>
                <p className="text-2xl font-bold text-purple-600">{analytics.completedConsultations}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.totalBookings}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-600">{analytics.conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="bookings">Booking Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Performance */}
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>Email Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Emails Sent</span>
                    <span className="font-semibold">{analytics.totalEmails}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Replies Received</span>
                    <span className="font-semibold">{analytics.totalReplies}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Response Rate</span>
                    <Badge variant="secondary">{analytics.responseRate}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Performance */}
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span>Booking Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Meetings Booked</span>
                    <span className="font-semibold">{analytics.totalBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Consultations Completed</span>
                    <span className="font-semibold">{analytics.completedConsultations}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Booking Rate</span>
                    <Badge variant="secondary">{analytics.bookingRate}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Overview */}
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>Campaign Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{analytics.totalCampaigns}</div>
                  <div className="text-slate-600">Total Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{analytics.activeCampaigns}</div>
                  <div className="text-slate-600">Active Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{analytics.totalProspects}</div>
                  <div className="text-slate-600">Total Prospects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{analytics.conversionRate}%</div>
                  <div className="text-slate-600">Conversion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Campaign Performance Metrics</CardTitle>
              <CardDescription>
                Detailed analysis of your email campaign effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">{analytics.totalEmails}</div>
                  <div className="text-sm text-slate-600">Total Emails Sent</div>
                  <div className="text-xs text-slate-500">Across all campaigns</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600">{analytics.responseRate}%</div>
                  <div className="text-sm text-slate-600">Average Response Rate</div>
                  <div className="text-xs text-slate-500">Industry average: 8-12%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-600">{analytics.bookingRate}%</div>
                  <div className="text-sm text-slate-600">Reply to Booking Rate</div>
                  <div className="text-xs text-slate-500">Conversion from reply to meeting</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Booking Analytics</CardTitle>
              <CardDescription>
                Track your consultation booking performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Booking Funnel</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Prospects Contacted</span>
                      <span>{analytics.totalProspects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Replies Received</span>
                      <span>{analytics.totalReplies}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Meetings Booked</span>
                      <span className="font-semibold text-blue-600">{analytics.totalBookings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Consultations Completed</span>
                      <span className="font-semibold text-green-600">{analytics.completedConsultations}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Conversion Rates</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Prospect → Reply</span>
                      <Badge variant="outline">{analytics.responseRate}%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Reply → Booking</span>
                      <Badge variant="outline">{analytics.bookingRate}%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Overall Conversion</span>
                      <Badge variant="default">{analytics.conversionRate}%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Revenue Analytics</span>
              </CardTitle>
              <CardDescription>
                Track your coaching business financial performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    £{analytics.revenueGenerated.toLocaleString()}
                  </div>
                  <div className="text-slate-600">Total Revenue</div>
                  <div className="text-xs text-slate-500 mt-1">
                    From {analytics.completedConsultations} completed consultations
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    £{analytics.completedConsultations > 0 ? (analytics.revenueGenerated / analytics.completedConsultations).toLocaleString() : '0'}
                  </div>
                  <div className="text-slate-600">Avg. Per Consultation</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Revenue per completed session
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    £{analytics.totalProspects > 0 ? Math.round(analytics.revenueGenerated / analytics.totalProspects).toLocaleString() : '0'}
                  </div>
                  <div className="text-slate-600">Revenue Per Prospect</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Total revenue ÷ prospects contacted
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};