import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Plus, Send, Pause, Play, BarChart3, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface EmailCampaignManagementProps {
  user?: any;
}

interface EmailCampaign {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  target_industry?: string;
  target_title?: string[];
  target_company_size_min?: number;
  target_company_size_max?: number;
  daily_message_limit?: number;
  total_prospects?: number;
  connected_count?: number;
  replied_count?: number;
  booked_count?: number;
  created_at: string;
}

export const EmailCampaignManagement = ({ user }: EmailCampaignManagementProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    target_industry: "",
    target_titles: "",
    target_company_size_min: "",
    target_company_size_max: "",
    daily_message_limit: "25",
    email_subject: "",
    email_content: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user is authenticated
  const isAuthenticated = user && user.id && user.id !== "demo-user";

  // Fetch campaigns
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['email-campaigns', user?.id],
    queryFn: async () => {
      if (!isAuthenticated) return [];
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EmailCampaign[];
    },
    enabled: isAuthenticated
  });

  // Create campaign mutation
  const createCampaignMutation = useMutation({
    mutationFn: async (campaign: any) => {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([{
          ...campaign,
          user_id: user.id,
          status: 'draft'
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      setShowCreateForm(false);
      resetForm();
      toast({
        title: "Campaign Created",
        description: "Your email campaign has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update campaign status mutation
  const updateCampaignStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'draft' | 'active' | 'paused' | 'completed' }) => {
      const { data, error } = await supabase
        .from('campaigns')
        .update({ status })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      target_industry: "",
      target_titles: "",
      target_company_size_min: "",
      target_company_size_max: "",
      daily_message_limit: "25",
      email_subject: "",
      email_content: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaignData = {
      name: formData.name,
      description: formData.description,
      target_industry: formData.target_industry || null,
      target_title: formData.target_titles ? formData.target_titles.split(',').map(t => t.trim()) : null,
      target_company_size_min: formData.target_company_size_min ? parseInt(formData.target_company_size_min) : null,
      target_company_size_max: formData.target_company_size_max ? parseInt(formData.target_company_size_max) : null,
      daily_message_limit: parseInt(formData.daily_message_limit),
    };

    createCampaignMutation.mutate(campaignData);
  };

  const handleStartCampaign = (campaign: EmailCampaign) => {
    updateCampaignStatusMutation.mutate({ id: campaign.id, status: 'active' });
    toast({
      title: "Campaign Started",
      description: `${campaign.name} is now active and sending emails.`,
    });
  };

  const handlePauseCampaign = (campaign: EmailCampaign) => {
    updateCampaignStatusMutation.mutate({ id: campaign.id, status: 'paused' });
    toast({
      title: "Campaign Paused",
      description: `${campaign.name} has been paused.`,
    });
  };

  // Demo/unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <Mail className="w-7 h-7 text-green-600" />
              <span>Email Campaigns</span>
            </h2>
            <p className="text-slate-600">Create and manage automated email outreach campaigns</p>
          </div>
        </div>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Authentication Required</h3>
            <p className="text-slate-600 text-center mb-4">
              Please sign in to create and manage your email campaigns for corporate coaching services.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardContent className="p-6">
          <div className="text-center">Loading campaigns...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Mail className="w-7 h-7 text-green-600" />
            <span>Email Campaigns</span>
          </h2>
          <p className="text-slate-600">Create and manage automated email outreach campaigns</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      {/* Create Campaign Form */}
      {showCreateForm && (
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>Create Email Campaign</CardTitle>
            <CardDescription>
              Set up a new automated email campaign for corporate coaching outreach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Campaign Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Executive Coaching Outreach Q1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="target_industry">Target Industry</Label>
                  <Select value={formData.target_industry} onValueChange={(value) => setFormData(prev => ({ ...prev, target_industry: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this campaign's goals..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target_titles">Target Job Titles</Label>
                  <Input
                    id="target_titles"
                    value={formData.target_titles}
                    onChange={(e) => setFormData(prev => ({ ...prev, target_titles: e.target.value }))}
                    placeholder="CEO, HR Director, Managing Director"
                  />
                  <p className="text-xs text-slate-500 mt-1">Separate multiple titles with commas</p>
                </div>
                <div>
                  <Label htmlFor="daily_message_limit">Daily Email Limit</Label>
                  <Select value={formData.daily_message_limit} onValueChange={(value) => setFormData(prev => ({ ...prev, daily_message_limit: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 emails/day</SelectItem>
                      <SelectItem value="25">25 emails/day</SelectItem>
                      <SelectItem value="50">50 emails/day</SelectItem>
                      <SelectItem value="100">100 emails/day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target_company_size_min">Min Company Size</Label>
                  <Input
                    id="target_company_size_min"
                    type="number"
                    value={formData.target_company_size_min}
                    onChange={(e) => setFormData(prev => ({ ...prev, target_company_size_min: e.target.value }))}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="target_company_size_max">Max Company Size</Label>
                  <Input
                    id="target_company_size_max"
                    type="number"
                    value={formData.target_company_size_max}
                    onChange={(e) => setFormData(prev => ({ ...prev, target_company_size_max: e.target.value }))}
                    placeholder="1000"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={createCampaignMutation.isPending}>
                  Create Campaign
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Campaigns Overview */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {campaigns.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Email Campaigns Yet</h3>
                <p className="text-slate-600 text-center mb-4">
                  Create your first email campaign to start reaching corporate coaching prospects.
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
                      <Badge variant={
                        campaign.status === 'active' ? 'default' :
                        campaign.status === 'paused' ? 'secondary' :
                        campaign.status === 'completed' ? 'outline' : 'secondary'
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                    {campaign.description && (
                      <CardDescription>{campaign.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{campaign.total_prospects || 0}</div>
                        <div className="text-sm text-slate-600">Prospects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{campaign.replied_count || 0}</div>
                        <div className="text-sm text-slate-600">Replied</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{campaign.booked_count || 0}</div>
                        <div className="text-sm text-slate-600">Booked</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {campaign.status === 'draft' || campaign.status === 'paused' ? (
                        <Button size="sm" onClick={() => handleStartCampaign(campaign)}>
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handlePauseCampaign(campaign)}>
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </Button>
                      )}
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
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{campaign.total_prospects || 0}</div>
                      <div className="text-sm text-slate-600">Total Prospects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{campaign.connected_count || 0}</div>
                      <div className="text-sm text-slate-600">Sent</div>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Campaign Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {campaigns.reduce((sum, c) => sum + (c.total_prospects || 0), 0)}
                  </div>
                  <div className="text-slate-600">Total Prospects Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {campaigns.reduce((sum, c) => sum + (c.replied_count || 0), 0)}
                  </div>
                  <div className="text-slate-600">Total Replies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {campaigns.reduce((sum, c) => sum + (c.booked_count || 0), 0)}
                  </div>
                  <div className="text-slate-600">Total Meetings Booked</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};