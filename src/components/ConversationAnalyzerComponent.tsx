
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useConversationAnalyzer } from "./ConversationAnalyzer";
import { useToast } from "@/hooks/use-toast";
import { Bot, Send, MessageSquare } from "lucide-react";

interface ConversationAnalyzerComponentProps {
  user: any;
}

export const ConversationAnalyzerComponent = ({ user }: ConversationAnalyzerComponentProps) => {
  const [inputText, setInputText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();
  const analyzer = useConversationAnalyzer(user.id);

  const analyzeText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    try {
      const demoProspectId = "demo-prospect-analyzer";
      const analysis = await analyzer.analyzeResponse(demoProspectId, inputText);
      setResults(analysis);

      toast({
        title: "Analysis Complete",
        description: `Booking intent ${analysis.bookingIntent ? 'detected' : 'not detected'} with ${Math.round(analysis.confidenceScore * 100)}% confidence.`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the conversation.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>AI Conversation Analyzer</span>
          </CardTitle>
          <CardDescription>
            Analyze prospect responses to detect booking intent and generate appropriate responses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="analysis-text" className="text-sm font-medium text-slate-700">
              Prospect Response to Analyze:
            </label>
            <Textarea
              id="analysis-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter a prospect's response to analyze for booking intent..."
              rows={4}
            />
          </div>

          <Button onClick={analyzeText} disabled={analyzing} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            {analyzing ? "Analyzing..." : "Analyze Response"}
          </Button>

          {results && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium text-slate-900">Analysis Results:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Booking Intent</p>
                  <Badge variant={results.bookingIntent ? "default" : "secondary"}>
                    {results.bookingIntent ? "Detected" : "Not Detected"}
                  </Badge>
                </div>
                
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Confidence Score</p>
                  <Badge variant="outline">
                    {Math.round(results.confidenceScore * 100)}%
                  </Badge>
                </div>
                
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Next Stage</p>
                  <Badge variant="outline">
                    {results.nextStage.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">AI Suggested Response:</label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Bot className="w-4 h-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-slate-700">{results.suggestedResponse}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
