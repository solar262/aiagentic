
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Zap,
  BarChart3,
  Clock,
  Mail,
  Phone,
  Globe
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
                          <p className="text-sm text-red-700">Check your daily limits and LinkedIn account status</p>
                        </div>
                        <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                          <h5 className="font-medium text-yellow-800">Low Response Rates</h5>
                          <p className="text-sm text-yellow-700">Review and personalize your message templates</p>
                        </div>
                        <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                          <h5 className="font-medium text-blue-800">Calendar Integration Issues</h5>
                          <p className="text-sm text-blue-700">Verify your Calendly connection and permissions</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="contact-support">
                    <AccordionTrigger>Contact Support</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <Mail className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                            <h5 className="font-medium">Email Support</h5>
                            <p className="text-sm text-slate-600">support@example.com</p>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <Phone className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <h5 className="font-medium">Phone Support</h5>
                            <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <Globe className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                            <h5 className="font-medium">Knowledge Base</h5>
                            <p className="text-sm text-slate-600">help.example.com</p>
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
