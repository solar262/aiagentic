
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Users, 
  Building2, 
  MapPin, 
  Target,
  Bot,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Zap,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LeadFilters } from "./LeadFilters";

interface ProspectDiscoveryProps {
  user?: any;
}

export const ProspectDiscovery = ({ user }: ProspectDiscoveryProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [discoveredProspects, setDiscoveredProspects] = useState<any[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
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
        const mockProspects = [
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

  const addProspectToPipeline = (prospect: any) => {
    toast({
      title: "Prospect Added",
      description: `${prospect.name} has been added to your lead pipeline.`,
    });
    
    // Remove from discovered list
    setDiscoveredProspects(prev => prev.filter(p => p.id !== prospect.id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
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

      {/* Search Controls */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>AI Search Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure your search criteria and let AI find prospects automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Target Industry</label>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-900">{searchCriteria.industry}</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Company Size</label>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-900">{searchCriteria.companySize} employees</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Job Titles</label>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-900">{searchCriteria.jobTitles.length} titles</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Locations</label>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-900">{searchCriteria.locations.length} locations</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={startAIProspecting} 
              disabled={isSearching}
              className="flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start AI Search</span>
                </>
              )}
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Customize Filters
            </Button>
          </div>

          {isSearching && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Search Progress</span>
                <span className="text-sm font-medium text-slate-900">{searchProgress}%</span>
              </div>
              <Progress value={searchProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Search Results */}
      {discoveredProspects.length > 0 && (
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>AI-Discovered Prospects</span>
              </div>
              <Badge variant="default">{discoveredProspects.length} found</Badge>
            </CardTitle>
            <CardDescription>
              High-quality prospects identified by AI matching your criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discoveredProspects.map(prospect => (
                <div key={prospect.id} className="p-4 bg-white rounded-lg border border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="text-lg">
                          {prospect.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-slate-900">{prospect.name}</h3>
                          <Badge className={`text-xs ${getScoreColor(prospect.score)}`}>
                            {prospect.score}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{prospect.title}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Building2 className="w-3 h-3" />
                            <span>{prospect.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{prospect.employees} employees</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{prospect.location}</span>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded text-xs text-blue-800 mb-2">
                          <strong>AI Reasoning:</strong> {prospect.reasoning}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {prospect.painPoints.map((point: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {point}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button 
                        size="sm"
                        onClick={() => addProspectToPipeline(prospect)}
                        className="flex items-center space-x-1"
                      >
                        <Target className="w-3 h-3" />
                        <span>Add to Pipeline</span>
                      </Button>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Capabilities Info */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>AI Prospecting Capabilities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Smart Discovery</h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• Analyzes 100M+ LinkedIn profiles</li>
                <li>• Identifies decision-makers automatically</li>
                <li>• Filters by company growth signals</li>
                <li>• Detects hiring activity patterns</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Quality Scoring</h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• AI-powered lead scoring (0-100)</li>
                <li>• Identifies pain points from posts</li>
                <li>• Analyzes engagement likelihood</li>
                <li>• Suggests optimal outreach timing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration with Filters */}
      <LeadFilters />
    </div>
  );
};
