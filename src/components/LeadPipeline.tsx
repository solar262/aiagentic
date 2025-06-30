import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Building2, 
  Users, 
  MessageSquare, 
  Calendar, 
  Mail,
  Phone,
  ExternalLink,
  MoreHorizontal,
  Clock,
  Bot,
  Search
} from "lucide-react";
import { ProspectDiscovery } from "./ProspectDiscovery";

const statusConfig = {
  researched: { label: "New Prospect", color: "bg-blue-500", textColor: "text-blue-700" },
  contacted: { label: "Contacted", color: "bg-yellow-500", textColor: "text-yellow-700" },
  connected: { label: "Connected", color: "bg-green-500", textColor: "text-green-700" },
  qualified: { label: "Qualified", color: "bg-purple-500", textColor: "text-purple-700" },
  meeting_booked: { label: "Meeting Booked", color: "bg-indigo-500", textColor: "text-indigo-700" }
};

interface LeadPipelineProps {
  user?: any;
}

export const LeadPipeline = ({ user }: LeadPipelineProps) => {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [activeView, setActiveView] = useState("discovery");

  // Fetch real prospects data
  const { data: prospects, isLoading } = useQuery({
    queryKey: ['prospects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prospects')
        .select(`
          *,
          companies (
            name,
            industry,
            employee_count_min,
            employee_count_max,
            location
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch analytics for conversion rates
  const { data: analytics } = useQuery({
    queryKey: ['pipeline-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(30);
      
      if (error) throw error;
      
      // Calculate totals
      const totals = data?.reduce((acc, day) => ({
        connections_sent: acc.connections_sent + (day.connections_sent || 0),
        connections_accepted: acc.connections_accepted + (day.connections_accepted || 0),
        messages_sent: acc.messages_sent + (day.messages_sent || 0),
        calls_booked: acc.calls_booked + (day.calls_booked || 0),
      }), {
        connections_sent: 0,
        connections_accepted: 0,
        messages_sent: 0,
        calls_booked: 0,
      });

      return totals;
    }
  });

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return <Badge>Unknown</Badge>;
    
    return (
      <Badge className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  const getEngagementScore = (prospect: any) => {
    // Calculate engagement based on interactions
    let score = 0;
    if (prospect.last_interaction_at) score += 30;
    if (prospect.status === 'connected') score += 40;
    if (prospect.status === 'qualified') score += 70;
    if (prospect.status === 'meeting_booked') score += 90;
    return Math.min(score, 100);
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 80) return "text-green-600";
    if (engagement >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const conversionRate = analytics && analytics.connections_sent > 0 
    ? Math.round((analytics.connections_accepted / analytics.connections_sent) * 100)
    : 0;

  const meetingBookRate = analytics && analytics.connections_accepted > 0
    ? Math.round((analytics.calls_booked / analytics.connections_accepted) * 100)
    : 0;

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardContent className="p-6">
          <div className="text-center">Loading prospects...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Lead Pipeline</h2>
          <p className="text-slate-600">AI-powered prospect discovery and pipeline management</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Export Leads
          </Button>
          <Button size="sm">
            Add Lead Manually
          </Button>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="discovery" className="flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <span>AI Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="discovery" className="space-y-6">
          <ProspectDiscovery user={user} />
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          {(!prospects || prospects.length === 0) ? (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <Bot className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Prospects Yet</h3>
                  <p className="text-slate-600 mb-4">Use AI Discovery to automatically find and qualify HR prospects.</p>
                  <Button onClick={() => setActiveView("discovery")} className="flex items-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Start AI Discovery</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pipeline Stages */}
              <div className="lg:col-span-2 space-y-4">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const leadsInStage = prospects.filter(lead => lead.status === status);
                  return (
                    <Card key={status} className="bg-white/60 backdrop-blur-sm border-slate-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                            <span>{config.label}</span>
                          </CardTitle>
                          <Badge variant="secondary">{leadsInStage.length}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {leadsInStage.map(lead => (
                            <div 
                              key={lead.id}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedLead?.id === lead.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                              onClick={() => setSelectedLead(lead)}
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarFallback>
                                    {lead.first_name?.[0]}{lead.last_name?.[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium text-slate-900">
                                    {lead.first_name} {lead.last_name}
                                  </p>
                                  <p className="text-sm text-slate-600">{lead.title}</p>
                                  <p className="text-sm text-slate-500">{lead.companies?.name}</p>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-slate-500">
                                  {lead.last_interaction_at 
                                    ? new Date(lead.last_interaction_at).toLocaleDateString()
                                    : 'No interactions'
                                  }
                                </span>
                                <div className={`text-xs font-medium ${getEngagementColor(getEngagementScore(lead))}`}>
                                  {getEngagementScore(lead)}% engaged
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Lead Details */}
              {selectedLead && (
                <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Lead Details</span>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarFallback className="text-lg">
                          {selectedLead.first_name?.[0]}{selectedLead.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-slate-900">
                        {selectedLead.first_name} {selectedLead.last_name}
                      </h3>
                      <p className="text-slate-600">{selectedLead.title}</p>
                      <p className="text-slate-500">{selectedLead.companies?.name}</p>
                      {getStatusBadge(selectedLead.status)}
                    </div>

                    <div className="space-y-3">
                      {selectedLead.companies?.industry && (
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">{selectedLead.companies.industry}</span>
                        </div>
                      )}
                      {selectedLead.companies?.employee_count_min && (
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">
                            {selectedLead.companies.employee_count_min}
                            {selectedLead.companies.employee_count_max && 
                              `-${selectedLead.companies.employee_count_max}`
                            } employees
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">
                          Added {new Date(selectedLead.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Engagement Level</h4>
                      <Progress value={getEngagementScore(selectedLead)} className="h-2" />
                      <p className={`text-sm mt-1 ${getEngagementColor(getEngagementScore(selectedLead))}`}>
                        {getEngagementScore(selectedLead)}% engaged
                      </p>
                    </div>

                    {selectedLead.notes && (
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Notes</h4>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                          {selectedLead.notes}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <Button size="sm" variant="outline" className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>Message</span>
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>All Leads</CardTitle>
              <CardDescription>Complete list of your HR prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prospects && prospects.length > 0 ? prospects.map(lead => (
                  <div key={lead.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-slate-200">
                    <Avatar>
                      <AvatarFallback>
                        {lead.first_name?.[0]}{lead.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-slate-900">
                          {lead.first_name} {lead.last_name}
                        </p>
                        {getStatusBadge(lead.status)}
                      </div>
                      <p className="text-sm text-slate-600">
                        {lead.title} at {lead.companies?.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {lead.companies?.industry}
                        {lead.companies?.employee_count_min && 
                          ` • ${lead.companies.employee_count_min}${
                            lead.companies.employee_count_max ? `-${lead.companies.employee_count_max}` : '+'
                          } employees`
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">
                        {getEngagementScore(lead)}%
                      </p>
                      <p className="text-xs text-slate-500">
                        {lead.last_interaction_at 
                          ? new Date(lead.last_interaction_at).toLocaleDateString()
                          : 'No interactions'
                        }
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Bot className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-600 mb-4">No prospects found. Use AI Discovery to get started.</p>
                    <Button onClick={() => setActiveView("discovery")} className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>Start AI Discovery</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Pipeline Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Conversion Rate</span>
                    <span className="font-bold text-slate-900">{conversionRate}%</span>
                  </div>
                  <Progress value={conversionRate} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Meeting Book Rate</span>
                    <span className="font-bold text-slate-900">{meetingBookRate}%</span>
                  </div>
                  <Progress value={meetingBookRate} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Total Prospects</span>
                    <span className="font-bold text-slate-900">{prospects?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(statusConfig).map(([status, config]) => {
                    const count = prospects ? prospects.filter(p => p.status === status).length : 0;
                    const percentage = prospects && prospects.length > 0 ? Math.round((count / prospects.length) * 100) : 0;
                    
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{config.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-slate-900">{count}</span>
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`${config.color} h-2 rounded-full`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
