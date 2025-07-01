
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Calendar, Mail, Phone, MessageSquare, BarChart3, Target, Zap } from "lucide-react";

const CoachingTool = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Corporate Coaching Sales Automation
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Tool for Booking Corporate Coaching Consultations
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <Badge variant="secondary">UK Corporate Focus</Badge>
            <Badge variant="secondary">Multi-Channel Outreach</Badge>
            <Badge variant="secondary">AI Automation</Badge>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Corporate Database */}
          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Corporate Database</span>
              </CardTitle>
              <CardDescription>
                Manage your UK corporate client database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Companies</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Prospects</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <Button className="w-full mt-4">
                  <Building2 className="w-4 h-4 mr-2" />
                  Manage Companies
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Email Campaigns */}
          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-green-600" />
                <span>AI Email Campaigns</span>
              </CardTitle>
              <CardDescription>
                Automated email outreach to corporate clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Campaigns</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <Badge variant="outline">0%</Badge>
                </div>
                <Button className="w-full mt-4">
                  <Zap className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Consultation Bookings */}
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span>Consultation Bookings</span>
              </CardTitle>
              <CardDescription>
                Automated booking and scheduling system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Week</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <Badge variant="outline">0%</Badge>
                </div>
                <Button className="w-full mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Channels */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-gray-700" />
              <span>Multi-Channel Communication</span>
            </CardTitle>
            <CardDescription>
              Reach corporate clients through multiple channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-medium">Email Campaigns</h4>
                  <p className="text-sm text-gray-600">Primary outreach channel</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Phone className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-medium">Phone Outreach</h4>
                  <p className="text-sm text-gray-600">Follow-up calls</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="font-medium">SMS & WhatsApp</h4>
                  <p className="text-sm text-gray-600">Quick follow-ups</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coaching Services Overview */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-700" />
              <span>Coaching Services Portfolio</span>
            </CardTitle>
            <CardDescription>
              Services offered to corporate clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-medium">Executive Coaching</h4>
                <p className="text-sm text-gray-600">Leadership development</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-medium">Team Coaching</h4>
                <p className="text-sm text-gray-600">Team performance</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-medium">Performance Coaching</h4>
                <p className="text-sm text-gray-600">Results optimization</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600 mb-2" />
                <h4 className="font-medium">Change Management</h4>
                <p className="text-sm text-gray-600">Organizational change</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button size="lg" className="h-16">
            <Building2 className="w-5 h-5 mr-2" />
            Add Companies
          </Button>
          <Button size="lg" variant="outline" className="h-16">
            <Mail className="w-5 h-5 mr-2" />
            Create Campaign
          </Button>
          <Button size="lg" variant="outline" className="h-16">
            <Calendar className="w-5 h-5 mr-2" />
            View Bookings
          </Button>
          <Button size="lg" variant="outline" className="h-16">
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoachingTool;
