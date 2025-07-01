
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Plus, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns } from "@/hooks/useCampaigns";
import { CampaignForm } from "@/components/campaign/CampaignForm";
import { CampaignCard } from "@/components/campaign/CampaignCard";
import { PerformanceMetrics } from "@/components/campaign/PerformanceMetrics";
import { Database } from "@/integrations/supabase/types";

type CampaignStatus = Database["public"]["Enums"]["campaign_status"];

interface CampaignManagementProps {
  user?: any;
}

export const CampaignManagement = ({ user }: CampaignManagementProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  const {
    campaigns,
    isLoading,
    isAuthenticated,
    createCampaignMutation,
    updateCampaignStatusMutation
  } = useCampaigns(user);

  const handleCreateCampaign = (formData: any) => {
    createCampaignMutation.mutate(formData);
    setShowCreateForm(false);
  };

  const handleStartCampaign = (campaign: any) => {
    if (!isAuthenticated) return;
    
    updateCampaignStatusMutation.mutate({ id: campaign.id, status: 'active' as CampaignStatus });
    toast({
      title: "Campaign Started",
      description: `${campaign.name} is now running.`,
    });
  };

  const handlePauseCampaign = (campaign: any) => {
    if (!isAuthenticated) return;
    
    updateCampaignStatusMutation.mutate({ id: campaign.id, status: 'paused' as CampaignStatus });
    toast({
      title: "Campaign Paused",
      description: `${campaign.name} has been paused.`,
    });
  };

  const handleStopCampaign = (campaign: any) => {
    if (!isAuthenticated) return;
    
    updateCampaignStatusMutation.mutate({ id: campaign.id, status: 'completed' as CampaignStatus });
    toast({
      title: "Campaign Stopped",
      description: `${campaign.name} has been completed.`,
    });
  };

  // Show authentication required message for demo users
  if (!isAuthenticated) {
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
        </div>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Authentication Required</h3>
            <p className="text-slate-600 text-center mb-4">
              Please sign in to create and manage your automated outreach campaigns.
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
        <CampaignForm
          onSubmit={handleCreateCampaign}
          onCancel={() => setShowCreateForm(false)}
          isLoading={createCampaignMutation.isPending}
          isAuthenticated={isAuthenticated}
        />
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
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onStart={handleStartCampaign}
                  onPause={handlePauseCampaign}
                  onStop={handleStopCampaign}
                />
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
          <PerformanceMetrics campaigns={campaigns} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
