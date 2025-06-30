
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  MessageSquare, 
  Calendar, 
  Mail,
  Phone,
  ExternalLink,
  MoreHorizontal,
  Clock
} from "lucide-react";

const mockLeads = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "HR Director",
    company: "TechFlow Solutions",
    employees: "250-500",
    industry: "Technology",
    location: "London, UK",
    status: "qualified",
    lastContact: "2 days ago",
    nextAction: "Follow-up call scheduled",
    connectionDate: "2024-01-15",
    engagement: 85,
    notes: "Interested in employee retention strategies. Has budget allocated for Q2.",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "James Rodriguez",
    title: "People & Culture Lead",
    company: "GreenTech Innovations",
    employees: "100-250",
    industry: "Clean Energy",
    location: "Manchester, UK",
    status: "engaged",
    lastContact: "5 hours ago",
    nextAction: "Send case study",
    connectionDate: "2024-01-12",
    engagement: 70,
    notes: "Expanding team rapidly. Needs inclusive leadership training.",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Emma Thompson",
    title: "Talent Manager",
    company: "Financial Focus Ltd",
    employees: "500+",
    industry: "Financial Services",
    location: "Edinburgh, UK",
    status: "new",
    lastContact: "1 day ago",
    nextAction: "Initial connection made",
    connectionDate: "2024-01-18",
    engagement: 45,
    notes: "Recently connected. Works in fast-paced environment.",
    avatar: "/placeholder.svg"
  }
];

const statusConfig = {
  new: { label: "New Prospect", color: "bg-blue-500", textColor: "text-blue-700" },
  engaged: { label: "Engaged", color: "bg-yellow-500", textColor: "text-yellow-700" },
  qualified: { label: "Qualified", color: "bg-green-500", textColor: "text-green-700" },
  meeting: { label: "Meeting Booked", color: "bg-purple-500", textColor: "text-purple-700" }
};

export const LeadPipeline = () => {
  const [selectedLead, setSelectedLead] = useState(mockLeads[0]);
  const [activeView, setActiveView] = useState("pipeline");

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 80) return "text-green-600";
    if (engagement >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Lead Pipeline</h2>
          <p className="text-slate-600">Track and manage your HR prospect relationships</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Export Leads
          </Button>
          <Button size="sm">
            Add Lead Manually
          </Button>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pipeline Stages */}
            <div className="lg:col-span-2 space-y-4">
              {Object.entries(statusConfig).map(([status, config]) => {
                const leadsInStage = mockLeads.filter(lead => lead.status === status);
                return (
                  <Card key={status} className="bg-white/60 backdrop-blur-sm border-slate-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                          <span>{config.label}</span>
                        </CardTitle>
                        <Badge variant="secondary">{leadsInStage.length}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {leadsInStage.map(lead => (
                          <div 
                            key={lead.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedLead.id === lead.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                            onClick={() => setSelectedLead(lead)}
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={lead.avatar} />
                                <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium text-slate-900">{lead.name}</p>
                                <p className="text-sm text-slate-600">{lead.title}</p>
                                <p className="text-sm text-slate-500">{lead.company}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs text-slate-500">{lead.lastContact}</span>
                              <div className={`text-xs font-medium ${getEngagementColor(lead.engagement)}`}>
                                {lead.engagement}% engaged
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Lead Details */}
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Lead Details</span>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={selectedLead.avatar} />
                    <AvatarFallback className="text-lg">
                      {selectedLead.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-slate-900">{selectedLead.name}</h3>
                  <p className="text-slate-600">{selectedLead.title}</p>
                  <p className="text-slate-500">{selectedLead.company}</p>
                  {getStatusBadge(selectedLead.status)}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{selectedLead.industry}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{selectedLead.employees} employees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">Connected {selectedLead.connectionDate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Engagement Level</h4>
                  <Progress value={selectedLead.engagement} className="h-2" />
                  <p className={`text-sm mt-1 ${getEngagementColor(selectedLead.engagement)}`}>
                    {selectedLead.engagement}% engaged
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Notes</h4>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    {selectedLead.notes}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Next Action</h4>
                  <p className="text-sm text-blue-600 font-medium">{selectedLead.nextAction}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4">
                  <Button size="sm" variant="outline" className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>All Leads</CardTitle>
              <CardDescription>Complete list of your HR prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeads.map(lead => (
                  <div key={lead.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-slate-200">
                    <Avatar>
                      <AvatarImage src={lead.avatar} />
                      <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-slate-900">{lead.name}</p>
                        {getStatusBadge(lead.status)}
                      </div>
                      <p className="text-sm text-slate-600">{lead.title} at {lead.company}</p>
                      <p className="text-sm text-slate-500">{lead.industry} • {lead.employees} employees</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{lead.engagement}%</p>
                      <p className="text-xs text-slate-500">{lead.lastContact}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Pipeline Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Conversion Rate</span>
                    <span className="font-bold text-slate-900">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Avg. Response Time</span>
                    <span className="font-bold text-slate-900">4.2 hours</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Meeting Book Rate</span>
                    <span className="font-bold text-slate-900">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Industry Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { industry: "Technology", count: 12, percentage: 40 },
                    { industry: "Financial Services", count: 8, percentage: 27 },
                    { industry: "Healthcare", count: 6, percentage: 20 },
                    { industry: "Manufacturing", count: 4, percentage: 13 }
                  ].map(item => (
                    <div key={item.industry} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{item.industry}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-900">{item.count}</span>
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
