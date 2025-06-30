
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useConversationAnalyzer } from "./ConversationAnalyzer";
import { Bot, Send, User } from "lucide-react";

interface ProspectInteractionDemoProps {
  user: any;
}

export const ProspectInteractionDemo = ({ user }: ProspectInteractionDemoProps) => {
  const [demoResponse, setDemoResponse] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [demoResults, setDemoResults] = useState<any>(null);
  const { toast } = useToast();
  const analyzer = useConversationAnalyzer(user.id);

  const demoProspectId = "demo-prospect-id"; // In real app, this would be a real prospect ID

  const runDemo = async () => {
    if (!demoResponse.trim()) {
      toast({
        title: "Error",
        description: "Please enter a demo prospect response.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    try {
      // Create a demo prospect for analysis
      await createDemoProspect();
      
      // Analyze the response
      const analysis = await analyzer.analyzeResponse(demoProspectId, demoResponse);
      setDemoResults(analysis);

      toast({
        title: "Analysis Complete",
        description: `AI detected ${analysis.bookingIntent ? 'booking intent' : 'no booking intent'} with ${Math.round(analysis.confidenceScore * 100)}% confidence.`,
      });

    } catch (error) {
      console.error('Demo error:', error);
      toast({
        title: "Demo Error",
        description: "Failed to run booking agent demo.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const createDemoProspect = async () => {
    // Check if demo prospect exists
    const { data: existing } = await supabase
      .from('prospects')
      .select('id')
      .eq('id', demoProspectId)
      .single();

    if (!existing) {
      // Create demo company first
      const { data: company } = await supabase
        .from('companies')
        .insert({
          name: 'Demo Tech Corp',
          employee_count_min: 150,
          employee_count_max: 500,
          industry: 'Technology'
        })
        .select()
        .single();

      // Create demo prospect
      await supabase
        .from('prospects')
        .insert({
          id: demoProspectId,
          user_id: user.id,
          first_name: 'Sarah',
          last_name: 'Johnson',
          title: 'Director of Human Resources',
          company_id: company?.id,
          email: 'sarah@demotechcorp.com',
          status: 'connected'
        });
    }
  };

  const demoResponses = [
    "Hi Michelle, thanks for connecting! I'm always interested in learning about new approaches to employee retention.",
    "Yes, I'd love to schedule a call to discuss this further. When are you available?",
    "That sounds great! I'm definitely interested in a consultation. What's your availability this week?",
    "Thanks for the information. I'm not really looking for anything right now, but I'll keep you in mind.",
    "Tell me more about your approach to building company culture. I'm curious to learn more."
  ];

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <span>AI Booking Agent Demo</span>
        </CardTitle>
        <CardDescription>
          Test how the AI agent analyzes prospect responses and detects booking intent.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Demo Responses */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Try these sample responses:</label>
          <div className="flex flex-wrap gap-2">
            {demoResponses.map((response, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setDemoResponse(response)}
                className="text-xs"
              >
                Sample {index + 1}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Response Input */}
        <div className="space-y-2">
          <label htmlFor="demo-response" className="text-sm font-medium text-slate-700">
            Prospect Response:
          </label>
          <Textarea
            id="demo-response"
            value={demoResponse}
            onChange={(e) => setDemoResponse(e.target.value)}
            placeholder="Enter what a prospect might respond to your LinkedIn message..."
            rows={3}
          />
        </div>

        <Button onClick={runDemo} disabled={analyzing} className="w-full">
          <Send className="w-4 h-4 mr-2" />
          {analyzing ? "Analyzing..." : "Run AI Analysis"}
        </Button>

        {/* Results */}
        {demoResults && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-slate-900">AI Analysis Results:</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Booking Intent:</span>
                  <Badge variant={demoResults.bookingIntent ? "default" : "secondary"}>
                    {demoResults.bookingIntent ? "Detected" : "Not Detected"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Confidence Score:</span>
                  <Badge variant="outline">
                    {Math.round(demoResults.confidenceScore * 100)}%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Next Stage:</span>
                  <Badge variant="outline">
                    {demoResults.nextStage.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">AI Suggested Response:</label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Bot className="w-4 h-4 text-blue-600 mt-0.5" />
                  <p className="text-sm text-slate-700">{demoResults.suggestedResponse}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
