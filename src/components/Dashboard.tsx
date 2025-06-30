import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LinkedInConnector } from "./LinkedInConnector";
import { MessageTemplates } from "./MessageTemplates";
import { LeadPipeline } from "./LeadPipeline";
import { ProspectInteractionDemo } from "./ProspectInteractionDemo";
import { ActivityDashboard } from "./ActivityDashboard";
import { CalendarIntegration } from "./CalendarIntegration";
import { BookingAgent } from "./BookingAgent";
import { LeadFilters } from "./LeadFilters";
import { ConversationAnalyzerComponent } from "./ConversationAnalyzerComponent";
import { Linkedin, MessageSquare, Calendar, Users, TrendingUp, Settings, Target, Bot } from "lucide-react";

interface DashboardProps {
  user: any;
}

export const Dashboard = ({ user }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">The Peoples Partner</h1>
                <p className="text-sm text-slate-600">LinkedIn AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Demo Mode
              </Badge>
              <div className="text-sm text-slate-600">
                Welcome, {user?.user_metadata?.full_name || "Demo User"}!
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto lg:grid-cols-none lg:flex lg:space-x-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Pipeline</span>
            </TabsTrigger>
            <TabsTrigger value="interactions" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Prospects</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Analyzer</span>
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Booking</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connections Sent</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">+12% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+18% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
            </div>
            
            <ActivityDashboard />
          </TabsContent>

          <TabsContent value="linkedin">
            <LinkedInConnector 
              isConnected={isLinkedInConnected}
              onConnectionChange={setIsLinkedInConnected}
            />
          </TabsContent>

          <TabsContent value="templates">
            <MessageTemplates />
          </TabsContent>

          <TabsContent value="pipeline">
            <div className="space-y-6">
              <LeadFilters />
              <LeadPipeline />
            </div>
          </TabsContent>

          <TabsContent value="interactions">
            <ProspectInteractionDemo user={user} />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarIntegration />
          </TabsContent>

          <TabsContent value="analyzer">
            <ConversationAnalyzerComponent user={user} />
          </TabsContent>

          <TabsContent value="booking">
            <BookingAgent user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
