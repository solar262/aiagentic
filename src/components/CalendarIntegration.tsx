
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Settings, 
  CheckCircle,
  AlertCircle,
  Link,
  User,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const upcomingMeetings = [
  {
    id: 1,
    name: "Emma Thompson",
    title: "Talent Manager",
    company: "Financial Focus Ltd",
    date: "2024-01-20",
    time: "14:00",
    type: "Discovery Call",
    duration: "30 min",
    status: "confirmed",
    meetingLink: "https://calendly.com/dr-sharon/discovery-emma"
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    title: "HR Director",
    company: "TechFlow Solutions",
    date: "2024-01-22",
    time: "10:30",
    type: "Strategy Discussion",
    duration: "45 min",
    status: "confirmed",
    meetingLink: "https://calendly.com/dr-sharon/strategy-sarah"
  },
  {
    id: 3,
    name: "James Rodriguez",
    title: "People & Culture Lead",
    company: "GreenTech Innovations",
    date: "2024-01-23",
    time: "15:00",
    type: "Consultation",
    duration: "60 min",
    status: "pending",
    meetingLink: "https://calendly.com/dr-sharon/consultation-james"
  }
];

export const CalendarIntegration = () => {
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/dr-sharon/discovery-call");
  const [isConnected, setIsConnected] = useState(true);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({
    discovery: "30 min",
    strategy: "45 min",
    consultation: "60 min"
  });
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Calendar Settings Saved",
      description: "Your calendar integration settings have been updated successfully.",
    });
  };

  const handleTestIntegration = () => {
    toast({
      title: "Integration Test Successful",
      description: "Your Calendly integration is working properly.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Calendar Integration</h2>
          <p className="text-slate-600">Manage your meeting scheduling and calendar settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{isConnected ? "Connected" : "Disconnected"}</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Settings */}
        <div className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Calendly Integration</span>
              </CardTitle>
              <CardDescription>
                Configure your Calendly settings for automated meeting booking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calendly-url">Calendly Profile URL</Label>
                <Input
                  id="calendly-url"
                  value={calendlyUrl}
                  onChange={(e) => setCalendlyUrl(e.target.value)}
                  placeholder="https://calendly.com/your-profile"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Discovery Call Duration</Label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-md"
                    value={selectedTimeSlots.discovery}
                    onChange={(e) => setSelectedTimeSlots({...selectedTimeSlots, discovery: e.target.value})}
                  >
                    <option value="15 min">15 minutes</option>
                    <option value="30 min">30 minutes</option>
                    <option value="45 min">45 minutes</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Strategy Call Duration</Label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-md"
                    value={selectedTimeSlots.strategy}
                    onChange={(e) => setSelectedTimeSlots({...selectedTimeSlots, strategy: e.target.value})}
                  >
                    <option value="30 min">30 minutes</option>
                    <option value="45 min">45 minutes</option>
                    <option value="60 min">60 minutes</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Consultation Duration</Label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-md"
                    value={selectedTimeSlots.consultation}
                    onChange={(e) => setSelectedTimeSlots({...selectedTimeSlots, consultation: e.target.value})}
                  >
                    <option value="45 min">45 minutes</option>
                    <option value="60 min">60 minutes</option>
                    <option value="90 min">90 minutes</option>
                  </select>
                </div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Calendar integration is active. Meeting requests will automatically book available time slots.
                </AlertDescription>
              </Alert>

              <div className="flex space-x-2">
                <Button onClick={handleSaveSettings} className="flex-1">
                  Save Settings
                </Button>
                <Button variant="outline" onClick={handleTestIntegration}>
                  Test Integration
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
            <CardHeader>
              <CardTitle>Meeting Types</CardTitle>
              <CardDescription className="text-green-100">
                Pre-configured meeting types for different conversation stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    type: "Discovery Call", 
                    duration: "30 min", 
                    description: "Initial conversation to understand HR challenges",
                    bookings: 23
                  },
                  { 
                    type: "Strategy Discussion", 
                    duration: "45 min", 
                    description: "Deep dive into people-first culture strategies",
                    bookings: 12
                  },
                  { 
                    type: "Full Consultation", 
                    duration: "60 min", 
                    description: "Comprehensive review and recommendations",
                    bookings: 8
                  }
                ].map((meeting, index) => (
                  <div key={index} className="bg-green-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{meeting.type}</p>
                      <Badge className="bg-white text-green-600">{meeting.duration}</Badge>
                    </div>
                    <p className="text-sm text-green-100 mb-2">{meeting.description}</p>
                    <p className="text-xs text-green-200">{meeting.bookings} bookings this month</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Meetings */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>Upcoming Meetings</span>
            </CardTitle>
            <CardDescription>Your scheduled conversations with HR prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                        {meeting.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{meeting.name}</p>
                        <p className="text-sm text-slate-600">{meeting.title}</p>
                        <p className="text-sm text-slate-500">{meeting.company}</p>
                      </div>
                    </div>
                    <Badge variant={meeting.status === "confirmed" ? "default" : "secondary"}>
                      {meeting.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{meeting.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-slate-900">{meeting.type}</span>
                      <span className="text-sm text-slate-500">{meeting.duration}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4">
              View All Meetings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Embed Preview */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="w-5 h-5 text-blue-600" />
            <span>Calendar Embed Preview</span>
          </CardTitle>
          <CardDescription>
            This is how your calendar will appear when prospects click to book a meeting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 p-8 rounded-lg text-center">
            <div className="max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Book a Discovery Call</h3>
              <p className="text-slate-600 mb-4">
                Schedule a 30-minute conversation to discuss your people-first culture goals
              </p>
              <Button className="w-full">
                Select a Time Slot
              </Button>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-3 text-center">
            Preview of your Calendly booking page integration
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
