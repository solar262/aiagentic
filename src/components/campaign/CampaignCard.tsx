
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Square, Edit, Copy } from "lucide-react";

interface CampaignCardProps {
  campaign: any;
  onStart: (campaign: any) => void;
  onPause: (campaign: any) => void;
  onStop: (campaign: any) => void;
}

export const CampaignCard = ({ campaign, onStart, onPause, onStop }: CampaignCardProps) => {
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

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{campaign.name}</CardTitle>
          <Badge className={`${getStatusColor(campaign.status)} text-white`}>
            {getStatusText(campaign.status)}
          </Badge>
        </div>
        <CardDescription>{campaign.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-600">Total Prospects</p>
            <p className="font-semibold">{campaign.total_prospects || 0}</p>
          </div>
          <div>
            <p className="text-slate-600">Connected</p>
            <p className="font-semibold">{campaign.connected_count || 0}</p>
          </div>
          <div>
            <p className="text-slate-600">Replied</p>
            <p className="font-semibold">{campaign.replied_count || 0}</p>
          </div>
          <div>
            <p className="text-slate-600">Meetings Booked</p>
            <p className="font-semibold">{campaign.booked_count || 0}</p>
          </div>
        </div>

        {campaign.status === 'active' && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Daily Progress</span>
              <span>0/{campaign.daily_connection_limit} connections sent</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        )}

        <div className="flex space-x-2">
          {campaign.status === 'draft' && (
            <Button 
              size="sm" 
              onClick={() => onStart(campaign)}
              className="flex items-center space-x-1"
            >
              <Play className="w-3 h-3" />
              <span>Start</span>
            </Button>
          )}
          {campaign.status === 'active' && (
            <>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onPause(campaign)}
                className="flex items-center space-x-1"
              >
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onStop(campaign)}
                className="flex items-center space-x-1"
              >
                <Square className="w-3 h-3" />
                <span>Stop</span>
              </Button>
            </>
          )}
          {campaign.status === 'paused' && (
            <Button 
              size="sm" 
              onClick={() => onStart(campaign)}
              className="flex items-center space-x-1"
            >
              <Play className="w-3 h-3" />
              <span>Resume</span>
            </Button>
          )}
          <Button size="sm" variant="outline">
            <Edit className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline">
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
