
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Settings, 
  Linkedin,
  Target,
  Clock,
  TrendingUp,
  Heart,
  Briefcase,
  Mail
} from "lucide-react";
import { LinkedInConnector } from "@/components/LinkedInConnector";
import { LeadPipeline } from "@/components/LeadPipeline";
import { MessageTemplates } from "@/components/MessageTemplates";
import { LeadFilters } from "@/components/LeadFilters";
import { ActivityDashboard } from "@/components/ActivityDashboard";
import { CalendarIntegration } from "@/components/CalendarIntegration";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);

  const stats = [
    { label: "Total Leads", value: "247", icon: Users, change: "+12%" },
    { label: "Active Conversations", value: "43", icon: MessageSquare, change: "+8%" },
    { label: "Meetings Booked", value: "18", icon: Calendar, change: "+25%" },
    { label: "Connection Rate", value: "67%", icon: TrendingUp, change: "+5%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">PeopleFirst AI</h1>
                <p className="text-sm text-slate-600">LinkedIn Assistant for HR Consultancy</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isLinkedInConnected ? "default" : "secondary"} className="flex items-center space-x-1">
                <Linkedin className="w-3 h-3" />
                <span>{isLinkedInConnected ? "Connected" : "Disconnected"}</span>
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="connect" className="flex items-center space-x-2">
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">Connect</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome to PeopleFirst AI, Dr. Sharon!</CardTitle>
                <CardDescription className="text-blue-100">
                  Your intelligent LinkedIn assistant for connecting with HR decision-makers and growing your people-first consultancy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="space-y-2">
                    <p className="text-sm text-blue-100">Quick Start:</p>
                    <ul className="text-sm space-y-1 text-blue-100">
                      <li>• Connect your LinkedIn profile</li>
                      <li>• Set up your targeting filters</li>
                      <li>• Customize your message templates</li>
                    </ul>
                  </div>
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Recent Conversations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Mitchell", title: "HR Director at TechCorp", status: "Responded", time: "2 hours ago" },
                      { name: "James Rodriguez", title: "People & Culture Lead", status: "Connected", time: "5 hours ago" },
                      { name: "Emma Thompson", title: "Talent Manager", status: "Meeting Booked", time: "1 day ago" },
                    ].map((conversation, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{conversation.name}</p>
                          <p className="text-sm text-slate-600">{conversation.title}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={conversation.status === "Meeting Booked" ? "default" : "secondary"} className="mb-1">
                            {conversation.status}
                          </Badge>
                          <p className="text-xs text-slate-500">{conversation.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>Lead Pipeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">New Prospects</span>
                      <span className="text-sm font-bold text-slate-900">127</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Engaged</span>
                      <span className="text-sm font-bold text-slate-900">43</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Qualified</span>
                      <span className="text-sm font-bold text-slate-900">18</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="connect">
            <LinkedInConnector 
              isConnected={isLinkedInConnected}
              onConnectionChange={setIsLinkedInConnected}
            />
          </TabsContent>

          <TabsContent value="leads">
            <div className="space-y-6">
              <LeadFilters />
              <LeadPipeline />
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <MessageTemplates />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarIntegration />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
