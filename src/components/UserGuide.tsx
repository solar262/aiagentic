import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play,
  Target,
  BarChart3,
  Clock,
  Mail,
  Phone,
  Globe,
  FileText,
  Pause,
  PlayCircle,
  StopCircle,
  PieChart,
  LineChart,
  Shield,
  Database,
  Link2,
  HelpCircle
} from "lucide-react";

export const UserGuide = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", title: "Getting Started", icon: Play },
    { id: "dashboard", title: "Dashboard Overview", icon: BarChart3 },
    { id: "prospects", title: "Managing Prospects", icon: Users },
    { id: "templates", title: "Message Templates", icon: MessageSquare },
    { id: "campaigns", title: "Campaign Management", icon: Target },
    { id: "calendar", title: "Calendar Integration", icon: Calendar },
    { id: "analytics", title: "Analytics & Reporting", icon: TrendingUp },
    { id: "settings", title: "Settings & Configuration", icon: Settings },
    { id: "troubleshooting", title: "Troubleshooting", icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Guide</h2>
          <p className="text-slate-600">Complete guide to using your LinkedIn AI Assistant</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          v1.0
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Table of Contents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "getting-started" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-green-600" />
                  <span>Getting Started</span>
                </CardTitle>
                <CardDescription>Set up your LinkedIn AI Assistant in 5 minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <h3 className="font-semibold">Profile Setup</h3>
                    </div>
                    <p className="text-sm text-slate-600">Configure your profile and company information</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <h3 className="font-semibold">Add Prospects</h3>
                    </div>
                    <p className="text-sm text-slate-600">Import or manually add your target prospects</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <h3 className="font-semibold">Launch Campaign</h3>
                    </div>
                    <p className="text-sm text-slate-600">Create and launch your first outreach campaign</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Quick Start Checklist</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Complete profile setup in Settings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Create your first message template</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Import your prospect list</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Set up calendar integration</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "dashboard" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span>Dashboard Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Metrics</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li>• <strong>Messages Sent:</strong> Total outreach messages</li>
                      <li>• <strong>Response Rate:</strong> Percentage of replies received</li>
                      <li>• <strong>Meetings Booked:</strong> Successful appointments scheduled</li>
                      <li>• <strong>Deals Closed:</strong> Converted opportunities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Activity Timeline</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li>• View recent interactions</li>
                      <li>• Track prospect engagement</li>
                      <li>• Monitor campaign performance</li>
                      <li>• Identify follow-up opportunities</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "prospects" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span>Managing Prospects</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="adding-prospects">
                    <AccordionTrigger>How to Add Prospects</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600">You can add prospects in several ways:</p>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Manual Entry</p>
                              <p className="text-xs text-slate-500">Add individual prospects with their LinkedIn profile information</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">CSV Import</p>
                              <p className="text-xs text-slate-500">Bulk import from spreadsheets or CRM exports</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">LinkedIn Integration</p>
                              <p className="text-xs text-slate-500">Direct import from LinkedIn searches</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="prospect-status">
                    <AccordionTrigger>Understanding Prospect Status</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 rounded">
                          <Badge variant="secondary" className="mb-2">Researched</Badge>
                          <p className="text-xs">Initial prospect added to system</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded">
                          <Badge className="mb-2">Contacted</Badge>
                          <p className="text-xs">First outreach message sent</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded">
                          <Badge variant="secondary" className="mb-2 bg-green-100 text-green-800">Connected</Badge>
                          <p className="text-xs">Accepted connection request</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded">
                          <Badge variant="secondary" className="mb-2 bg-orange-100 text-orange-800">Qualified</Badge>
                          <p className="text-xs">Identified as sales opportunity</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}

          {activeSection === "templates" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span>Message Templates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Template Variables</h4>
                  <p className="text-sm text-yellow-700 mb-3">Use these variables to personalize your messages:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <code className="bg-yellow-100 px-2 py-1 rounded">{'{{firstName}}'}</code>
                    <code className="bg-yellow-100 px-2 py-1 rounded">{'{{lastName}}'}</code>
                    <code className="bg-yellow-100 px-2 py-1 rounded">{'{{company}}'}</code>
                    <code className="bg-yellow-100 px-2 py-1 rounded">{'{{title}}'}</code>
                    <code className="bg-yellow-100 px-2 py-1 rounded">{'{{yourName}}'}</code>
                    <code className="bg-yellow-100 px-2 py-1 rounded">{'{{yourCompany}}'}</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Template Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded">
                      <Users className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-sm">Connection Requests</h5>
                        <p className="text-xs text-slate-600">First contact messages to build connections</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-sm">Follow-up Messages</h5>
                        <p className="text-xs text-slate-600">Nurture sequences for ongoing engagement</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded">
                      <Calendar className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-sm">Booking Requests</h5>
                        <p className="text-xs text-slate-600">Messages to schedule meetings and calls</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "campaigns" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-red-600" />
                  <span>Campaign Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="creating-campaigns">
                    <AccordionTrigger>Creating a New Campaign</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Target className="w-4 h-4 text-blue-500" />
                              <h5 className="font-medium">Campaign Setup</h5>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Name your campaign</li>
                              <li>• Set target audience criteria</li>
                              <li>• Define company size range</li>
                              <li>• Select industry focus</li>
                            </ul>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Settings className="w-4 h-4 text-green-500" />
                              <h5 className="font-medium">Automation Settings</h5>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Daily connection limits (1-100)</li>
                              <li>• Message sending limits (1-200)</li>
                              <li>• Follow-up timing delays</li>
                              <li>• Weekend/holiday scheduling</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="campaign-status">
                    <AccordionTrigger>Campaign Status Management</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-gray-50 rounded text-center">
                          <FileText className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                          <Badge variant="secondary" className="mb-2">Draft</Badge>
                          <p className="text-xs">Campaign being configured</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded text-center">
                          <PlayCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                          <Badge className="mb-2 bg-green-100 text-green-800">Active</Badge>
                          <p className="text-xs">Currently running and sending</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded text-center">
                          <Pause className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                          <Badge variant="secondary" className="mb-2 bg-yellow-100 text-yellow-800">Paused</Badge>
                          <p className="text-xs">Temporarily stopped</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded text-center">
                          <StopCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                          <Badge variant="secondary" className="mb-2 bg-red-100 text-red-800">Completed</Badge>
                          <p className="text-xs">Finished running</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="best-practices">
                    <AccordionTrigger>Campaign Best Practices</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2">Daily Limits</h5>
                          <p className="text-sm text-blue-700">Start with 20-30 connections per day to avoid LinkedIn restrictions. Gradually increase based on acceptance rates.</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h5 className="font-medium text-green-800 mb-2">Personalization</h5>
                          <p className="text-sm text-green-700">Use prospect's company, recent posts, or mutual connections to increase response rates by 300%.</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <h5 className="font-medium text-purple-800 mb-2">Follow-up Timing</h5>
                          <p className="text-sm text-purple-700">Wait 3-5 days between messages. Follow up 2-3 times maximum before moving to next sequence.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}

          {activeSection === "analytics" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span>Analytics & Reporting</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <PieChart className="w-5 h-5 text-blue-500" />
                      <span>Key Performance Metrics</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Connection Rate</span>
                          <Badge variant="secondary">Industry Avg: 15-25%</Badge>
                        </div>
                        <p className="text-xs text-slate-600">Percentage of connection requests accepted</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Response Rate</span>
                          <Badge variant="secondary">Industry Avg: 10-20%</Badge>
                        </div>
                        <p className="text-xs text-slate-600">Percentage of messages that receive replies</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Meeting Booking Rate</span>
                          <Badge variant="secondary">Industry Avg: 2-5%</Badge>
                        </div>
                        <p className="text-xs text-slate-600">Conversations that result in scheduled meetings</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <LineChart className="w-5 h-5 text-green-500" />
                      <span>Performance Tracking</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded">
                        <h5 className="font-medium text-green-800">Daily Activity</h5>
                        <p className="text-sm text-green-700">Track messages sent, connections made, and responses received per day</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded">
                        <h5 className="font-medium text-blue-800">Campaign Comparison</h5>
                        <p className="text-sm text-blue-700">Compare performance across different campaigns and time periods</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded">
                        <h5 className="font-medium text-purple-800">Template Performance</h5>
                        <p className="text-sm text-purple-700">Identify your highest-performing message templates</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Optimization Tips</span>
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• <strong>A/B Test Templates:</strong> Try different message variations to improve response rates</li>
                    <li>• <strong>Monitor Timing:</strong> Track which days and times get the best engagement</li>
                    <li>• <strong>Quality over Quantity:</strong> Focus on highly targeted prospects rather than volume</li>
                    <li>• <strong>Follow-up Strategy:</strong> Analyze which follow-up sequences convert best</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
                    <div className="text-2xl font-bold">2.5x</div>
                    <div className="text-sm opacity-90">Average ROI</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg">
                    <div className="text-2xl font-bold">18%</div>
                    <div className="text-sm opacity-90">Avg Response Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg">
                    <div className="text-2xl font-bold">4.2%</div>
                    <div className="text-sm opacity-90">Meeting Book Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg">
                    <div className="text-2xl font-bold">72h</div>
                    <div className="text-sm opacity-90">Avg Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "settings" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <span>Settings & Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="profile-settings">
                    <AccordionTrigger>Profile & Company Settings</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Users className="w-4 h-4 text-blue-500" />
                              <h5 className="font-medium">Personal Information</h5>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Full name and title</li>
                              <li>• LinkedIn profile URL</li>
                              <li>• Professional headshot</li>
                              <li>• Contact information</li>
                            </ul>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Globe className="w-4 h-4 text-green-500" />
                              <h5 className="font-medium">Company Details</h5>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-1">
                              <li>• Company name and description</li>
                              <li>• Value proposition</li>
                              <li>• Industry and services</li>
                              <li>• Website and social links</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="automation-limits">
                    <AccordionTrigger>Automation & Safety Limits</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-5 h-5 text-red-600" />
                            <h5 className="font-semibold text-red-800">LinkedIn Safety Limits</h5>
                          </div>
                          <p className="text-sm text-red-700 mb-3">Configure these limits to avoid LinkedIn restrictions:</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-sm font-medium">Daily Connections</p>
                              <p className="text-xs text-red-600">Recommended: 20-30 per day</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Daily Messages</p>
                              <p className="text-xs text-red-600">Recommended: 50-100 per day</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Follow-up Delay</p>
                              <p className="text-xs text-red-600">Minimum: 24-48 hours</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Weekend Activity</p>
                              <p className="text-xs text-red-600">Recommended: Reduced or paused</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <h5 className="font-semibold text-blue-800">Business Hours</h5>
                          </div>
                          <p className="text-sm text-blue-700">Set your timezone and preferred sending hours to maximize engagement rates.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="integrations">
                    <AccordionTrigger>Integrations & Connections</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-sm">Calendar Integration</p>
                              <p className="text-xs text-slate-600">Calendly, Cal.com, or similar booking tools</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Required</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                          <div className="flex items-center space-x-3">
                            <Link2 className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="font-medium text-sm">LinkedIn Connection</p>
                              <p className="text-xs text-slate-600">Your LinkedIn profile for automation</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Required</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                          <div className="flex items-center space-x-3">
                            <Database className="w-5 h-5 text-purple-500" />
                            <div>
                              <p className="font-medium text-sm">CRM Integration</p>
                              <p className="text-xs text-slate-600">HubSpot, Salesforce, Pipedrive</p>
                            </div>
                          </div>
                          <Badge variant="outline">Optional</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-orange-500" />
                            <div>
                              <p className="font-medium text-sm">Email Integration</p>
                              <p className="text-xs text-slate-600">Gmail, Outlook for follow-ups</p>
                            </div>
                          </div>
                          <Badge variant="outline">Optional</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}

          {activeSection === "troubleshooting" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span>Troubleshooting</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="common-issues">
                    <AccordionTrigger>Common Issues & Solutions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-3 border-l-4 border-red-500 bg-red-50">
                          <h5 className="font-medium text-red-800">Messages Not Sending</h5>
                          <p className="text-sm text-red-700 mb-2">Check your daily limits and LinkedIn account status</p>
                          <ul className="text-xs text-red-600 space-y-1">
                            <li>• Verify LinkedIn account is not restricted</li>
                            <li>• Check daily sending limits in settings</li>
                            <li>• Ensure templates are properly configured</li>
                          </ul>
                        </div>
                        <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                          <h5 className="font-medium text-yellow-800">Low Response Rates</h5>
                          <p className="text-sm text-yellow-700 mb-2">Review and personalize your message templates</p>
                          <ul className="text-xs text-yellow-600 space-y-1">
                            <li>• Add more personalization variables</li>
                            <li>• Research prospects before messaging</li>
                            <li>• A/B test different message approaches</li>
                          </ul>
                        </div>
                        <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                          <h5 className="font-medium text-blue-800">Calendar Integration Issues</h5>
                          <p className="text-sm text-blue-700 mb-2">Verify your calendar connection and permissions</p>
                          <ul className="text-xs text-blue-600 space-y-1">
                            <li>• Check calendar URL is correct and public</li>
                            <li>• Test booking link manually</li>
                            <li>• Verify webhook permissions if applicable</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="account-restrictions">
                    <AccordionTrigger>LinkedIn Account Restrictions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <h5 className="font-medium text-orange-800 mb-2">Warning Signs</h5>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Connection requests being auto-declined</li>
                            <li>• Messages not being delivered</li>
                            <li>• Search functionality limited</li>
                            <li>• Profile views restricted</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h5 className="font-medium text-green-800 mb-2">Prevention Tips</h5>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Stay within recommended daily limits</li>
                            <li>• Maintain high acceptance rates (&gt;30%)</li>
                            <li>• Vary your activity patterns</li>
                            <li>• Use mobile app occasionally</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="contact-support">
                    <AccordionTrigger>Getting Help & Support</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2 flex items-center space-x-2">
                            <HelpCircle className="w-4 h-4" />
                            <span>Self-Help Resources</span>
                          </h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Check this user guide for common solutions</li>
                            <li>• Review campaign settings and limits</li>
                            <li>• Test individual components (templates, calendar)</li>
                            <li>• Monitor analytics for performance insights</li>
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                            <h5 className="font-medium">Documentation</h5>
                            <p className="text-sm text-slate-600 mb-2">Comprehensive guides and tutorials</p>
                            <Button variant="outline" size="sm">View Docs</Button>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <MessageSquare className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <h5 className="font-medium">Community Forum</h5>
                            <p className="text-sm text-slate-600 mb-2">Connect with other users</p>
                            <Button variant="outline" size="sm">Join Forum</Button>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                          <h5 className="font-medium text-purple-800 mb-2">Need Direct Support?</h5>
                          <p className="text-sm text-purple-700 mb-3">
                            For technical issues, billing questions, or custom setup assistance, our support team is here to help.
                          </p>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Contact Support
                            </Button>
                            <Button variant="outline" size="sm">
                              Schedule Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
