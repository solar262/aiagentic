
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, MessageSquare, Calendar } from "lucide-react";

interface PerformanceMetricsProps {
  campaigns: any[];
}

export const PerformanceMetrics = ({ campaigns }: PerformanceMetricsProps) => {
  const calculateOverallMetrics = () => {
    if (!campaigns.length) return { connectionRate: 0, responseRate: 0, meetingRate: 0 };
    
    const totalProspects = campaigns.reduce((sum, c) => sum + (c.total_prospects || 0), 0);
    const totalConnected = campaigns.reduce((sum, c) => sum + (c.connected_count || 0), 0);
    const totalReplied = campaigns.reduce((sum, c) => sum + (c.replied_count || 0), 0);
    const totalMeetings = campaigns.reduce((sum, c) => sum + (c.booked_count || 0), 0);
    
    const connectionRate = totalProspects > 0 ? Math.round((totalConnected / totalProspects) * 100) : 0;
    const responseRate = totalConnected > 0 ? Math.round((totalReplied / totalConnected) * 100) : 0;
    const meetingRate = totalReplied > 0 ? Math.round((totalMeetings / totalReplied) * 100) : 0;
    
    return { connectionRate, responseRate, meetingRate };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'paused': return 'Paused';
      case 'completed': return 'Completed';
      case 'draft': return 'Draft';
      default: return 'Unknown';
    }
  };

  const overallMetrics = calculateOverallMetrics();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Connection Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">{overallMetrics.connectionRate}%</div>
            <p className="text-sm text-slate-600">Average across all campaigns</p>
            <div className="mt-4">
              <Progress value={overallMetrics.connectionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span>Response Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{overallMetrics.responseRate}%</div>
            <p className="text-sm text-slate-600">Prospects who replied</p>
            <div className="mt-4">
              <Progress value={overallMetrics.responseRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Meeting Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">{overallMetrics.meetingRate}%</div>
            <p className="text-sm text-slate-600">Meetings booked</p>
            <div className="mt-4">
              <Progress value={overallMetrics.meetingRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle>Campaign Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600">No campaigns available for performance comparison.</p>
              <p className="text-sm text-slate-500 mt-2">Create your first campaign to see performance metrics here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => {
                const connectionRate = campaign.total_prospects > 0 
                  ? Math.round((campaign.connected_count / campaign.total_prospects) * 100)
                  : 0;
                const responseRate = campaign.connected_count > 0
                  ? Math.round((campaign.replied_count / campaign.connected_count) * 100)
                  : 0;
                
                return (
                  <div key={campaign.id} className="border-b border-slate-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{campaign.name}</h4>
                      <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                        {getStatusText(campaign.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Connection Rate</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={connectionRate} className="h-2 flex-1" />
                          <span className="font-medium">{connectionRate}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-600">Response Rate</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={responseRate} className="h-2 flex-1" />
                          <span className="font-medium">{responseRate}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-600">Meetings</span>
                        <div className="text-lg font-semibold mt-1">{campaign.booked_count || 0}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
