
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Edit3, 
  Copy, 
  Heart, 
  Users, 
  TrendingUp,
  Calendar,
  BookOpen,
  Play,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const messageTemplates = {
  connection: [
    {
      id: 1,
      name: "Warm Introduction",
      category: "Connection Request",
      subject: "Building people-first cultures together",
      message: `Hi {{firstName}},

I noticed your work in People & Culture at {{company}} and was impressed by {{company}}'s commitment to employee wellbeing. 

As someone who's passionate about creating people-first workplaces, I'd love to connect and share insights on employee retention and inclusive leadership strategies that have helped similar organizations thrive.

Would you be open to connecting?

Best regards,
Dr. Sharon`,
      useCount: 47,
      responseRate: "73%",
      tags: ["warm", "people-first", "connection"]
    },
    {
      id: 2,
      name: "Industry-Specific Approach",
      category: "Connection Request",
      subject: "{{industry}} HR leadership insights",
      message: `Hello {{firstName}},

I've been following the evolution of HR practices in {{industry}} and noticed {{company}}'s innovative approach to talent management.

I specialize in helping {{industry}} leaders build resilient, inclusive cultures that drive both employee satisfaction and business results. I'd love to connect and potentially share some insights that might be valuable for your team.

Looking forward to connecting!

Dr. Sharon`,
      useCount: 32,
      responseRate: "68%",
      tags: ["industry-specific", "tailored", "insights"]
    }
  ],
  followUp: [
    {
      id: 3,
      name: "Value-First Follow-up",
      category: "Follow-up",
      subject: "Thought you'd find this interesting - {{topicRelevant}}",
      message: `Hi {{firstName}},

Thank you for connecting! I came across this insight about {{topicRelevant}} and thought it might resonate with the challenges {{company}} is navigating in today's talent landscape.

{{valueContent}}

I'd love to hear your thoughts on this. Are you seeing similar trends in your organization?

If you're interested in exploring how other {{industry}} companies are addressing these challenges, I'd be happy to share some case studies.

Best,
Dr. Sharon`,
      useCount: 28,
      responseRate: "45%",
      tags: ["value-driven", "educational", "engaging"]
    },
    {
      id: 4,
      name: "Meeting Request",
      category: "Follow-up",
      subject: "Quick chat about {{company}}'s people strategy?",
      message: `Hi {{firstName}},

I hope you're doing well! Our conversation about {{previousTopic}} really got me thinking about the unique opportunities {{company}} has in building an even stronger people-first culture.

I'd love to share some strategies I've developed specifically for {{industry}} companies around:
• Employee retention in competitive markets
• Building inclusive leadership capabilities  
• Creating cultures that attract top talent

Would you be open to a 15-minute conversation next week? I can share some insights that might be immediately applicable to {{company}}.

Here's my calendar link: [Calendar Link]

Looking forward to connecting!
Dr. Sharon`,
      useCount: 19,
      responseRate: "67%",
      tags: ["meeting-request", "specific-value", "calendar"]
    }
  ],
  nurture: [
    {
      id: 5,
      name: "Educational Content Share",
      category: "Nurture",
      subject: "New insights on {{relevantTopic}}",
      message: `Hi {{firstName}},

I just published some new research on {{relevantTopic}} that I thought might be valuable for {{company}}'s people strategy.

{{contentSummary}}

The key finding that might interest you: {{keyInsight}}

You can read the full article here: {{articleLink}}

I'd love to hear if this aligns with what you're seeing at {{company}}!

Best,
Dr. Sharon`,
      useCount: 15,
      responseRate: "34%",
      tags: ["educational", "research", "thought-leadership"]
    }
  ]
};

export const MessageTemplates = () => {
  const [activeCategory, setActiveCategory] = useState("connection");
  const [selectedTemplate, setSelectedTemplate] = useState(messageTemplates.connection[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(selectedTemplate.message);
  const { toast } = useToast();

  const handleCopyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.message);
    toast({
      title: "Template Copied!",
      description: "The message template has been copied to your clipboard.",
    });
  };

  const handleSaveTemplate = () => {
    setIsEditing(false);
    toast({
      title: "Template Updated",
      description: "Your message template has been saved successfully.",
    });
  };

  const allTemplates = [
    ...messageTemplates.connection,
    ...messageTemplates.followUp,
    ...messageTemplates.nurture
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Message Templates</h2>
          <p className="text-slate-600">Create and manage your outreach message templates</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Template</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Categories */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Template Library</span>
            </CardTitle>
            <CardDescription>Choose from pre-built, proven templates</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeCategory} onValueChange={setActiveCategory} orientation="vertical">
              <TabsList className="grid w-full grid-rows-3">
                <TabsTrigger value="connection" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Connection</span>
                </TabsTrigger>
                <TabsTrigger value="followUp" className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Follow-up</span>
                </TabsTrigger>
                <TabsTrigger value="nurture" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Nurture</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-4 space-y-3">
                {messageTemplates[activeCategory as keyof typeof messageTemplates].map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTemplate.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setEditedMessage(template.message);
                      setIsEditing(false);
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-slate-900 text-sm">{template.name}</p>
                      <Badge variant="secondary" className="text-xs">{template.responseRate}</Badge>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">{template.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Used {template.useCount} times</span>
                      <div className="flex space-x-1">
                        {template.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Template Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Edit3 className="w-5 h-5 text-green-600" />
                    <span>{selectedTemplate.name}</span>
                  </CardTitle>
                  <CardDescription>{selectedTemplate.category}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyTemplate(selectedTemplate)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={selectedTemplate.subject}
                  className="mt-1"
                  readOnly={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message Template</Label>
                <Textarea
                  id="message"
                  value={isEditing ? editedMessage : selectedTemplate.message}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  className="mt-1 min-h-[300px] font-mono text-sm"
                  readOnly={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="flex space-x-2">
                  <Button onClick={handleSaveTemplate}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedTemplate.responseRate}</p>
                  <p className="text-sm text-slate-600">Response Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedTemplate.useCount}</p>
                  <p className="text-sm text-slate-600">Times Used</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">4.8</p>
                  <p className="text-sm text-slate-600">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Variables */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Template Variables</span>
              </CardTitle>
              <CardDescription className="text-blue-100">
                Use these variables to personalize your messages automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-100">Contact Info</h4>
                  <div className="space-y-1 text-sm">
                    <code className="bg-blue-700 px-2 py-1 rounded">{'{{firstName}}'}</code>
                    <code className="bg-blue-700 px-2 py-1 rounded">{'{{lastName}}'}</code>
                    <code className="bg-blue-700 px-2 py-1 rounded">{'{{title}}'}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-100">Company Info</h4>
                  <div className="space-y-1 text-sm">
                    <code className="bg-blue-700 px-2 py-1 rounded">{'{{company}}'}</code>
                    <code className="bg-blue-700 px-2 py-1 rounded">{'{{industry}}'}</code>
                    <code className="bg-blue-700 px-2 py-1 rounded">{'{{location}}'}</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
