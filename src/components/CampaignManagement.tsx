
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Edit, 
  Trash2, 
  Target, 
  Users, 
  MessageSquare,
  Calendar,
  TrendingUp,
  Settings,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type CampaignStatus = Database["public"]["Enums"]["campaign_status"];

interface CampaignManagementProps {
  user?: any;
}

export const CampaignManagement = ({ user }: CampaignManagementProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Campaign form state
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    description: '',
    target_industry: '',
    target_title: [] as string[],
    target_company_size_min: '',
    target_company_size_max: '',
    daily_connection_limit: 20,
    daily_message_limit: 50
  });

  // Fetch campaigns
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['campaigns', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Calculate real performance metrics
  const calculateOverallMetrics = () => {
    if (!campaigns.length) return { connectionRate: 0, responseRate: 0, meetingRate: 0 };
    
    const totalProspects = campaigns.reduce((sum, c) => sum + (c.total_prospects || 0), 0);
    const totalConnected = campaigns.reduce((sum, c) => sum + (c.connected_count || 0), 0);
    const totalReplied = campaigns.reduce((sum, c) => sum + (c.replied_count || 0), 0);
    const totalMeetings = campaigns.reduce((sum, c) => sum + (c.booked_count || 0), 0);
    
    const connectionRate = totalProspects > 0 ? Math.round((totalConnected / totalProspects) * 100) : 0;
    const responseRate = totalConnected > 0 ? Math.round((totalReplied / totalConnected) * 100) : 0;
    const meetingRate = totalReplied > 0 ? Math.round((totalMeetings / totalReplied) * 100) : 0;
    
    return { connectionRate, responseRate, meetingRate };
  };

  // Create campaign mutation
  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: typeof campaignForm) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          name: campaignData.name,
          description: campaignData.description,
          target_industry: campaignData.target_industry,
          target_title: campaignData.target_title,
          target_company_size_min: campaignData.target_company_size_min ? parseInt(campaignData.target_company_size_min) : null,
          target_company_size_max: campaignData.target_company_size_max ? parseInt(campaignData.target_company_size_max) : null,
          daily_connection_limit: campaignData.daily_connection_limit,
          daily_message_limit: campaignData.daily_message_limit,
          status: 'draft'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Campaign Created",
        description: "Your new campaign has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['campaigns', user?.id] });
      setShowCreateForm(false);
      setCampaignForm({
        name: '',
        description: '',
        target_industry: '',
        target_title: [],
        target_company_size_min: '',
        target_company_size_max: '',
        daily_connection_limit: 20,
        daily_message_limit: 50
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update campaign status mutation
  const updateCampaignStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: CampaignStatus }) => {
      const { error } = await supabase
        .from('campaigns')
        .update({ 
          status,
          ...(status === 'active' ? { start_date: new Date().toISOString() } : {}),
          ...(status === 'completed' ? { end_date: new Date().toISOString() } : {})
        })
        .eq('id', id)
        .eq('user_id', user?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', user?.id] });
    }
  });

  const handleCreateCampaign = () => {
    if (!campaignForm.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Campaign name is required.",
        variant: "destructive",
      });
      return;
    }
    
    createCampaignMutation.mutate(campaignForm);
  };

  const handleStartCampaign = (campaign: any) => {
    updateCampaignStatusMutation.mutate({ id: campaign.id, status: 'active' as CampaignStatus });
    toast({
      title: "Campaign Started",
      description: `${campaign.name} is now running.`,
    });
  };

  const handlePauseCampaign = (campaign: any) => {
    updateCampaignStatusMutation.mutate({ id: campaign.id, status: 'paused' as CampaignStatus });
    toast({
      title: "Campaign Paused",
      description: `${campaign.name} has been paused.`,
    });
  };

  const handleStopCampaign = (campaign: any) => {
    updateCampaignStatusMutation.mutate({ id: campaign.id, status: 'completed' as CampaignStatus });
    toast({
      title: "Campaign Stopped",
      description: `${campaign.name} has been completed.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'paused': return 'Paused';
      case 'completed': return 'Completed';
      case 'draft': return 'Draft';
      default: return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardContent className="p-6">
          <div className="text-center">Loading campaigns...</div>
        </CardContent>
      </Card>
    );
  }

  const overallMetrics = calculateOverallMetrics();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Target className="w-7 h-7 text-blue-600" />
            <span>Campaign Management</span>
          </h2>
          <p className="text-slate-600">Create and manage your automated outreach campaigns</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      {showCreateForm && (
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>Set up a new automated outreach campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="HR Directors Q1 Outreach"
                />
              </div>
              <div>
                <Label htmlFor="target_industry">Target Industry</Label>
                <Select
                  value={campaignForm.target_industry}
                  onValueChange={(value) => setCampaignForm(prev => ({ ...prev, target_industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="financial-services">Financial Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={campaignForm.description}
                onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the goal and approach of this campaign..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_size_min">Min Company Size</Label>
                <Input
                  id="company_size_min"
                  type="number"
                  value={campaignForm.target_company_size_min}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, target_company_size_min: e.target.value }))}
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="company_size_max">Max Company Size</Label>
                <Input
                  id="company_size_max"
                  type="number"
                  value={campaignForm.target_company_size_max}
                  onChange={(e) => setCampaignForm(prev => ({ ...prev, target_company_size_max: e.target.value }))}
                  placeholder="500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="daily_connections">Daily Connection Limit</Label>
                <Input
                  id="daily_connections"
                  type="number"
                  value={campaignForm.daily_connection_limit}
                  onChange={(e) => setCampaignForm(prev => ({ 
                    ...prev, 
                    daily_connection_limit: parseInt(e.target.value) || 0 
                  }))}
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="daily_messages">Daily Message Limit</Label>
                <Input
                  id="daily_messages"
                  type="number"
                  value={campaignForm.daily_message_limit}
                  onChange={(e) => setCampaignForm(prev => ({ 
                    ...prev, 
                    daily_message_limit: parseInt(e.target.value) || 0 
                  }))}
                  min="1"
                  max="200"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateCampaign} disabled={createCampaignMutation.isPending}>
                {createCampaignMutation.isPending ? 'Creating...' : 'Create Campaign'}
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Campaign Overview</TabsTrigger>
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {campaigns.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Campaigns Yet</h3>
                <p className="text-slate-600 text-center mb-4">
                  Create your first automated outreach campaign to start finding and engaging prospects.
                </p>
                <Button onClick={() => setShowCreateForm(true)}>Create Your First Campaign</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="bg-white/60 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                        {getStatusText(campaign.status)}
                      </Badge>
                    </div>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Total Prospects</p>
                        <p className="font-semibold">{campaign.total_prospects || 0}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Connected</p>
                        <p className="font-semibold">{campaign.connected_count || 0}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Replied</p>
                        <p className="font-semibold">{campaign.replied_count || 0}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Meetings Booked</p>
                        <p className="font-semibold">{campaign.booked_count || 0}</p>
                      </div>
                    </div>

                    {campaign.status === 'active' && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Daily Progress</span>
                          <span>0/{campaign.daily_connection_limit} connections sent</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {campaign.status === 'draft' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartCampaign(campaign)}
                          className="flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Start</span>
                        </Button>
                      )}
                      {campaign.status === 'active' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePauseCampaign(campaign)}
                            className="flex items-center space-x-1"
                          >
                            <Pause className="w-3 h-3" />
                            <span>Pause</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStopCampaign(campaign)}
                            className="flex items-center space-x-1"
                          >
                            <Square className="w-3 h-3" />
                            <span>Stop</span>
                          </Button>
                        </>
                      )}
                      {campaign.status === 'paused' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartCampaign(campaign)}
                          className="flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Resume</span>
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {campaigns.filter(c => c.status === 'active').map((campaign) => (
              <Card key={campaign.id} className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{campaign.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500 text-white">Active</Badge>
                      <Button size="sm" variant="outline" onClick={() => handlePauseCampaign(campaign)}>
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{campaign.total_prospects || 0}</div>
                      <div className="text-sm text-slate-600">Total Prospects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{campaign.connected_count || 0}</div>
                      <div className="text-sm text-slate-600">Connected</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{campaign.replied_count || 0}</div>
                      <div className="text-sm text-slate-600">Replied</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{campaign.booked_count || 0}</div>
                      <div className="text-sm text-slate-600">Meetings</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Connection Progress</span>
                      <span>0/{campaign.daily_connection_limit} sent today</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Connection Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">{overallMetrics.connectionRate}%</div>
                <p className="text-sm text-slate-600">Average across all campaigns</p>
                <div className="mt-4">
                  <Progress value={overallMetrics.connectionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <span>Response Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">{overallMetrics.responseRate}%</div>
                <p className="text-sm text-slate-600">Prospects who replied</p>
                <div className="mt-4">
                  <Progress value={overallMetrics.responseRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span>Meeting Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">{overallMetrics.meetingRate}%</div>
                <p className="text-sm text-slate-600">Meetings booked</p>
                <div className="mt-4">
                  <Progress value={overallMetrics.meetingRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Campaign Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-600">No campaigns available for performance comparison.</p>
                  <p className="text-sm text-slate-500 mt-2">Create your first campaign to see performance metrics here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign) => {
                    const connectionRate = campaign.total_prospects > 0 
                      ? Math.round((campaign.connected_count / campaign.total_prospects) * 100)
                      : 0;
                    const responseRate = campaign.connected_count > 0
                      ? Math.round((campaign.replied_count / campaign.connected_count) * 100)
                      : 0;
                    
                    return (
                      <div key={campaign.id} className="border-b border-slate-200 pb-4 last:border-b-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{campaign.name}</h4>
                          <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                            {getStatusText(campaign.status)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Connection Rate</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <Progress value={connectionRate} className="h-2 flex-1" />
                              <span className="font-medium">{connectionRate}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-600">Response Rate</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <Progress value={responseRate} className="h-2 flex-1" />
                              <span className="font-medium">{responseRate}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-600">Meetings</span>
                            <div className="text-lg font-semibold mt-1">{campaign.booked_count || 0}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
