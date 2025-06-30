
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Filter, 
  Building2, 
  MapPin, 
  Users, 
  Briefcase, 
  Search,
  TrendingUp,
  Activity
} from "lucide-react";

export const LeadFilters = () => {
  const [companySize, setCompanySize] = useState([50]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [keywordSearch, setKeywordSearch] = useState("");
  const [recentHiring, setRecentHiring] = useState(false);
  const [rapidGrowth, setRapidGrowth] = useState(false);
  const [activeLinkedIn, setActiveLinkedIn] = useState(false);
  const [sharesHRContent, setSharesHRContent] = useState(false);

  // Fetch real prospects data to show actual counts
  const { data: prospects } = useQuery({
    queryKey: ['prospects-with-filters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prospects')
        .select('*, companies(*)')
        .order('lead_score', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch companies data for filter options
  const { data: companies } = useQuery({
    queryKey: ['companies-for-filters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('industry, location')
        .not('industry', 'is', null)
        .not('location', 'is', null);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Get unique industries and locations
  const uniqueIndustries = [...new Set(companies?.map(c => c.industry).filter(Boolean))];
  const uniqueLocations = [...new Set(companies?.map(c => c.location).filter(Boolean))];

  // Filter prospects based on current filters
  const filteredProspects = prospects?.filter(prospect => {
    if (selectedIndustry && prospect.companies?.industry !== selectedIndustry) return false;
    if (selectedLocation && prospect.companies?.location !== selectedLocation) return false;
    if (selectedJobTitle && !prospect.title.toLowerCase().includes(selectedJobTitle.toLowerCase())) return false;
    if (keywordSearch && !prospect.title.toLowerCase().includes(keywordSearch.toLowerCase()) && 
        !prospect.companies?.name.toLowerCase().includes(keywordSearch.toLowerCase())) return false;
    return true;
  }) || [];

  // Calculate response rate based on actual data
  const totalInteractions = filteredProspects.length;
  const responseRate = totalInteractions > 0 ? 
    Math.round((filteredProspects.filter(p => p.status === 'connected' || p.status === 'qualified').length / totalInteractions) * 100) : 0;

  // Calculate new prospects this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newThisWeek = filteredProspects.filter(p => 
    new Date(p.created_at) > oneWeekAgo
  ).length;

  const handleApplyFilters = () => {
    console.log('Applying filters:', {
      companySize,
      selectedIndustry,
      selectedLocation,
      selectedJobTitle,
      keywordSearch,
      recentHiring,
      rapidGrowth,
      activeLinkedIn,
      sharesHRContent
    });
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <span>Lead Targeting Filters</span>
        </CardTitle>
        <CardDescription>
          Refine your prospect search with advanced targeting criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Company Size
            </label>
            <div className="px-3 py-2 bg-slate-50 rounded-lg">
              <Slider
                value={companySize}
                onValueChange={setCompanySize}
                max={5000}
                min={50}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>50+</span>
                <span>{companySize[0]}+ employees</span>
                <span>5000+</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Industry
            </label>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                {uniqueIndustries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Job Title
            </label>
            <Select value={selectedJobTitle} onValueChange={setSelectedJobTitle}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue placeholder="Select job title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Titles</SelectItem>
                <SelectItem value="hr director">HR Director</SelectItem>
                <SelectItem value="people">People & Culture</SelectItem>
                <SelectItem value="head of hr">Head of HR</SelectItem>
                <SelectItem value="chief people officer">Chief People Officer</SelectItem>
                <SelectItem value="talent">Talent Acquisition</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Targeting */}
        <div className="space-y-4">
          <h4 className="font-medium text-slate-900">Advanced Targeting</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-slate-700">Recent Hiring Activity</h5>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="recent-hiring"
                  checked={recentHiring}
                  onCheckedChange={setRecentHiring}
                />
                <label htmlFor="recent-hiring" className="text-sm text-slate-600">
                  Posted jobs in last 30 days
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rapid-growth"
                  checked={rapidGrowth}
                  onCheckedChange={setRapidGrowth}
                />
                <label htmlFor="rapid-growth" className="text-sm text-slate-600">
                  Rapid growth indicators
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-medium text-slate-700">LinkedIn Activity</h5>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="active-linkedin"
                  checked={activeLinkedIn}
                  onCheckedChange={setActiveLinkedIn}
                />
                <label htmlFor="active-linkedin" className="text-sm text-slate-600">
                  Active LinkedIn poster
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="shares-hr"
                  checked={sharesHRContent}
                  onCheckedChange={setSharesHRContent}
                />
                <label htmlFor="shares-hr" className="text-sm text-slate-600">
                  Shares HR content
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Keyword Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Keyword Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by keywords, company names, or specific criteria..."
              value={keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
              className="pl-10 bg-slate-50"
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleApplyFilters}
            className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8"
          >
            Apply Filters & Search
          </Button>
        </div>

        {/* Results Summary - Real Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {filteredProspects.length}
            </div>
            <div className="text-sm text-slate-600">Matching Prospects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {responseRate}%
            </div>
            <div className="text-sm text-slate-600">Avg Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {newThisWeek}
            </div>
            <div className="text-sm text-slate-600">New This Week</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
