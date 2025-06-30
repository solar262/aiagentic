
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Settings } from "lucide-react";
import { Target } from "lucide-react";

interface SearchCriteria {
  industry: string;
  companySize: string;
  jobTitles: string[];
  locations: string[];
}

interface SearchConfigurationProps {
  isSearching: boolean;
  searchCriteria: SearchCriteria;
  onStartSearch: () => void;
}

export const SearchConfiguration = ({ 
  isSearching, 
  searchCriteria, 
  onStartSearch 
}: SearchConfigurationProps) => {
  return (
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
            onClick={onStartSearch} 
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
      </CardContent>
    </Card>
  );
};
