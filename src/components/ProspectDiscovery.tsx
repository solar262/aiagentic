
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

// Demo prospects data
const demoProspects: Prospect[] = [
  {
    id: "demo-1",
    name: "Sarah Johnson",
    title: "Head of People & Culture",
    company: "TechFlow Solutions",
    location: "London, UK",
    employees: "150-300",
    industry: "Technology",
    linkedinUrl: "https://linkedin.com/in/sarah-johnson-hr",
    score: 94,
    reasoning: "Perfect match - actively posting about employee engagement challenges and recently expanded their team by 40%. Company shows strong growth trajectory.",
    painPoints: ["Employee Retention", "Team Scaling", "Culture Building"]
  },
  {
    id: "demo-2", 
    name: "Michael Chen",
    title: "VP of Human Resources",
    company: "DataPoint Analytics",
    location: "Manchester, UK",
    employees: "200-500",
    industry: "Data Analytics",
    linkedinUrl: "https://linkedin.com/in/michael-chen-hr",
    score: 87,
    reasoning: "High potential - recently shared content about HR transformation and workplace culture. Company secured Series B funding last quarter.",
    painPoints: ["Remote Work Culture", "Performance Management", "Talent Acquisition"]
  },
  {
    id: "demo-3",
    name: "Emma Williams",
    title: "Director of Talent & Operations", 
    company: "GreenTech Innovations",
    location: "Birmingham, UK",
    employees: "100-250",
    industry: "Clean Technology",
    linkedinUrl: "https://linkedin.com/in/emma-williams-talent",
    score: 82,
    reasoning: "Strong candidate - leading HR digital transformation initiatives. Company recently announced major expansion plans and new office openings.",
    painPoints: ["Digital HR Tools", "Workforce Planning", "Employee Experience"]
  }
];

export const ProspectDiscovery = ({ user }: ProspectDiscoveryProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [discoveredProspects, setDiscoveredProspects] = useState<Prospect[]>([]);
  const [addedProspects, setAddedProspects] = useState<Prospect[]>([]);
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
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('prospects')
        .select('first_name, last_name, linkedin_url');
      
      if (error) {
        console.log('Error fetching prospects:', error);
        return [];
      }
      return data || [];
    }
  });

  const startAIProspecting = async () => {
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSearchProgress(step.progress);
      
      if (step.progress === 100) {
        setDiscoveredProspects(demoProspects);
        toast({
          title: "AI Search Complete",
          description: `Found ${demoProspects.length} high-quality prospects with AI-calculated lead scores!`,
        });
      }
    }
    
    setIsSearching(false);
  };

  const addProspectToPipeline = (prospect: Prospect) => {
    console.log('Adding prospect to pipeline:', prospect);
    
    // Remove from discovered list
    setDiscoveredProspects(prev => prev.filter(p => p.id !== prospect.id));
    
    // Add to added prospects list
    setAddedProspects(prev => [...prev, prospect]);
    
    toast({
      title: "Success!",
      description: `${prospect.name} has been added to your pipeline`,
    });
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

      {addedProspects.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">Added to Pipeline ({addedProspects.length})</h3>
          <div className="space-y-2">
            {addedProspects.map(prospect => (
              <div key={prospect.id} className="flex items-center justify-between text-sm text-green-800">
                <span>{prospect.name} - {prospect.company}</span>
                <Badge variant="outline" className="text-green-700 border-green-700">
                  {prospect.score}% match
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <AICapabilities />

      <LeadFilters />
    </div>
  );
};
