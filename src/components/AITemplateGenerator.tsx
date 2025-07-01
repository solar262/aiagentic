
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Target, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AITemplateGeneratorProps {
  user?: any;
  onTemplateCreated?: () => void;
}

export const AITemplateGenerator = ({ user, onTemplateCreated }: AITemplateGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetIndustry, setTargetIndustry] = useState("");
  const [targetTitle, setTargetTitle] = useState("");
  const [templateType, setTemplateType] = useState("connection_request");
  const { toast } = useToast();

  const quickGenerate = async (preset: { industry: string; title: string; type: string }) => {
    setIsGenerating(true);
    
    try {
      const response = await supabase.functions.invoke('generate-template', {
        body: {
          type: preset.type,
          targetIndustry: preset.industry,
          targetTitle: preset.title,
          personalValue: "helping organizations build people-first cultures through employee retention strategies"
        }
      });

      if (response.error) throw response.error;

      const { templateName, subject, content } = response.data;
      
      // Save the generated template
      const { error } = await supabase
        .from('message_templates')
        .insert({
          user_id: user.id,
          name: templateName,
          type: preset.type as any,
          subject: subject || null,
          content: content,
          variables: extractVariables(content),
        });

      if (error) throw error;

      toast({
        title: "Smart Template Created!",
        description: `Generated "${templateName}" and added to your library.`,
      });

      if (onTemplateCreated) {
        onTemplateCreated();
      }
    } catch (error) {
      console.error("Error generating template:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCustomTemplate = async () => {
    if (!targetIndustry || !targetTitle) {
      toast({
        title: "Missing Information",
        description: "Please specify target industry and job title.",
        variant: "destructive",
      });
      return;
    }

    await quickGenerate({
      industry: targetIndustry,
      title: targetTitle,
      type: templateType
    });
  };

  const extractVariables = (text: string): string[] => {
    const variableRegex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;
    
    while ((match = variableRegex.exec(text)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    
    return variables;
  };

  const popularTargets = [
    { industry: "Technology", title: "HR Director", type: "connection_request", icon: "💻" },
    { industry: "Healthcare", title: "Chief People Officer", type: "connection_request", icon: "🏥" },
    { industry: "Finance", title: "VP of Human Resources", type: "follow_up", icon: "💰" },
    { industry: "Manufacturing", title: "Head of Talent", type: "value_add", icon: "🏭" },
    { industry: "Retail", title: "HR Manager", type: "connection_request", icon: "🛍️" },
    { industry: "Consulting", title: "People Operations Lead", type: "booking_request", icon: "💼" },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <span>AI Template Generator</span>
          </CardTitle>
          <CardDescription>
            Let AI create personalized outreach templates based on your target audience and goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Generate Section */}
          <div>
            <h3 className="font-medium mb-3 flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Popular Targets</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularTargets.map((target, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{target.icon}</span>
                      <Badge variant="secondary" className="text-xs">
                        {target.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm">{target.title}</p>
                    <p className="text-xs text-muted-foreground mb-3">{target.industry}</p>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => quickGenerate(target)}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <Sparkles className="w-3 h-3 mr-1 animate-spin" />
                      ) : (
                        <Wand2 className="w-3 h-3 mr-1" />
                      )}
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Generation */}
          <div className="bg-white/50 p-4 rounded-lg border">
            <h3 className="font-medium mb-3 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>Custom Template</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="custom-industry">Target Industry</Label>
                <Input
                  id="custom-industry"
                  value={targetIndustry}
                  onChange={(e) => setTargetIndustry(e.target.value)}
                  placeholder="e.g., Technology, Healthcare"
                />
              </div>
              <div>
                <Label htmlFor="custom-title">Job Title</Label>
                <Input
                  id="custom-title"
                  value={targetTitle}
                  onChange={(e) => setTargetTitle(e.target.value)}
                  placeholder="e.g., CHRO, HR Director"
                />
              </div>
              <div>
                <Label htmlFor="custom-type">Template Type</Label>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="connection_request">Connection Request</SelectItem>
                    <SelectItem value="follow_up">Follow-up</SelectItem>
                    <SelectItem value="value_add">Value Add</SelectItem>
                    <SelectItem value="re_engagement">Re-engagement</SelectItem>
                    <SelectItem value="booking_request">Booking Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={generateCustomTemplate}
              disabled={isGenerating || !targetIndustry || !targetTitle}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating Custom Template...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Custom Template
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
