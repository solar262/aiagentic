
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, Users, MapPin, Target } from "lucide-react";

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

interface ProspectCardProps {
  prospect: Prospect;
  onAddToPipeline: (prospect: Prospect) => void;
}

export const ProspectCard = ({ prospect, onAddToPipeline }: ProspectCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-slate-200">
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
            onClick={() => onAddToPipeline(prospect)}
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
  );
};
