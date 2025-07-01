
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
  HelpCircle,
  Copy,
  ExternalLink,
  CreditCard,
  Download,
  Trash2,
  RefreshCw,
  Zap,
  Star,
  AlertTriangle
} from "lucide-react";

export const UserGuide = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", title: "Getting Started", icon: Play },
    { id: "setup-verification", title: "Setup Verification", icon: CheckCircle },
    { id: "dashboard", title: "Dashboard Overview", icon: BarChart3 },
    { id: "prospects", title: "Managing Prospects", icon: Users },
    { id: "templates", title: "Message Templates", icon: MessageSquare },
    { id: "campaigns", title: "Campaign Management", icon: Target },
    { id: "calendar", title: "Calendar Integration", icon: Calendar },
    { id: "analytics", title: "Analytics & Reporting", icon: TrendingUp },
    { id: "settings", title: "Settings & Configuration", icon: Settings },
    { id: "faq", title: "Frequently Asked Questions", icon: HelpCircle },
    { id: "troubleshooting", title: "Troubleshooting Guide", icon: AlertCircle },
    { id: "account-management", title: "Account Management", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Guide</h2>
          <p className="text-slate-600">Complete self-service guide to using your LinkedIn AI Assistant</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          v2.0 - Complete Reference
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

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Success Indicators</h4>
                  <p className="text-sm text-green-700 mb-3">You'll know everything is working when you see:</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Dashboard shows your usage metrics</li>
                    <li>• Templates save successfully</li>
                    <li>• Prospects appear in your list</li>
                    <li>• Calendar test link opens your booking page</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "setup-verification" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Setup Verification</span>
                </CardTitle>
                <CardDescription>Verify your setup is working correctly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Setup Health Check</span>
                  </h4>
                  <p className="text-sm text-yellow-700 mb-3">Go through this checklist to ensure everything is working:</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="profile-check">
                    <AccordionTrigger>✅ Profile & Settings Check</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-2">Go to Settings and verify:</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Full name is filled in</li>
                            <li>• Company name is set</li>
                            <li>• LinkedIn username is entered</li>
                            <li>• Daily limits are configured (start with 20 connections, 50 messages)</li>
                            <li>• Timezone matches your location</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-200">
                          <p className="text-sm text-green-700"><strong>✅ Success:</strong> Settings save without errors and show your information correctly.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="calendar-check">
                    <AccordionTrigger>📅 Calendar Integration Check</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-2">Calendar Setup Steps:</h5>
                          <ol className="text-sm space-y-1 list-decimal list-inside">
                            <li>Get your Calendly/Cal.com booking link</li>
                            <li>Paste it in Calendar Integration settings</li>
                            <li>Click "Test Integration" button</li>
                            <li>Verify the link opens your booking page</li>
                          </ol>
                        </div>
                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                          <h5 className="font-medium text-blue-800 mb-1">Sample Calendly URL format:</h5>
                          <code className="text-sm bg-blue-100 px-2 py-1 rounded">https://calendly.com/your-username/meeting</code>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-200">
                          <p className="text-sm text-green-700"><strong>✅ Success:</strong> Test link opens your actual booking page in a new tab.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="template-check">
                    <AccordionTrigger>💬 Message Template Check</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-2">Template Test:</h5>
                          <ol className="text-sm space-y-1 list-decimal list-inside">
                            <li>Create a simple connection request template</li>
                            <li>Use variables like {`{{firstName}}`} and {`{{company}}`}</li>
                            <li>Save the template</li>
                            <li>Check it appears in your templates list</li>
                          </ol>
                        </div>
                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                          <h5 className="font-medium text-blue-800 mb-1">Sample Template:</h5>
                          <div className="text-sm bg-blue-100 p-2 rounded">
                            <p>Hi {`{{firstName}}`},</p>
                            <p>I noticed your work at {`{{company}}`} and would love to connect!</p>
                            <p>Best regards</p>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-200">
                          <p className="text-sm text-green-700"><strong>✅ Success:</strong> Template saves and shows in your list with variables highlighted.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="prospect-check">
                    <AccordionTrigger>👥 Prospect Management Check</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-2">Add Test Prospect:</h5>
                          <ol className="text-sm space-y-1 list-decimal list-inside">
                            <li>Go to Prospects section</li>
                            <li>Click "Add Prospect" manually</li>
                            <li>Fill in name, title, company</li>
                            <li>Save and verify it appears in your list</li>
                          </ol>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-200">
                          <p className="text-sm text-green-700"><strong>✅ Success:</strong> Prospect saves and shows in your prospects list with all details.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">🚨 If Something Isn't Working</h4>
                  <p className="text-sm text-red-700 mb-2">Check the browser console for errors:</p>
                  <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                    <li>Press F12 to open developer tools</li>
                    <li>Click the "Console" tab</li>
                    <li>Look for red error messages</li>
                    <li>Try the action again and watch for new errors</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "faq" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="getting-started-faq">
                    <AccordionTrigger>🚀 Getting Started Questions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Do I need a LinkedIn Premium account?</h5>
                          <p className="text-sm text-slate-600">A: No, a regular LinkedIn account works fine. Premium can help with advanced search, but it's not required.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: How long does setup take?</h5>
                          <p className="text-sm text-slate-600">A: About 5-10 minutes. Complete your profile, add a template, and set up calendar integration.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Can I import prospects from my CRM?</h5>
                          <p className="text-sm text-slate-600">A: Yes, export from your CRM as CSV and import here. Make sure to include name, title, company, and LinkedIn URL columns.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="linkedin-safety-faq">
                    <AccordionTrigger>🛡️ LinkedIn Safety & Limits</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: What are safe daily limits?</h5>
                          <p className="text-sm text-slate-600">A: Start with 20 connections and 50 messages per day. Gradually increase based on your acceptance rates.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Will LinkedIn restrict my account?</h5>
                          <p className="text-sm text-slate-600">A: Not if you follow limits and maintain good acceptance rates (&gt;30%). Avoid sudden spikes in activity.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: What if I get a LinkedIn warning?</h5>
                          <p className="text-sm text-slate-600">A: Pause campaigns immediately, reduce limits by 50%, and wait 1-2 weeks before resuming slowly.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="templates-faq">
                    <AccordionTrigger>💬 Message Templates</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Which variables can I use?</h5>
                          <div className="text-sm text-slate-600">
                            <p className="mb-2">A: Available variables:</p>
                            <div className="grid grid-cols-2 gap-1">
                              <code className="bg-slate-100 px-2 py-1 rounded text-xs">{`{{firstName}}`}</code>
                              <code className="bg-slate-100 px-2 py-1 rounded text-xs">{`{{lastName}}`}</code>
                              <code className="bg-slate-100 px-2 py-1 rounded text-xs">{`{{company}}`}</code>
                              <code className="bg-slate-100 px-2 py-1 rounded text-xs">{`{{title}}`}</code>
                              <code className="bg-slate-100 px-2 py-1 rounded text-xs">{`{{yourName}}`}</code>
                              <code className="bg-slate-100 px-2 py-1 rounded text-xs">{`{{yourCompany}}`}</code>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: How do I improve response rates?</h5>
                          <p className="text-sm text-slate-600">A: Personalize with company news, mutual connections, or recent posts. Keep messages under 300 characters for connection requests.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Can I A/B test templates?</h5>
                          <p className="text-sm text-slate-600">A: Yes, create multiple templates and track their performance in Analytics. Use the best-performing ones for your campaigns.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="calendar-faq">
                    <AccordionTrigger>📅 Calendar Integration</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Which calendar apps work?</h5>
                          <p className="text-sm text-slate-600">A: Calendly, Cal.com, Acuity Scheduling, and any service that provides a public booking link.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Why isn't my calendar link working?</h5>
                          <p className="text-sm text-slate-600">A: Ensure the link is public and starts with https://. Test it in an incognito browser window.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: How do prospects book meetings?</h5>
                          <p className="text-sm text-slate-600">A: When they respond positively, include your calendar link in follow-up messages or use booking templates.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="billing-faq">
                    <AccordionTrigger>💳 Billing & Plans</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: What's included in the free plan?</h5>
                          <p className="text-sm text-slate-600">A: 25 connections, 3 templates, basic analytics. Perfect for testing the platform.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Can I cancel anytime?</h5>
                          <p className="text-sm text-slate-600">A: Yes, cancel anytime from your billing page. You'll keep access until the end of your billing period.</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                          <h5 className="font-medium mb-1">Q: Do you offer refunds?</h5>
                          <p className="text-sm text-slate-600">A: Yes, within 30 days if you're not satisfied. Contact us with your reason and we'll process it quickly.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                    <Copy className="w-4 h-4" />
                    <span>Copy-Paste Templates</span>
                  </h4>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="connection-templates">
                      <AccordionTrigger className="text-sm">Connection Request Templates</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-white rounded border">
                            <h5 className="font-medium text-sm mb-1">Industry Focus Template</h5>
                            <div className="text-sm bg-slate-50 p-2 rounded">
                              <p>Hi {`{{firstName}}`},</p>
                              <p>I help companies in {`{{industry}}`} improve their team culture and retention. Would love to connect and share insights relevant to {`{{company}}`}!</p>
                            </div>
                          </div>
                          <div className="p-3 bg-white rounded border">
                            <h5 className="font-medium text-sm mb-1">Mutual Connection Template</h5>
                            <div className="text-sm bg-slate-50 p-2 rounded">
                              <p>Hi {`{{firstName}}`},</p>
                              <p>We have several mutual connections in the HR space. I'd love to connect and potentially collaborate on building stronger company cultures.</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="followup-templates">
                      <AccordionTrigger className="text-sm">Follow-up Message Templates</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-white rounded border">
                            <h5 className="font-medium text-sm mb-1">Value-First Follow-up</h5>
                            <div className="text-sm bg-slate-50 p-2 rounded">
                              <p>Hi {`{{firstName}}`},</p>
                              <p>Thanks for connecting! I saw {`{{company}}`} is growing rapidly. Here's a resource that helped similar companies maintain culture during scale: [link]</p>
                              <p>Happy to discuss how we've helped companies like yours if you're interested.</p>
                            </div>
                          </div>
                          <div className="p-3 bg-white rounded border">
                            <h5 className="font-medium text-sm mb-1">Meeting Request Template</h5>
                            <div className="text-sm bg-slate-50 p-2 rounded">
                              <p>Hi {`{{firstName}}`},</p>
                              <p>I'd love to learn more about {`{{company}}`}'s culture initiatives and share how we've helped similar companies reduce turnover by 40%.</p>
                              <p>Would you be open to a brief 15-minute conversation? Here's my calendar: [calendar link]</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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

          {activeSection === "calendar" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span>Calendar Integration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Supported Platforms</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-green-700">✅ Calendly</div>
                    <div className="text-sm text-green-700">✅ Cal.com</div>
                    <div className="text-sm text-green-700">✅ Acuity Scheduling</div>
                    <div className="text-sm text-green-700">✅ Any public booking link</div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="setup-calendly">
                    <AccordionTrigger>Setting up Calendly Integration</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded">
                          <h5 className="font-medium text-blue-800 mb-2">Step-by-Step Setup:</h5>
                          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                            <li>Sign up for Calendly at calendly.com</li>
                            <li>Create a meeting type (e.g., "Discovery Call - 30 min")</li>
                            <li>Copy your Calendly link (looks like: calendly.com/yourname/meeting)</li>
                            <li>Paste it in our Calendar Integration settings</li>
                            <li>Click "Test Integration" to verify</li>
                          </ol>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                          <h5 className="font-medium text-yellow-800 mb-1">Example Calendly URL:</h5>
                          <code className="text-sm bg-yellow-100 px-2 py-1 rounded">https://calendly.com/john-smith/discovery-call</code>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="setup-cal">
                    <AccordionTrigger>Setting up Cal.com Integration</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-purple-50 rounded">
                          <h5 className="font-medium text-purple-800 mb-2">Cal.com Setup:</h5>
                          <ol className="text-sm text-purple-700 space-y-1 list-decimal list-inside">
                            <li>Create account at cal.com</li>
                            <li>Set up your first event type</li>
                            <li>Get your booking link from the event settings</li>
                            <li>Add it to our platform</li>
                            <li>Test the integration</li>
                          </ol>
                        </div>
                        <div className="p-3 bg-purple-100 rounded">
                          <p className="text-sm text-purple-700">💡 Cal.com is open-source and offers more customization options than Calendly.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="troubleshooting-calendar">
                    <AccordionTrigger>Calendar Troubleshooting</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 rounded border border-red-200">
                          <h5 className="font-medium text-red-800 mb-2">Common Issues & Solutions:</h5>
                          <div className="space-y-2 text-sm text-red-700">
                            <div>
                              <strong>Link doesn't work:</strong> Ensure URL starts with https:// and is publicly accessible
                            </div>
                            <div>
                              <strong>Test fails:</strong> Try the link in an incognito browser window
                            </div>
                            <div>
                              <strong>No meetings showing:</strong> Check if meetings are actually booked in your calendar app
                            </div>
                          </div>
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
                  <span>Troubleshooting Guide</span>
                </CardTitle>
                <CardDescription>Comprehensive solutions for common issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="nothing-working">
                    <AccordionTrigger>🚨 "Nothing is Working" - Emergency Troubleshooting</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h5 className="font-semibold text-red-800 mb-2">Quick Diagnosis Checklist</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start space-x-2">
                              <input type="checkbox" className="mt-0.5" />
                              <span>Can you log in to your account?</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <input type="checkbox" className="mt-0.5" />
                              <span>Does the dashboard load without errors?</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <input type="checkbox" className="mt-0.5" />
                              <span>Can you save settings changes?</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <input type="checkbox" className="mt-0.5" />
                              <span>Are your prospects showing in the list?</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <input type="checkbox" className="mt-0.5" />
                              <span>Do templates save successfully?</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">Step-by-Step Recovery</h5>
                          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                            <li>Clear your browser cache and cookies</li>
                            <li>Try using an incognito/private browser window</li>
                            <li>Check if you're using a supported browser (Chrome, Firefox, Safari, Edge)</li>
                            <li>Disable browser extensions temporarily</li>
                            <li>Check your internet connection</li>
                            <li>Try accessing from a different device</li>
                          </ol>
                        </div>

                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h5 className="font-semibold text-yellow-800 mb-2">Still Not Working?</h5>
                          <p className="text-sm text-yellow-700 mb-2">Check browser console for error messages:</p>
                          <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
                            <li>Press F12 (or Cmd+Option+I on Mac)</li>
                            <li>Click "Console" tab</li>
                            <li>Look for red error messages</li>
                            <li>Note down the exact error text</li>
                          </ol>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="common-errors">
                    <AccordionTrigger>❌ Common Error Messages & Solutions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-3 border-l-4 border-red-500 bg-red-50">
                          <h5 className="font-medium text-red-800">"Failed to save settings"</h5>
                          <p className="text-sm text-red-700 mb-2">Usually caused by network issues or validation errors</p>
                          <ul className="text-xs text-red-600 space-y-1 list-disc list-inside">
                            <li>Check all required fields are filled</li>
                            <li>Ensure email format is valid</li>
                            <li>Try refreshing the page and saving again</li>
                            <li>Check your internet connection</li>
                          </ul>
                        </div>

                        <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                          <h5 className="font-medium text-yellow-800">"Template could not be saved"</h5>
                          <p className="text-sm text-yellow-700 mb-2">Template validation or content issues</p>
                          <ul className="text-xs text-yellow-600 space-y-1 list-disc list-inside">
                            <li>Check template name is not empty</li>
                            <li>Ensure message content is provided</li>
                            <li>Verify variable syntax: {`{{firstName}}`} not {`{firstName}`}</li>
                            <li>Remove any special characters from template name</li>
                          </ul>
                        </div>

                        <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                          <h5 className="font-medium text-blue-800">"Calendar test failed"</h5>
                          <p className="text-sm text-blue-700 mb-2">Calendar integration setup issues</p>
                          <ul className="text-xs text-blue-600 space-y-1 list-disc list-inside">
                            <li>Ensure URL starts with https://</li>
                            <li>Test the link manually in new browser tab</li>
                            <li>Check if calendar link is publicly accessible</li>
                            <li>Verify you copied the complete URL</li>
                          </ul>
                        </div>

                        <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                          <h5 className="font-medium text-purple-800">"No prospects found"</h5>
                          <p className="text-sm text-purple-700 mb-2">Data loading or filtering issues</p>
                          <ul className="text-xs text-purple-600 space-y-1 list-disc list-inside">
                            <li>Clear any active filters</li>
                            <li>Try refreshing the page</li>
                            <li>Check if you've actually added prospects</li>
                            <li>Verify you're looking at the right campaign</li>
                          </ul>
                        </div>

                        <div className="p-3 border-l-4 border-green-500 bg-green-50">
                          <h5 className="font-medium text-green-800">"Login failed" or "Session expired"</h5>
                          <p className="text-sm text-green-700 mb-2">Authentication issues</p>
                          <ul className="text-xs text-green-600 space-y-1 list-disc list-inside">
                            <li>Clear browser cookies for this site</li>
                            <li>Try logging out and back in</li>
                            <li>Check if email/password is correct</li>
                            <li>Reset password if needed</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="performance-issues">
                    <AccordionTrigger>⚡ Performance & Loading Issues</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <h5 className="font-semibold text-orange-800 mb-2">Slow Loading Times</h5>
                          <ul className="text-sm text-orange-700 space-y-1 list-disc list-inside">
                            <li>Check your internet connection speed</li>
                            <li>Close unnecessary browser tabs</li>
                            <li>Clear browser cache (Ctrl+Shift+Delete)</li>
                            <li>Try using a different browser</li>
                            <li>Disable browser extensions temporarily</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-indigo-50 rounded-lg">
                          <h5 className="font-semibold text-indigo-800 mb-2">Page Won't Load</h5>
                          <ul className="text-sm text-indigo-700 space-y-1 list-disc list-inside">
                            <li>Refresh the page (F5 or Ctrl+R)</li>
                            <li>Try hard refresh (Ctrl+Shift+R)</li>
                            <li>Check if other websites work</li>
                            <li>Try accessing from different device</li>
                            <li>Wait 5 minutes and try again (might be temporary)</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-teal-50 rounded-lg">
                          <h5 className="font-semibold text-teal-800 mb-2">Features Not Responding</h5>
                          <ul className="text-sm text-teal-700 space-y-1 list-disc list-inside">
                            <li>Wait for any loading indicators to finish</li>
                            <li>Don't click buttons multiple times</li>
                            <li>Check if JavaScript is enabled</li>
                            <li>Disable ad blockers temporarily</li>
                            <li>Try using keyboard shortcuts instead of mouse</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="data-issues">
                    <AccordionTrigger>📊 Data & Sync Issues</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-pink-50 rounded-lg">
                          <h5 className="font-semibold text-pink-800 mb-2">Data Not Showing</h5>
                          <ul className="text-sm text-pink-700 space-y-1 list-disc list-inside">
                            <li>Refresh the page to reload data</li>
                            <li>Check if you have any active filters</li>
                            <li>Verify you're looking at the correct date range</li>
                            <li>Ensure you've actually added data to display</li>
                            <li>Try switching to a different section and back</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-cyan-50 rounded-lg">
                          <h5 className="font-semibold text-cyan-800 mb-2">Analytics Not Updating</h5>
                          <ul className="text-sm text-cyan-700 space-y-1 list-disc list-inside">
                            <li>Analytics update every 1-4 hours</li>
                            <li>Check the "Last Updated" timestamp</li>
                            <li>Ensure campaigns are actually running</li>
                            <li>Verify activities are being tracked</li>
                            <li>Try changing the date range</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-lime-50 rounded-lg">
                          <h5 className="font-semibold text-lime-800 mb-2">Import/Export Problems</h5>
                          <ul className="text-sm text-lime-700 space-y-1 list-disc list-inside">
                            <li>Check file format (CSV required for imports)</li>
                            <li>Ensure file size is under 10MB</li>
                            <li>Verify column headers match required format</li>
                            <li>Remove any special characters from data</li>
                            <li>Try importing a smaller test file first</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="account-restrictions">
                    <AccordionTrigger>🚫 LinkedIn Account Restrictions</AccordionTrigger>
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
                        <div className="p-3 bg-red-50 rounded-lg">
                          <h5 className="font-medium text-red-800 mb-2">If You Get Restricted</h5>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Pause all campaigns immediately</li>
                            <li>• Reduce limits by 50%</li>
                            <li>• Wait 1-2 weeks before resuming</li>
                            <li>• Focus on quality over quantity</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="browser-compatibility">
                    <AccordionTrigger>🌐 Browser & Device Compatibility</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">Supported Browsers</h5>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-green-700">✅ Chrome (latest)</div>
                            <div className="text-green-700">✅ Firefox (latest)</div>
                            <div className="text-green-700">✅ Safari (latest)</div>
                            <div className="text-green-700">✅ Edge (latest)</div>
                          </div>
                          <p className="text-sm text-blue-700 mt-2">Note: Internet Explorer is not supported</p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h5 className="font-semibold text-purple-800 mb-2">Browser Settings</h5>
                          <ul className="text-sm text-purple-700 space-y-1 list-disc list-inside">
                            <li>Enable JavaScript (required)</li>
                            <li>Allow cookies from this site</li>
                            <li>Disable strict ad blockers</li>
                            <li>Enable pop-ups for calendar integration</li>
                            <li>Keep browser updated to latest version</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2">Mobile Usage</h5>
                          <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                            <li>Works on mobile browsers</li>
                            <li>Optimized for tablets and phones</li>
                            <li>Some features better on desktop</li>
                            <li>Use mobile for quick checks</li>
                            <li>Desktop recommended for setup</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}

          {activeSection === "account-management" && (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Account Management</span>
                </CardTitle>
                <CardDescription>Billing, security, and account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="billing-management">
                    <AccordionTrigger>💳 Billing & Subscriptions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">Plan Comparison</h5>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Feature</th>
                                  <th className="text-center py-2">Free</th>
                                  <th className="text-center py-2">Pro</th>
                                  <th className="text-center py-2">Enterprise</th>
                                </tr>
                              </thead>
                              <tbody className="text-blue-700">
                                <tr className="border-b">
                                  <td className="py-1">Monthly Connections</td>
                                  <td className="text-center">25</td>
                                  <td className="text-center">Unlimited</td>
                                  <td className="text-center">Unlimited</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-1">Message Templates</td>
                                  <td className="text-center">3</td>
                                  <td className="text-center">Unlimited</td>
                                  <td className="text-center">Unlimited</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-1">Team Members</td>
                                  <td className="text-center">1</td>
                                  <td className="text-center">10</td>
                                  <td className="text-center">50</td>
                                </tr>
                                <tr>
                                  <td className="py-1">Advanced Analytics</td>
                                  <td className="text-center">❌</td>
                                  <td className="text-center">✅</td>
                                  <td className="text-center">✅</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2">Billing Information</h5>
                          <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                            <li>Monthly billing cycle (charged on signup date)</li>
                            <li>Cancel anytime - no long-term contracts</li>
                            <li>Upgrade/downgrade takes effect immediately</li>
                            <li>30-day money-back guarantee</li>
                            <li>All major credit cards accepted</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <h5 className="font-semibold text-yellow-800 mb-2">Managing Your Subscription</h5>
                          <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• <strong>Upgrade:</strong> Go to Billing page → Choose plan → Confirm</li>
                            <li>• <strong>Cancel:</strong> Billing page → Cancel subscription → Keep access until period ends</li>
                            <li>• <strong>Update Card:</strong> Billing page → Payment methods → Add new card</li>
                            <li>• <strong>Download Invoice:</strong> Billing page → Invoice history → Download PDF</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="data-export">
                    <AccordionTrigger>📥 Data Export & Backup</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-indigo-50 rounded-lg">
                          <h5 className="font-semibold text-indigo-800 mb-2">What You Can Export</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 bg-white rounded border">
                              <div className="flex items-center space-x-2 mb-1">
                                <Download className="w-4 h-4 text-indigo-500" />
                                <span className="font-medium text-sm">Prospects Data</span>
                              </div>
                              <p className="text-xs text-slate-600">All prospect information, status, notes</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <div className="flex items-center space-x-2 mb-1">
                                <Download className="w-4 h-4 text-green-500" />
                                <span className="font-medium text-sm">Message Templates</span>
                              </div>
                              <p className="text-xs text-slate-600">All your message templates and content</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <div className="flex items-center space-x-2 mb-1">
                                <Download className="w-4 h-4 text-blue-500" />
                                <span className="font-medium text-sm">Analytics Data</span>
                              </div>
                              <p className="text-xs text-slate-600">Performance metrics and campaign results</p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <div className="flex items-center space-x-2 mb-1">
                                <Download className="w-4 h-4 text-purple-500" />
                                <span className="font-medium text-sm">Interaction History</span>
                              </div>
                              <p className="text-xs text-slate-600">Message history and prospect responses</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-teal-50 rounded-lg">
                          <h5 className="font-semibold text-teal-800 mb-2">How to Export Data</h5>
                          <ol className="list-decimal list-inside text-sm text-teal-700 space-y-1">
                            <li>Go to Settings → Data Export</li>
                            <li>Select what data you want to export</li>
                            <li>Choose format (CSV or JSON)</li>
                            <li>Click "Generate Export"</li>
                            <li>Download the file when ready (usually 1-5 minutes)</li>
                          </ol>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <h5 className="font-semibold text-amber-800 mb-2">⚠️ Important Notes</h5>
                          <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                            <li>Exports are available for 7 days after generation</li>
                            <li>Large exports may take several minutes to process</li>
                            <li>You'll receive email notification when export is ready</li>
                            <li>Data includes all information, even deleted items</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="account-security">
                    <AccordionTrigger>🔒 Account Security</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg">
                          <h5 className="font-semibold text-red-800 mb-2">Security Best Practices</h5>
                          <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                            <li>Use a strong, unique password (12+ characters)</li>
                            <li>Don't share your login credentials</li>
                            <li>Log out from shared computers</li>
                            <li>Enable two-factor authentication when available</li>
                            <li>Report suspicious activity immediately</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">Password Management</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <strong>Change Password:</strong> Settings → Security → Change Password</li>
                            <li>• <strong>Forgot Password:</strong> Login page → "Forgot Password" → Check email</li>
                            <li>• <strong>Password Requirements:</strong> Minimum 8 characters, mix of letters and numbers</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2">Account Recovery</h5>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Keep your email address updated</li>
                            <li>• Remember the email used for registration</li>
                            <li>• Recovery emails are sent from noreply@ourplatform.com</li>
                            <li>• Check spam folder if you don't receive recovery email</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="account-deletion">
                    <AccordionTrigger>🗑️ Account Deletion</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Before You Delete</h5>
                          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                            <li>Export any data you want to keep</li>
                            <li>Cancel active subscriptions first</li>
                            <li>Download important reports or analytics</li>
                            <li>Note: This action cannot be undone</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h5 className="font-semibold text-red-800 mb-2">Deletion Process</h5>
                          <ol className="list-decimal list-inside text-sm text-red-700 space-y-1">
                            <li>Go to Settings → Account</li>
                            <li>Scroll to "Danger Zone"</li>
                            <li>Click "Delete Account"</li>
                            <li>Type "DELETE" to confirm</li>
                            <li>Click final confirmation button</li>
                          </ol>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h5 className="font-semibold text-slate-800 mb-2">What Gets Deleted</h5>
                          <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                            <li>All prospect data and interaction history</li>
                            <li>Message templates and campaign settings</li>
                            <li>Analytics data and reports</li>
                            <li>Account settings and preferences</li>
                            <li>Billing history (kept for legal requirements)</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">Alternative Options</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <strong>Cancel Subscription:</strong> Keep account, stop billing</li>
                            <li>• <strong>Pause Account:</strong> Temporarily disable without deletion</li>
                            <li>• <strong>Downgrade to Free:</strong> Keep basic features without cost</li>
                          </ul>
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

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900">Still Need Help?</h4>
            <p className="text-sm text-slate-600">
              This guide covers 95% of common questions and issues. If you're still stuck, remember that this is a self-service platform designed to work without support.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-white rounded border">
            <RefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h5 className="font-medium text-sm">Try Again</h5>
            <p className="text-xs text-slate-600">Most issues resolve with a refresh or retry</p>
          </div>
          <div className="text-center p-3 bg-white rounded border">
            <AlertCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h5 className="font-medium text-sm">Check Console</h5>
            <p className="text-xs text-slate-600">Press F12 and look for error messages</p>
          </div>
          <div className="text-center p-3 bg-white rounded border">
            <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h5 className="font-medium text-sm">Follow Guide</h5>
            <p className="text-xs text-slate-600">Step-by-step solutions above</p>
          </div>
        </div>
      </div>
    </div>
  );
};
