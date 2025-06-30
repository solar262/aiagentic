
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  MessageSquare, 
  UserPlus, 
  Calendar,
  TrendingUp,
  Clock,
  Mail,
  Target,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const recentActivities = [
  {
    id: 1,
    type: "connection",
    title: "New connection request sent",
    description: "Sent personalized connection request to Sarah Mitchell at TechFlow Solutions",
    timestamp: "2 hours ago",
    status: "pending",
    icon: UserPlus
  },
  {
    id: 2,
    type: "message",
    title: "Follow-up message sent",
    description: "Sent value-driven follow-up to James Rodriguez with industry insights",
    timestamp: "4 hours ago",
    status: "delivered",
    icon: MessageSquare
  },
  {
    id: 3,
    type: "meeting",
    title: "Meeting booked",
    description: "Emma Thompson scheduled discovery call for tomorrow at 2:00 PM",
    timestamp: "6 hours ago",
    status: "confirmed",
    icon: Calendar
  },
  {
    id: 4,
    type: "response",
    title: "Received response",
    description: "David Wilson responded positively to your employee retention insights",
    timestamp: "8 hours ago",
    status: "positive",
    icon: Mail
  },
  {
    id: 5,
    type: "connection",
    title: "Connection accepted",
    description: "Lisa Chen accepted your connection request - HR Director at FinTech Pro",
    timestamp: "1 day ago",
    status: "accepted",
    icon: CheckCircle
  }
];

const weeklyStats = [
  { day: "Mon", connections: 8, messages: 12, responses: 5 },
  { day: "Tue", connections: 6, messages: 15, responses: 8 },
  { day: "Wed", connections: 10, messages: 18, responses: 6 },
  { day: "Thu", connections: 7, messages: 14, responses: 9 },
  { day: "Fri", connections: 5, messages: 10, responses: 4 },
  { day: "Sat", connections: 2, messages: 3, responses: 1 },
  { day: "Sun", connections: 1, messages: 2, responses: 1 }
];

export const ActivityDashboard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "accepted":
      case "positive":
        return "bg-green-500";
      case "pending":
      case "delivered":
        return "bg-blue-500";
      case "declined":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
      case "accepted":
      case "positive":
        return <Badge className="bg-green-500 text-white">Success</Badge>;
      case "pending":
        return <Badge className="bg-blue-500 text-white">Pending</Badge>;
      case "delivered":
        return <Badge className="bg-blue-500 text-white">Delivered</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Activity Dashboard</h2>
          <p className="text-slate-600">Track your outreach activities and engagement metrics</p>
        </div>
        <Button variant="outline">
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Today's Outreach</p>
                <p className="text-2xl font-bold text-slate-900">23</p>
                <p className="text-xs text-green-600 font-medium">+15% from yesterday</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Response Rate</p>
                <p className="text-2xl font-bold text-slate-900">67%</p>
                <p className="text-xs text-green-600 font-medium">+5% this week</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Meetings Booked</p>
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-xs text-green-600 font-medium">This week</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Prospects</p>
                <p className="text-2xl font-bold text-slate-900">43</p>
                <p className="text-xs text-blue-600 font-medium">In conversation</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                    <activity.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-slate-900 text-sm">{activity.title}</p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Weekly Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyStats.map((day, index) => {
                const totalActivity = day.connections + day.messages + day.responses;
                const maxActivity = Math.max(...weeklyStats.map(d => d.connections + d.messages + d.responses));
                
                return (
                  <div key={day.day} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">{day.day}</span>
                      <span className="text-sm font-bold text-slate-900">{totalActivity} activities</span>
                    </div>
                    <Progress value={(totalActivity / maxActivity) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{day.connections} connections</span>
                      <span>{day.messages} messages</span>
                      <span>{day.responses} responses</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>What's Working Well</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm text-blue-100">Industry-specific templates have 23% higher response rates</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm text-blue-100">Tuesday-Thursday outreach performs best (73% response rate)</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm text-blue-100">HR Directors respond 2x more than other titles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>Optimization Opportunities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm text-orange-100">Follow-up timing could be optimized (try 3-day intervals)</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm text-orange-100">Weekend outreach has low engagement - focus on weekdays</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm text-orange-100">Manufacturing sector shows potential - increase targeting</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
