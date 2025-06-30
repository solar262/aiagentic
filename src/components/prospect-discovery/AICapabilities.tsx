
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

export const AICapabilities = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>AI Prospecting Capabilities</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Smart Discovery</h4>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• Analyzes 100M+ LinkedIn profiles</li>
              <li>• Identifies decision-makers automatically</li>
              <li>• Filters by company growth signals</li>
              <li>• Detects hiring activity patterns</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Quality Scoring</h4>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• AI-powered lead scoring (0-100)</li>
              <li>• Identifies pain points from posts</li>
              <li>• Analyzes engagement likelihood</li>
              <li>• Suggests optimal outreach timing</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
