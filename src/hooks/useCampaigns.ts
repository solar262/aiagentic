
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type CampaignStatus = Database["public"]["Enums"]["campaign_status"];

interface CampaignFormData {
  name: string;
  description: string;
  target_industry: string;
  target_title: string[];
  target_company_size_min: string;
  target_company_size_max: string;
  daily_connection_limit: number;
  daily_message_limit: number;
}

export const useCampaigns = (user: any) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isAuthenticated = user && user.id && user.id !== "demo-user";

  // Fetch campaigns
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['campaigns', user?.id],
    queryFn: async () => {
      if (!isAuthenticated) return [];
      
      console.log('Fetching campaigns for user:', user.id);
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
      }
      return data || [];
    },
    enabled: isAuthenticated
  });

  // Create campaign mutation
  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: CampaignFormData) => {
      if (!isAuthenticated) {
        throw new Error('Authentication required to create campaigns');
      }
      
      console.log('Creating campaign for user:', user.id);
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
      
      if (error) {
        console.error('Error creating campaign:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Campaign Created",
        description: "Your new campaign has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['campaigns', user?.id] });
    },
    onError: (error: any) => {
      console.error('Campaign creation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update campaign status mutation
  const updateCampaignStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: CampaignStatus }) => {
      if (!isAuthenticated) {
        throw new Error('Authentication required');
      }

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

  return {
    campaigns,
    isLoading,
    isAuthenticated,
    createCampaignMutation,
    updateCampaignStatusMutation
  };
};
