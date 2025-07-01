
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useConversationAnalyzer } from "./ConversationAnalyzer";
import { Bot, Send, User, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProspectInteractionDemoProps {
  user: any;
}

export const ProspectInteractionDemo = ({ user }: ProspectInteractionDemoProps) => {
  const [testResponse, setTestResponse] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [selectedProspectId, setSelectedProspectId] = useState<string>("");
  const { toast } = useToast();
  const analyzer = useConversationAnalyzer(user.id);

  // Fetch real prospects
  const { data: prospects } = useQuery({
    queryKey: ['prospects', user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prospects')
        .select(`
          *,
          companies (name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const testAnalysis = async () => {
    if (!testResponse.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response to analyze.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedProspectId) {
      toast({
        title: "Error",
        description: "Please select a prospect first.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    try {
      const analysis = await analyzer.analyzeResponse(selectedProspectId, testResponse);
      setAnalysisResults(analysis);

      toast({
        title: "Analysis Complete",
        description: `AI detected ${analysis.bookingIntent ? 'booking intent' : 'no booking intent'} with ${Math.round(analysis.confidenceScore * 100)}% confidence.`,
      });

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze the response.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAddProspect = () => {
    toast({
      title: "Navigate to Prospect Discovery",
      description: "Go to the Prospect Discovery section to add prospects to your pipeline.",
    });
  };

  if (!prospects || prospects.length === 0) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>Prospect Interaction Testing</span>
          </CardTitle>
          <CardDescription>
            No prospects found. Add some prospects to your pipeline first to test AI analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-600 mb-4">Start by adding prospects to your pipeline</p>
            <Button onClick={handleAddProspect}>
              <Plus className="w-4 h-4 mr-2" />
              Add Prospect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <span>AI Response Analysis</span>
        </CardTitle>
        <CardDescription>
          Test how the AI analyzes real prospect responses and detects booking intent.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prospect Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Select Prospect:</label>
          <select 
            value={selectedProspectId}
            onChange={(e) => setSelectedProspectId(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md bg-white"
          >
            <option value="">Choose a prospect...</option>
            {prospects.map(prospect => (
              <option key={prospect.id} value={prospect.id}>
                {prospect.first_name} {prospect.last_name} - {prospect.companies?.name || 'No Company'}
              </option>
            ))}
          </select>
        </div>

        {/* Response Input */}
        <div className="space-y-2">
          <label htmlFor="test-response" className="text-sm font-medium text-slate-700">
            Prospect Response to Analyze:
          </label>
          <Textarea
            id="test-response"
            value={testResponse}
            onChange={(e) => setTestResponse(e.target.value)}
            placeholder="Enter what the prospect might respond to your outreach..."
            rows={4}
          />
        </div>

        <Button 
          onClick={testAnalysis} 
          disabled={analyzing || !selectedProspectId} 
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          {analyzing ? "Analyzing..." : "Analyze Response"}
        </Button>

        {/* Analysis Results */}
        {analysisResults && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-slate-900">AI Analysis Results:</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Booking Intent:</span>
                  <Badge variant={analysisResults.bookingIntent ? "default" : "secondary"}>
                    {analysisResults.bookingIntent ? "Detected" : "Not Detected"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Confidence Score:</span>
                  <Badge variant="outline">
                    {Math.round(analysisResults.confidenceScore * 100)}%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Next Stage:</span>
                  <Badge variant="outline">
                    {analysisResults.nextStage.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">AI Suggested Response:</label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Bot className="w-4 h-4 text-blue-600 mt-0.5" />
                  <p className="text-sm text-slate-700">{analysisResults.suggestedResponse}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
