
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  BookOpen,
  Bell,
  Zap,
  Target,
  CreditCard
} from "lucide-react";

import { ActivityDashboard } from "./ActivityDashboard";
import { LeadPipeline } from "./LeadPipeline";
import { MessageTemplates } from "./MessageTemplates";
import { CalendarIntegration } from "./CalendarIntegration";
import { UserGuide } from "./UserGuide";
import { Settings as SettingsComponent } from "./Settings";
import { CampaignManagement } from "./CampaignManagement";
import { UsageDashboard } from "./UsageDashboard";
import { useSubscription } from "@/hooks/useSubscription";

interface DashboardProps {
  user?: any;
}

export const Dashboard = ({ user }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { subscription_tier } = useSubscription();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">LinkedIn AI Assistant</h1>
            <p className="text-slate-600 mt-1">
              Welcome back, {user?.user_metadata?.full_name || 'User'}! Let's grow your network today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={subscription_tier === 'free' ? 'secondary' : 'default'} className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>{subscription_tier.charAt(0).toUpperCase() + subscription_tier.slice(1)} Plan</span>
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-8 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Usage</span>
            </TabsTrigger>
            <TabsTrigger value="prospects" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Prospects</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Guide</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <ActivityDashboard user={user} />
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <UsageDashboard user={user} />
          </TabsContent>

          <TabsContent value="prospects" className="space-y-6">
            <LeadPipeline user={user} />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <CampaignManagement user={user} />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <MessageTemplates user={user} />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <CalendarIntegration user={user} />
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <UserGuide />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsComponent user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
