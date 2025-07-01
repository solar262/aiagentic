
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Sparkles, Wand2 } from "lucide-react";

interface CreateTemplateDialogProps {
  user?: any;
  onTemplateCreated?: () => void;
  buttonText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

type TemplateType = "connection_request" | "follow_up" | "value_add" | "re_engagement" | "booking_request";

export const CreateTemplateDialog = ({ user, onTemplateCreated, buttonText = "Create Template", variant = "default" }: CreateTemplateDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<TemplateType>("connection_request");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetIndustry, setTargetIndustry] = useState("");
  const [targetTitle, setTargetTitle] = useState("");
  const [personalValue, setPersonalValue] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create templates.",
        variant: "destructive",
      });
      return;
    }

    if (!name.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('message_templates')
        .insert({
          user_id: user.id,
          name: name.trim(),
          type,
          subject: subject.trim() || null,
          content: content.trim(),
          variables: extractVariables(content),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template created successfully!",
      });

      // Reset form
      setName("");
      setType("connection_request");
      setSubject("");
      setContent("");
      setTargetIndustry("");
      setTargetTitle("");
      setPersonalValue("");
      setOpen(false);
      
      // Notify parent component
      if (onTemplateCreated) {
        onTemplateCreated();
      }
    } catch (error) {
      console.error("Error creating template:", error);
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAITemplate = async () => {
    if (!targetIndustry || !targetTitle) {
      toast({
        title: "Missing Information",
        description: "Please specify target industry and job title for AI generation.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await supabase.functions.invoke('generate-template', {
        body: {
          type,
          targetIndustry,
          targetTitle,
          personalValue: personalValue || "helping organizations build people-first cultures through employee retention strategies"
        }
      });

      if (response.error) throw response.error;

      const { templateName, subject: generatedSubject, content: generatedContent } = response.data;
      
      setName(templateName);
      setSubject(generatedSubject);
      setContent(generatedContent);
      
      toast({
        title: "Template Generated!",
        description: "AI has created a personalized template for you. Review and customize as needed.",
      });
    } catch (error) {
      console.error("Error generating template:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate template. Please try again or create manually.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById('template-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      const newText = before + `{{${variable}}}` + after;
      setContent(newText);
      
      // Set cursor position after the inserted variable
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length + 4, start + variable.length + 4);
      }, 0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>{buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>Create New Template</span>
          </DialogTitle>
          <DialogDescription>
            Let AI create a personalized message template for your outreach campaigns, or create one manually.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Generation Panel */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-purple-600" />
              <span>AI Template Generator</span>
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="target-industry">Target Industry *</Label>
                <Input
                  id="target-industry"
                  value={targetIndustry}
                  onChange={(e) => setTargetIndustry(e.target.value)}
                  placeholder="e.g., Technology, Healthcare, Finance"
                />
              </div>
              <div>
                <Label htmlFor="target-title">Target Job Title *</Label>
                <Input
                  id="target-title"
                  value={targetTitle}
                  onChange={(e) => setTargetTitle(e.target.value)}
                  placeholder="e.g., HR Director, VP of People, CHRO"
                />
              </div>
              <div>
                <Label htmlFor="template-type-ai">Template Type</Label>
                <Select value={type} onValueChange={(value) => setType(value as TemplateType)}>
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
              <div>
                <Label htmlFor="personal-value">Your Value Proposition (Optional)</Label>
                <Textarea
                  id="personal-value"
                  value={personalValue}
                  onChange={(e) => setPersonalValue(e.target.value)}
                  placeholder="What unique value do you bring? e.g., 15+ years in HR transformation, helped 50+ companies reduce turnover by 40%"
                  className="min-h-[80px]"
                />
              </div>
              <Button 
                onClick={generateAITemplate}
                disabled={isGenerating || !targetIndustry || !targetTitle}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate AI Template
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Manual Creation Panel */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Template Details</h3>
            
            <div>
              <Label htmlFor="template-name">Template Name *</Label>
              <Input
                id="template-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., HR Director Connection Request"
                required
              />
            </div>

            <div>
              <Label htmlFor="template-subject">Subject Line</Label>
              <Input
                id="template-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject line for your message"
              />
            </div>

            <div>
              <Label htmlFor="template-content">Message Content *</Label>
              <Textarea
                id="template-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Hi {{firstName}},&#10;&#10;I noticed you're working at {{company}} and..."
                className="min-h-[200px] font-mono text-sm"
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Quick Variables</h4>
              <div className="flex flex-wrap gap-2">
                {['firstName', 'lastName', 'company', 'title', 'industry', 'location', 'yourName', 'yourCompany'].map((variable) => (
                  <Button
                    key={variable}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable(variable)}
                    className="text-xs"
                  >
                    {`{{${variable}}}`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Template"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
