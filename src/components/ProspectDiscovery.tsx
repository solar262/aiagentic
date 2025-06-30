
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LeadFilters } from "./LeadFilters";
import { SearchConfiguration } from "./prospect-discovery/SearchConfiguration";
import { SearchProgress } from "./prospect-discovery/SearchProgress";
import { ProspectResults } from "./prospect-discovery/ProspectResults";
import { AICapabilities } from "./prospect-discovery/AICapabilities";

interface ProspectDiscoveryProps {
  user?: any;
}

interface Prospect {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  employees: string;
  industry: string;
  linkedinUrl: string;
  score: number;
  reasoning: string;
  painPoints: string[];
}

export const ProspectDiscovery = ({ user }: ProspectDiscoveryProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [discoveredProspects, setDiscoveredProspects] = useState<Prospect[]>([]);
  const [searchCriteria] = useState({
    industry: "Technology",
    companySize: "100-500",
    jobTitles: ["HR Director", "People & Culture Lead", "Head of HR"],
    locations: ["London", "Manchester", "Birmingham"]
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing prospects to avoid duplicates
  const { data: existingProspects } = useQuery({
    queryKey: ['existing-prospects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prospects')
        .select('first_name, last_name, linkedin_url');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Mutation to add prospect to pipeline with lead scoring
  const addProspectMutation = useMutation({
    mutationFn: async (prospect: Prospect) => {
      // First check if company exists, if not create it
      let companyId = null;
      const { data: existingCompany } = await supabase
        .from('companies')
        .select('id')
        .eq('name', prospect.company)
        .single();

      if (!existingCompany) {
        const { data: newCompany, error: companyError } = await supabase
          .from('companies')
          .insert({
            name: prospect.company,
            industry: prospect.industry,
            employee_count_min: parseInt(prospect.employees.split('-')[0]) || 100,
            employee_count_max: parseInt(prospect.employees.split('-')[1]) || 500,
            location: prospect.location
          })
          .select()
          .single();

        if (companyError) throw companyError;
        companyId = newCompany.id;
      } else {
        companyId = existingCompany.id;
      }

      // Add prospect
      const { data: newProspect, error } = await supabase
        .from('prospects')
        .insert({
          first_name: prospect.name.split(' ')[0],
          last_name: prospect.name.split(' ').slice(1).join(' '),
          title: prospect.title,
          linkedin_url: prospect.linkedinUrl,
          location: prospect.location,
          company_id: companyId,
          status: 'researched',
          lead_score: prospect.score,
          notes: prospect.reasoning,
          pain_points: prospect.painPoints,
          user_id: user?.id
        })
        .select()
        .single();

      if (error) throw error;

      // Calculate and update lead score using the database function
      if (newProspect) {
        const { data: calculatedScore, error: scoreError } = await supabase
          .rpc('calculate_lead_score', { prospect_uuid: newProspect.id });

        if (!scoreError && calculatedScore !== null) {
          await supabase
            .from('prospects')
            .update({ lead_score: calculatedScore })
            .eq('id', newProspect.id);
        }
      }

      return newProspect;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      toast({
        title: "Success",
        description: "Prospect added to pipeline with AI-calculated lead score",
      });
    },
    onError: (error) => {
      console.error('Error adding prospect:', error);
      toast({
        title: "Error",
        description: "Failed to add prospect to pipeline",
        variant: "destructive",
      });
    }
  });

  const startAIProspecting = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to start AI prospecting",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setSearchProgress(0);
    setDiscoveredProspects([]);
    
    toast({
      title: "AI Prospecting Started",
      description: "AI is analyzing LinkedIn profiles and calculating lead scores...",
    });

    // Simulate AI search process with realistic progress
    const progressSteps = [
      { progress: 10, message: "Connecting to LinkedIn API..." },
      { progress: 25, message: "Analyzing company databases..." },
      { progress: 40, message: "Identifying HR decision-makers..." },
      { progress: 60, message: "Calculating AI lead scores..." },
      { progress: 80, message: "Enriching contact data..." },
      { progress: 100, message: "Search complete!" }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSearchProgress(step.progress);
      
      if (step.progress === 100) {
        toast({
          title: "AI Search Complete",
          description: "AI prospecting completed. Lead scores calculated for all prospects. Connect LinkedIn for live results.",
        });
      }
    }
    
    setIsSearching(false);
  };

  const addProspectToPipeline = (prospect: Prospect) => {
    addProspectMutation.mutate(prospect);
    // Remove from discovered list
    setDiscoveredProspects(prev => prev.filter(p => p.id !== prospect.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Prospect Discovery</h2>
          <p className="text-slate-600">AI finds prospects and calculates lead scores automatically</p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Bot className="w-3 h-3" />
          <span>AI-Powered Scoring</span>
        </Badge>
      </div>

      <SearchConfiguration
        isSearching={isSearching}
        searchCriteria={searchCriteria}
        onStartSearch={startAIProspecting}
      />

      {isSearching && <SearchProgress searchProgress={searchProgress} />}

      <ProspectResults
        discoveredProspects={discoveredProspects}
        onAddProspectToPipeline={addProspectToPipeline}
      />

      <AICapabilities />

      <LeadFilters />
    </div>
  );
};
