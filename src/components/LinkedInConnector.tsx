
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Linkedin, CheckCircle, AlertCircle, Settings, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkedInConnectorProps {
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
}

export const LinkedInConnector = ({ isConnected, onConnectionChange }: LinkedInConnectorProps) => {
  const [profileUrl, setProfileUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!profileUrl || !apiKey) {
      toast({
        title: "Missing Information",
        description: "Please provide both your LinkedIn profile URL and API key.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      onConnectionChange(true);
      setIsConnecting(false);
      toast({
        title: "LinkedIn Connected Successfully!",
        description: "Your profile is now connected and ready to identify HR prospects.",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    onConnectionChange(false);
    setProfileUrl("");
    setApiKey("");
    toast({
      title: "LinkedIn Disconnected",
      description: "Your LinkedIn profile has been disconnected from the assistant.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Connect Your LinkedIn Profile</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Connect your LinkedIn profile to enable AI-powered prospect identification and automated outreach 
          to HR decision-makers at companies with 100+ employees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connection Form */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5 text-blue-600" />
              <span>LinkedIn Integration</span>
            </CardTitle>
            <CardDescription>
              {isConnected 
                ? "Your LinkedIn profile is successfully connected and active."
                : "Enter your LinkedIn credentials to start identifying HR prospects."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isConnected ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="profile-url">LinkedIn Profile URL</Label>
                  <Input
                    id="profile-url"
                    placeholder="https://linkedin.com/in/your-profile"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">LinkedIn API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your LinkedIn API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Your credentials are encrypted and stored securely. We only use them to identify 
                    HR prospects and send personalized messages on your behalf.
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handleConnect} 
                  disabled={isConnecting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isConnecting ? "Connecting..." : "Connect LinkedIn Profile"}
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Profile Connected</p>
                    <p className="text-sm text-green-700">Dr. Sharon - People & Culture Consultant</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">1,247</p>
                    <p className="text-sm text-slate-600">Connections</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">847</p>
                    <p className="text-sm text-slate-600">HR Prospects</p>
                  </div>
                </div>

                <Button 
                  onClick={handleDisconnect} 
                  variant="outline"
                  className="w-full"
                >
                  Disconnect Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Features & Settings */}
        <div className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-slate-600" />
                <span>AI Assistant Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    feature: "Smart Prospect Identification",
                    description: "AI identifies HR decision-makers at companies with 100+ employees",
                    status: isConnected ? "active" : "inactive"
                  },
                  {
                    feature: "Personalized Outreach",
                    description: "Craft empathetic, value-driven messages aligned with your brand",
                    status: isConnected ? "active" : "inactive"
                  },
                  {
                    feature: "Automated Follow-ups",
                    description: "Nurture relationships with timely, relevant follow-up messages",
                    status: isConnected ? "active" : "inactive"
                  },
                  {
                    feature: "Meeting Booking",
                    description: "Direct integration with Calendly for seamless appointment scheduling",
                    status: isConnected ? "active" : "inactive"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                    <div className="mt-1">
                      {item.status === "active" ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-slate-900">{item.feature}</p>
                        <Badge variant={item.status === "active" ? "default" : "secondary"} className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle>Need Help Setting Up?</CardTitle>
              <CardDescription className="text-blue-100">
                Our team can help you get started with LinkedIn integration and optimize your outreach strategy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Schedule Setup Call
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
