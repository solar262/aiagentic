
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Chrome, Download, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExtensionAuthProps {
  user?: any;
}

export const ExtensionAuth = ({ user }: ExtensionAuthProps) => {
  const [extensionConnected, setExtensionConnected] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Generate auth token for extension
    if (user?.id) {
      const token = btoa(`${user.id}:${Date.now()}`);
      setAuthToken(token);
    }
  }, [user]);

  const handleConnectExtension = () => {
    if (!authToken) return;

    // Store token in localStorage for extension to access
    localStorage.setItem('tpp_extension_token', authToken);
    localStorage.setItem('tpp_user_id', user?.id);

    // Simulate extension connection
    setTimeout(() => {
      setExtensionConnected(true);
      toast({
        title: "Extension Connected!",
        description: "Your Chrome extension is now connected to your account.",
      });
    }, 1000);
  };

  const downloadExtension = () => {
    // In production, this would be the Chrome Web Store URL
    toast({
      title: "Extension Download",
      description: "Extension will be available on Chrome Web Store once approved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Chrome Extension Setup</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Install our Chrome extension to automate LinkedIn prospecting directly from LinkedIn pages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Extension Status */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Chrome className="w-5 h-5 text-blue-600" />
              <span>Extension Status</span>
            </CardTitle>
            <CardDescription>
              Connect your Chrome extension to start automating LinkedIn workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!extensionConnected ? (
              <>
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                  <Settings className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-900">Extension Not Connected</p>
                    <p className="text-sm text-yellow-700">Install and connect the extension to get started</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={downloadExtension} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Chrome Extension
                  </Button>
                  
                  <Button 
                    onClick={handleConnectExtension} 
                    variant="outline" 
                    className="w-full"
                    disabled={!user?.id}
                  >
                    Connect Extension to Account
                  </Button>
                </div>

                {authToken && (
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Your Connection Token:</p>
                    <code className="text-xs bg-white p-2 rounded border block">
                      {authToken}
                    </code>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Extension Connected</p>
                    <p className="text-sm text-green-700">Ready to automate LinkedIn prospecting</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">0</p>
                    <p className="text-sm text-slate-600">Profiles Analyzed</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">0</p>
                    <p className="text-sm text-slate-600">Messages Generated</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Extension Features */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>Extension Features</CardTitle>
            <CardDescription>
              What you can do with the Chrome extension installed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  feature: "Profile Analysis",
                  description: "Instantly analyze LinkedIn profiles for HR decision-makers",
                  available: true
                },
                {
                  feature: "AI Message Generation",
                  description: "Generate personalized messages based on profile data",
                  available: true
                },
                {
                  feature: "Lead Scoring",
                  description: "Automatic lead scoring based on profile relevance",
                  available: true
                },
                {
                  feature: "Pipeline Integration",
                  description: "Add prospects directly to your pipeline from LinkedIn",
                  available: true
                },
                {
                  feature: "Automated Outreach",
                  description: "Send connection requests and messages automatically",
                  available: false
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                  <div className="mt-1">
                    <CheckCircle className={`w-4 h-4 ${item.available ? 'text-green-600' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-slate-900">{item.feature}</p>
                      <Badge variant={item.available ? "default" : "secondary"} className="text-xs">
                        {item.available ? "Available" : "Coming Soon"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Installation Instructions */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
        <CardHeader>
          <CardTitle>Installation Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Download Extension</h4>
              <p className="text-sm text-slate-600">Download the Chrome extension file from the link above</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Install in Chrome</h4>
              <p className="text-sm text-slate-600">Go to chrome://extensions and load the unpacked extension</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Connect Account</h4>
              <p className="text-sm text-slate-600">Click "Connect Extension" above to link your account</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
