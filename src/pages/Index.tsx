
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  // Generate a proper UUID for demo user
  const demoUserId = uuidv4();
  
  // Mock user object for the dashboard with proper UUID
  const mockUser = {
    id: demoUserId,
    email: "demo@example.com",
    user_metadata: {
      full_name: "Demo User"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Business Automation Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the right tool for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* LinkedIn HR Outreach Tool */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Users className="w-6 h-6 text-blue-600" />
                <span>LinkedIn HR Outreach</span>
              </CardTitle>
              <CardDescription className="text-base">
                AI-powered LinkedIn prospecting and outreach for HR professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">LinkedIn Integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">AI Prospect Discovery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Campaign Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Booking Automation</span>
                </div>
                <Button className="w-full mt-6" size="lg">
                  <Users className="w-4 h-4 mr-2" />
                  Launch HR Tool
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Corporate Coaching Tool */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Building2 className="w-6 h-6 text-green-600" />
                <span>Corporate Coaching Sales</span>
              </CardTitle>
              <CardDescription className="text-base">
                AI automation for booking corporate coaching consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">UK Corporate Database</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Multi-Channel Outreach</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Coaching Service Sales</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Consultation Booking</span>
                </div>
                <Link to="/coaching-tool">
                  <Button className="w-full mt-6" size="lg" variant="outline">
                    <Building2 className="w-4 h-4 mr-2" />
                    Launch Coaching Tool
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* HR Tool Dashboard Below */}
        <div className="border-t-2 border-gray-200 pt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              HR Outreach Tool Demo
            </h2>
            <p className="text-gray-600">
              Live preview of the LinkedIn HR prospecting tool
            </p>
          </div>
          <Dashboard user={mockUser} />
        </div>
      </div>
    </div>
  );
};

export default Index;
