
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Filter, 
  Building2, 
  Users, 
  MapPin, 
  Search,
  X,
  Target
} from "lucide-react";

export const LeadFilters = () => {
  const [companySize, setCompanySize] = useState([100]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const industries = [
    "Technology", "Financial Services", "Healthcare", "Manufacturing", 
    "Retail", "Education", "Construction", "Professional Services"
  ];

  const locations = [
    "London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", 
    "Bristol", "Leeds", "Liverpool", "Newcastle", "Cardiff"
  ];

  const jobTitles = [
    "HR Director", "People & Culture Lead", "Talent Manager", 
    "Head of HR", "Chief People Officer", "HR Business Partner",
    "Talent Acquisition Manager", "People Operations Manager"
  ];

  const addFilter = (type: string, value: string) => {
    const filterKey = `${type}:${value}`;
    if (!activeFilters.includes(filterKey)) {
      setActiveFilters([...activeFilters, filterKey]);
    }
  };

  const removeFilter = (filterKey: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filterKey));
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <span>Lead Targeting Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 p-4 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-900">Active Filters:</span>
            {activeFilters.map(filter => (
              <Badge key={filter} variant="secondary" className="flex items-center space-x-1">
                <span>{filter.split(':')[1]}</span>
                <button onClick={() => removeFilter(filter)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveFilters([])}
              className="text-blue-600 hover:text-blue-700"
            >
              Clear All
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Size */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span>Company Size</span>
            </Label>
            <div className="space-y-3">
              <Slider
                value={companySize}
                onValueChange={setCompanySize}
                max={5000}
                min={50}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>50+</span>
                <span className="font-medium text-slate-700">{companySize[0]}+ employees</span>
                <span>5000+</span>
              </div>
            </div>
          </div>

          {/* Industry */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Industry</span>
            </Label>
            <Select onValueChange={(value) => addFilter('industry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Location</span>
            </Label>
            <Select onValueChange={(value) => addFilter('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Title */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-slate-500" />
              <span>Job Title</span>
            </Label>
            <Select onValueChange={(value) => addFilter('title', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select job title" />
              </SelectTrigger>
              <SelectContent>
                {jobTitles.map(title => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-slate-900">Advanced Targeting</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label>Recent Hiring Activity</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="hiring-30" />
                  <Label htmlFor="hiring-30" className="text-sm">Posted jobs in last 30 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="growth-mode" />
                  <Label htmlFor="growth-mode" className="text-sm">Rapid growth indicators</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>LinkedIn Activity</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="active-poster" />
                  <Label htmlFor="active-poster" className="text-sm">Active LinkedIn poster</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hr-content" />
                  <Label htmlFor="hr-content" className="text-sm">Shares HR content</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="space-y-3">
          <Label htmlFor="keyword-search">Keyword Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="keyword-search"
              placeholder="Search by keywords, company names, or specific criteria..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button className="flex-1">
            Apply Filters & Search
          </Button>
          <Button variant="outline">
            Save Filter Set
          </Button>
        </div>

        {/* Filter Stats */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">847</p>
              <p className="text-sm text-slate-600">Matching Prospects</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">73%</p>
              <p className="text-sm text-slate-600">Avg Response Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">156</p>
              <p className="text-sm text-slate-600">New This Week</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
