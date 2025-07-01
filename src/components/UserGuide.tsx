
import React, { useState } from 'react';
import { Book, ChevronRight, Home, HelpCircle, Wrench, CheckSquare, Settings, Users, MessageSquare, Target, Calendar, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Import the new focused components
import { GettingStarted } from './user-guide/GettingStarted';
import { FAQ } from './user-guide/FAQ';
import { SetupVerification } from './user-guide/SetupVerification';
import { Troubleshooting } from './user-guide/Troubleshooting';
import { AccountManagement } from './user-guide/AccountManagement';

type GuideSection = 'overview' | 'getting-started' | 'dashboard' | 'prospects' | 'templates' | 'campaigns' | 'calendar' | 'analytics' | 'settings' | 'setup-verification' | 'faq' | 'troubleshooting' | 'account-management';

const UserGuide = () => {
  const [activeSection, setActiveSection] = useState<GuideSection>('overview');

  const navigationItems = [
    { key: 'overview' as const, label: 'Overview', icon: Home },
    { key: 'getting-started' as const, label: 'Getting Started', icon: Book },
    { key: 'setup-verification' as const, label: 'Setup Verification', icon: CheckSquare },
    { key: 'dashboard' as const, label: 'Dashboard', icon: BarChart },
    { key: 'prospects' as const, label: 'Managing Prospects', icon: Users },
    { key: 'templates' as const, label: 'Message Templates', icon: MessageSquare },
    { key: 'campaigns' as const, label: 'Campaign Management', icon: Target },
    { key: 'calendar' as const, label: 'Calendar Integration', icon: Calendar },
    { key: 'analytics' as const, label: 'Analytics & Reporting', icon: BarChart },
    { key: 'settings' as const, label: 'Settings', icon: Settings },
    { key: 'faq' as const, label: 'FAQ', icon: HelpCircle },
    { key: 'troubleshooting' as const, label: 'Troubleshooting', icon: Wrench },
    { key: 'account-management' as const, label: 'Account Management', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return <GettingStarted />;
      case 'setup-verification':  
        return <SetupVerification />;
      case 'faq':
        return <FAQ />;
      case 'troubleshooting':
        return <Troubleshooting />;
      case 'account-management':
        return <AccountManagement />;
      case 'overview':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Welcome to LeadGen Pro</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">What is LeadGen Pro?</h3>
                <p className="text-blue-800">
                  LeadGen Pro is an intelligent LinkedIn outreach automation platform that helps you find, connect with, and nurture high-quality prospects at scale. Our platform combines powerful prospect discovery, personalized messaging, and comprehensive analytics to turn your LinkedIn presence into a lead generation machine.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Automated LinkedIn connection requests</li>
                      <li>• Personalized follow-up sequences</li>
                      <li>• Advanced prospect discovery and filtering</li>
                      <li>• Calendar integration for seamless booking</li>
                      <li>• Real-time analytics and performance tracking</li>
                      <li>• Message template library with variables</li>
                      <li>• Campaign management and optimization</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Save 10+ hours per week on outreach</li>
                      <li>• Increase connection rates by 300%</li>
                      <li>• Generate 5-15 qualified leads monthly</li>
                      <li>• Maintain consistent brand messaging</li>
                      <li>• Track ROI with detailed analytics</li>
                      <li>• Scale outreach without scaling effort</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-800 mb-2">Quick Start Recommendation</h4>
                <p className="text-sm text-yellow-700">
                  New to the platform? Start with our <Button variant="link" className="p-0 h-auto text-yellow-700 underline" onClick={() => setActiveSection('getting-started')}>5-minute Getting Started guide</Button> to launch your first campaign today!
                </p>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="dashboard-overview">
                <AccordionTrigger>Understanding Your Dashboard</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">Your dashboard provides a real-time overview of your outreach performance and activity.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Metrics Section:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Total Prospects:</strong> Number of prospects in your database</li>
                        <li><strong>Active Campaigns:</strong> Currently running outreach campaigns</li>
                        <li><strong>Connection Rate:</strong> Percentage of sent requests that were accepted</li>
                        <li><strong>Response Rate:</strong> Percentage of connections who replied to your messages</li>
                        <li><strong>Meetings Booked:</strong> Total appointments scheduled through your campaigns</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Activity Timeline:</h4>
                      <p>View recent campaign activities, new connections, responses, and system notifications in chronological order.</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Quick Actions:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Add new prospects</li>
                        <li>Create new campaigns</li>
                        <li>View pending messages</li>
                        <li>Access recent conversations</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case 'prospects':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Managing Prospects</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="adding-prospects">
                <AccordionTrigger>Adding Prospects</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Manual Entry:</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Click "Add Prospect" button</li>
                        <li>Fill in required fields (Name, LinkedIn URL, Company)</li>
                        <li>Add optional information (Job Title, Industry, Notes)</li>
                        <li>Save to add to your prospect database</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">CSV Upload:</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Prepare CSV with columns: Name, LinkedIn URL, Company, Job Title</li>
                        <li>Go to Prospects → Import → Upload CSV</li>
                        <li>Map your CSV columns to our fields</li>
                        <li>Review and confirm import</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">LinkedIn Chrome Extension:</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Install our Chrome extension</li>
                        <li>Visit LinkedIn profiles or search results</li>
                        <li>Click the LeadGen Pro extension icon</li>
                        <li>Select prospects to import automatically</li>
                      </ol>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="prospect-statuses">
                <AccordionTrigger>Understanding Prospect Statuses</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                      <span><strong>New:</strong> Recently added, not yet contacted</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                      <span><strong>Contacted:</strong> Connection request sent</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                      <span><strong>Connected:</strong> Accepted your connection request</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                      <span><strong>In Sequence:</strong> Receiving follow-up messages</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                      <span><strong>Responded:</strong> Replied to your message</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                      <span><strong>Not Interested:</strong> Declined or asked to stop</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case 'templates':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Message Templates</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="template-variables">
                <AccordionTrigger>Using Template Variables</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Variables automatically personalize your messages with prospect information:</p>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-medium mb-2">Available Variables:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><code>{{firstName}}</code> - Prospect's first name</div>
                        <div><code>{{lastName}}</code> - Prospect's last name</div>
                        <div><code>{{fullName}}</code> - Complete name</div>
                        <div><code>{{company}}</code> - Company name</div>
                        <div><code>{{jobTitle}}</code> - Job title</div>
                        <div><code>{{industry}}</code> - Industry</div>
                        <div><code>{{location}}</code> - Location</div>
                        <div><code>{{customField1}}</code> - Custom field 1</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-medium mb-2">Example Template:</h4>
                      <p className="text-sm italic">
                        "Hi {{firstName}}, I noticed you work at {{company}} as a {{jobTitle}}. 
                        I help companies in {{industry}} increase their sales efficiency. 
                        Would you be open to a brief conversation?"
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="template-types">
                <AccordionTrigger>Template Types & Best Practices</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Connection Request Templates:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Keep under 280 characters (LinkedIn limit)</li>
                        <li>Mention a common connection or shared interest</li>
                        <li>Be specific about why you want to connect</li>
                        <li>Avoid salesy language</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Follow-up Message Templates:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Thank them for connecting</li>
                        <li>Provide value or insight first</li>
                        <li>Make a soft ask or suggestion</li>
                        <li>Keep it conversational and human</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Meeting Request Templates:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Reference previous conversation</li>
                        <li>Be specific about meeting purpose and duration</li>
                        <li>Offer 2-3 time options</li>
                        <li>Include calendar link if available</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case 'campaigns':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Campaign Management</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="creating-campaigns">
                <AccordionTrigger>Creating Effective Campaigns</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Campaign Setup Steps:</h4>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li><strong>Define Target Audience:</strong> Select prospects based on criteria like industry, job title, company size</li>
                        <li><strong>Choose Message Sequence:</strong> Select connection request template and follow-up messages</li>
                        <li><strong>Set Timing:</strong> Configure delays between messages and daily sending limits</li>
                        <li><strong>Launch & Monitor:</strong> Start campaign and track performance metrics</li>
                      </ol>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                      <h4 className="font-medium text-yellow-800 mb-2">Best Practices:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-700">
                        <li>Start with 10-15 daily connection requests for new accounts</li>
                        <li>Wait 3-5 days between connection and first follow-up</li>
                        <li>Test different message templates with A/B campaigns</li>
                        <li>Monitor LinkedIn for any account restrictions</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="campaign-statuses">
                <AccordionTrigger>Understanding Campaign Statuses</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                      <span><strong>Active:</strong> Campaign is running and sending messages</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                      <span><strong>Paused:</strong> Temporarily stopped, can be resumed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                      <span><strong>Draft:</strong> Created but not yet launched</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                      <span><strong>Completed:</strong> All prospects processed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                      <span><strong>Error:</strong> Issue detected, needs attention</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case 'calendar':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Calendar Integration</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="calendar-setup">
                <AccordionTrigger>Setting Up Calendar Integration</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Supported Platforms:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Calendly</li>
                        <li>Google Calendar</li>
                        <li>Microsoft Outlook</li>
                        <li>Zoom Scheduler</li>
                        <li>Custom booking links</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Integration Steps:</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Go to Settings → Integrations → Calendar</li>
                        <li>Select your calendar platform</li>
                        <li>Authorize connection</li>
                        <li>Configure meeting types and availability</li>
                        <li>Test booking link functionality</li>
                      </ol>
                    </div>

                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-medium text-green-800 mb-2">Pro Tip:</h4>
                      <p className="text-sm text-green-700">
                        Include your booking link in message templates using the variable <code>{{bookingLink}}</code> to streamline the meeting scheduling process.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case 'analytics':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Analytics & Reporting</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="key-metrics">
                <AccordionTrigger>Key Performance Indicators</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Connection Metrics:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Connection Rate:</strong> Accepted requests ÷ Total requests sent</li>
                        <li><strong>Response Rate:</strong> Prospects who replied ÷ Total connections</li>
                        <li><strong>Meeting Rate:</strong> Meetings booked ÷ Total responses</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Industry Benchmarks:</h4>
                      <div className="bg-blue-50 p-3 rounded text-sm">
                        <ul className="space-y-1">
                          <li>• <strong>Good Connection Rate:</strong> 20-30%</li>
                          <li>• <strong>Good Response Rate:</strong> 10-15%</li>
                          <li>• <strong>Good Meeting Rate:</strong> 15-25%</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Optimization Tips:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>A/B test different message templates</li>
                        <li>Refine targeting criteria</li>
                        <li>Adjust message timing and frequency</li>
                        <li>Personalize messages more effectively</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Settings & Configuration</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="profile-settings">
                <AccordionTrigger>Profile & Account Settings</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Basic Information:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Update your name and email address</li>
                        <li>Set your company information</li>
                        <li>Configure timezone for scheduling</li>
                        <li>Upload profile photo</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">LinkedIn Safety Settings:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Daily connection request limits (recommended: 20-50)</li>
                        <li>Message sending delays (recommended: 2-5 minutes)</li>
                        <li>Working hours restrictions</li>
                        <li>Weekend activity settings</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
                      <h4 className="font-medium text-red-800 mb-2">Important:</h4>
                      <p className="text-sm text-red-700">
                        Always respect LinkedIn's terms of service and daily limits to avoid account restrictions.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="automation-settings">
                <AccordionTrigger>Automation & Safety Limits</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Recommended Settings for New Accounts:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Daily connection requests: 15-20</li>
                        <li>Daily messages: 10-15</li>
                        <li>Delay between actions: 3-5 minutes</li>
                        <li>Working hours: 9 AM - 5 PM</li>
                        <li>Weekend activity: Disabled</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Settings for Established Accounts:</h4>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Daily connection requests: 30-50</li>
                        <li>Daily messages: 20-30</li>
                        <li>Delay between actions: 2-3 minutes</li>
                        <li>Extended working hours: 8 AM - 6 PM</li>
                        <li>Light weekend activity: Enabled</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {navigationItems.find(item => item.key === activeSection)?.label}
            </h2>
            <p>This section is under development. Please check back soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Guide</h1>
        <p className="text-gray-600">Everything you need to know about using LeadGen Pro effectively</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navigation</CardTitle>
              <CardDescription>Jump to any section</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-1 p-4">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.key}
                        variant={activeSection === item.key ? "secondary" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => setActiveSection(item.key)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <ScrollArea className="h-[600px]">
                {renderContent()}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
