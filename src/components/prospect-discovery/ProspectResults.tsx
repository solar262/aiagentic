
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { ProspectCard } from "./ProspectCard";

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

interface ProspectResultsProps {
  discoveredProspects: Prospect[];
  onAddProspectToPipeline: (prospect: Prospect) => void;
}

export const ProspectResults = ({ 
  discoveredProspects, 
  onAddProspectToPipeline 
}: ProspectResultsProps) => {
  if (discoveredProspects.length === 0) {
    return null;
  }

  return (
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
            <ProspectCard
              key={prospect.id}
              prospect={prospect}
              onAddToPipeline={onAddProspectToPipeline}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
