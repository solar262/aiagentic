
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LeadFilters } from "./LeadFilters";
import { SearchConfiguration } from "./prospect-discovery/SearchConfiguration";
import { SearchProgress } from "./prospect-discovery/SearchProgress";
import { ProspectResults } from "./prospect-discovery/ProspectResults";
import { AICapabilities } from "./prospect-discovery/AICapabilities";

interface ProspectDiscoveryProps {
  user?: any;
}

interface Prospect {
  id: number;
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

  const startAIProspecting = async () => {
    setIsSearching(true);
    setSearchProgress(0);
    
    toast({
      title: "AI Prospecting Started",
      description: "Searching LinkedIn for HR decision-makers matching your criteria...",
    });

    // Simulate AI search process with realistic progress
    const progressSteps = [
      { progress: 10, message: "Connecting to LinkedIn API..." },
      { progress: 25, message: "Analyzing company databases..." },
      { progress: 40, message: "Identifying HR decision-makers..." },
      { progress: 60, message: "Scoring prospect quality..." },
      { progress: 80, message: "Enriching contact data..." },
      { progress: 100, message: "Search complete!" }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSearchProgress(step.progress);
      
      if (step.progress === 100) {
        // Simulate discovered prospects
        const mockProspects: Prospect[] = [
          {
            id: 1,
            name: "Sarah Johnson",
            title: "HR Director",
            company: "TechCorp London",
            location: "London, UK",
            employees: "250-500",
            industry: "Technology",
            linkedinUrl: "https://linkedin.com/in/sarah-johnson-hr",
            score: 92,
            reasoning: "Recently posted about employee retention challenges, company is actively hiring",
            painPoints: ["Employee retention", "Remote work culture", "Team building"]
          },
          {
            id: 2,
            name: "Michael Chen",
            title: "People & Culture Lead",
            company: "InnovateTech",
            location: "Manchester, UK",
            employees: "100-250",
            industry: "Technology",
            linkedinUrl: "https://linkedin.com/in/michael-chen-culture",
            score: 88,
            reasoning: "Shared content about workplace culture, company recently secured funding",
            painPoints: ["Culture development", "Leadership training", "Employee engagement"]
          },
          {
            id: 3,
            name: "Emma Wilson",
            title: "Head of HR",
            company: "DataSolutions Ltd",
            location: "Birmingham, UK",
            employees: "150-300",
            industry: "Technology",
            linkedinUrl: "https://linkedin.com/in/emma-wilson-hr",
            score: 85,
            reasoning: "Active in HR communities, company expanding rapidly",
            painPoints: ["Recruitment efficiency", "Onboarding process", "Performance management"]
          }
        ];
        
        setDiscoveredProspects(mockProspects);
        toast({
          title: "Prospects Found!",
          description: `Discovered ${mockProspects.length} high-quality HR prospects matching your criteria.`,
        });
      }
    }
    
    setIsSearching(false);
  };

  const addProspectToPipeline = (prospect: Prospect) => {
    toast({
      title: "Prospect Added",
      description: `${prospect.name} has been added to your lead pipeline.`,
    });
    
    // Remove from discovered list
    setDiscoveredProspects(prev => prev.filter(p => p.id !== prospect.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Prospect Discovery</h2>
          <p className="text-slate-600">Let AI find and qualify HR prospects automatically</p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Bot className="w-3 h-3" />
          <span>AI-Powered</span>
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
