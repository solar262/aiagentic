
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
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CreateTemplateDialog } from "./CreateTemplateDialog";
import { AITemplateGenerator } from "./AITemplateGenerator";

interface MessageTemplatesProps {
  user?: any;
}

export const MessageTemplates = ({ user }: MessageTemplatesProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");
  const [activeTab, setActiveTab] = useState("ai-generator");
  const { toast } = useToast();

  // Fetch user profile for personalization
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Fetch real message templates from database
  const { data: templates = [], refetch: refetchTemplates } = useQuery({
    queryKey: ['message_templates', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('message_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Group templates by type - simplified approach
  const messageTemplates = {
    all: templates,
    connection: templates.filter(t => t.type === 'connection_request'),
    followUp: templates.filter(t => ['follow_up', 'value_add', 're_engagement'].includes(t.type)),
    nurture: templates.filter(t => t.type === 'booking_request')
  };

  // Set default selected template
  const currentTemplates = messageTemplates[activeCategory as keyof typeof messageTemplates] || [];
  const defaultTemplate = selectedTemplate || currentTemplates[0];

  const handleCopyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.content);
    toast({
      title: "Template Copied!",
      description: "The message template has been copied to your clipboard.",
    });
  };

  const handleSaveTemplate = async () => {
    if (!selectedTemplate || !user?.id) return;
    
    try {
      const { error } = await supabase
        .from('message_templates')
        .update({ content: editedMessage })
        .eq('id', selectedTemplate.id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setIsEditing(false);
      refetchTemplates();
      toast({
        title: "Template Updated",
        description: "Your message template has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save template. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTemplateCreated = () => {
    refetchTemplates();
  };

  const userName = profile?.full_name || user?.user_metadata?.full_name || "Your Name";
  const companyName = profile?.company_name || "Your Company";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Message Templates</h2>
          <p className="text-slate-600">AI-powered templates that convert prospects into conversations</p>
        </div>
        <CreateTemplateDialog 
          user={user} 
          onTemplateCreated={handleTemplateCreated}
          buttonText="Manual Template"
          variant="outline"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-generator" className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Generator</span>
          </TabsTrigger>
          <TabsTrigger value="my-templates" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>My Templates ({templates.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-generator">
          <AITemplateGenerator user={user} onTemplateCreated={handleTemplateCreated} />
        </TabsContent>

        <TabsContent value="my-templates">
          {templates.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Templates Yet</h3>
                <p className="text-slate-600 text-center mb-4">
                  Generate your first AI-powered template or create one manually.
                </p>
                <div className="flex space-x-2">
                  <Button onClick={() => setActiveTab("ai-generator")}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                  <CreateTemplateDialog 
                    user={user} 
                    onTemplateCreated={handleTemplateCreated}
                    buttonText="Create Manually"
                    variant="outline"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Template Categories */}
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Template Library</span>
                  </CardTitle>
                  <CardDescription>Choose from your saved templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeCategory} onValueChange={setActiveCategory} orientation="vertical">
                    <TabsList className="grid w-full grid-rows-4">
                      <TabsTrigger value="all" className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>All ({messageTemplates.all.length})</span>
                      </TabsTrigger>
                      <TabsTrigger value="connection" className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Connection ({messageTemplates.connection.length})</span>
                      </TabsTrigger>
                      <TabsTrigger value="followUp" className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Follow-up ({messageTemplates.followUp.length})</span>
                      </TabsTrigger>
                      <TabsTrigger value="nurture" className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Nurture ({messageTemplates.nurture.length})</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-4 space-y-3">
                      {currentTemplates.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-slate-500 text-sm">No templates in this category</p>
                          <Button 
                            variant="ghost"
                            onClick={() => setActiveTab("ai-generator")}
                            className="mt-2"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate with AI
                          </Button>
                        </div>
                      ) : (
                        currentTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedTemplate?.id === template.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                            onClick={() => {
                              setSelectedTemplate(template);
                              setEditedMessage(template.content);
                              setIsEditing(false);
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-slate-900 text-sm">{template.name}</p>
                              <div className="flex items-center space-x-1">
                                <Badge variant="secondary" className="text-xs">
                                  {template.response_rate ? `${Math.round(template.response_rate * 100)}%` : 'New'}
                                </Badge>
                                {template.variables?.includes('firstName') && (
                                  <Sparkles className="w-3 h-3 text-purple-500" />
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 mb-2 capitalize">{template.type?.replace('_', ' ')}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-500">Used {template.times_used || 0} times</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Template Editor */}
              {defaultTemplate && (
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <Edit3 className="w-5 h-5 text-green-600" />
                            <span>{defaultTemplate.name}</span>
                          </CardTitle>
                          <CardDescription className="capitalize">{defaultTemplate.type?.replace('_', ' ')}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyTemplate(defaultTemplate)}
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
                          value={defaultTemplate.subject || ''}
                          className="mt-1"
                          readOnly={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message Template</Label>
                        <Textarea
                          id="message"
                          value={isEditing ? editedMessage : defaultTemplate.content}
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
                          <p className="text-2xl font-bold text-green-600">
                            {defaultTemplate.response_rate ? `${Math.round(defaultTemplate.response_rate * 100)}%` : 'N/A'}
                          </p>
                          <p className="text-sm text-slate-600">Response Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{defaultTemplate.times_used || 0}</p>
                          <p className="text-sm text-slate-600">Times Used</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">
                            {defaultTemplate.performance_score ? Math.round(defaultTemplate.performance_score * 10) / 10 : 'N/A'}
                          </p>
                          <p className="text-sm text-slate-600">Performance</p>
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
                        Use these variables to personalize your messages automatically. Your signature will be: {userName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-blue-100">Contact Info</h4>
                          <div className="space-y-1 text-sm">
                            <code className="bg-blue-700 px-2 py-1 rounded">{"{{firstName}}"}</code>
                            <code className="bg-blue-700 px-2 py-1 rounded">{"{{lastName}}"}</code>
                            <code className="bg-blue-700 px-2 py-1 rounded">{"{{title}}"}</code>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-blue-100">Company Info</h4>
                          <div className="space-y-1 text-sm">
                            <code className="bg-blue-700 px-2 py-1 rounded">{"{{company}}"}</code>
                            <code className="bg-blue-700 px-2 py-1 rounded">{"{{industry}}"}</code>
                            <code className="bg-blue-700 px-2 py-1 rounded">{"{{location}}"}</code>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-blue-100">Your Info</h4>
                          <div className="space-y-1 text-sm">
                            <code className="bg-blue-700 px-2 py-1 rounded">{"{{yourName}}"}</code>
                            <code className="bg-blue-700 px-2 py-1 rounded">{"{{yourCompany}}"}</code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
