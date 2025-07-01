
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, FileText, BarChart3, AlertTriangle, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";

interface UsageData {
  connections_used: number;
  messages_sent: number;
  templates_created: number;
  ai_templates_generated: number;
  reports_generated: number;
  max_connections: number;
  max_templates: number;
  max_ai_templates: number;
  max_team_members: number;
}

export const UsageDashboard = ({ user }: { user: any }) => {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { subscription_tier, createCheckout } = useSubscription();

  useEffect(() => {
    if (user?.id) {
      fetchUsageData();
    }
  }, [user]);

  const fetchUsageData = async () => {
    try {
      if (!user?.id) {
        console.log('No user ID available');
        setLoading(false);
        return;
      }

      // Get current month usage
      const currentMonth = new Date().toISOString().slice(0, 7); // "2024-01" format
      const { data: usageData } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('month_year', currentMonth)
        .single();

      // Get template count
      const { count: templateCount } = await supabase
        .from('message_templates')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get adjusted limits (includes AI template limits)
      const { data: limitsData } = await supabase.rpc('get_adjusted_usage_limits', {
        user_uuid: user.id
      });

      const limits = limitsData && limitsData.length > 0 ? limitsData[0] : null;

      // Set default limits if no data
      const defaultLimits = {
        max_connections: 25,
        max_templates: 3,
        max_ai_templates: 10,
        max_team_members: 1
      };

      if (subscription_tier === 'pro') {
        defaultLimits.max_connections = -1; // Unlimited
        defaultLimits.max_templates = -1; // Unlimited
        defaultLimits.max_ai_templates = 100;
        defaultLimits.max_team_members = 10;
      } else if (subscription_tier === 'enterprise') {
        defaultLimits.max_connections = -1; // Unlimited
        defaultLimits.max_templates = -1; // Unlimited
        defaultLimits.max_ai_templates = -1; // Unlimited
        defaultLimits.max_team_members = 50;
      }

      setUsage({
        connections_used: usageData?.connections_used || 0,
        messages_sent: usageData?.messages_sent || 0,
        templates_created: templateCount || 0,
        ai_templates_generated: usageData?.ai_templates_generated || 0,
        reports_generated: usageData?.reports_generated || 0,
        max_connections: limits?.max_connections || defaultLimits.max_connections,
        max_templates: limits?.max_templates || defaultLimits.max_templates,
        max_ai_templates: limits?.max_ai_templates || defaultLimits.max_ai_templates,
        max_team_members: defaultLimits.max_team_members
      });
    } catch (error) {
      console.error('Error fetching usage data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!usage) return null;

  const getUsageColor = (used: number, max: number) => {
    if (max === -1) return "bg-green-500"; // Unlimited
    const percentage = (used / max) * 100;
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getUsagePercentage = (used: number, max: number) => {
    if (max === -1) return 0; // Unlimited shows as 0%
    return Math.min((used / max) * 100, 100);
  };

  const isAtLimit = (used: number, max: number) => {
    return max !== -1 && used >= max;
  };

  const usageItems = [
    {
      label: "LinkedIn Connections",
      used: usage.connections_used,
      max: usage.max_connections,
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Message Templates",
      used: usage.templates_created,
      max: usage.max_templates,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: "AI Templates Generated",
      used: usage.ai_templates_generated,
      max: usage.max_ai_templates,
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      label: "Messages Sent",
      used: usage.messages_sent,
      max: -1, // No limit on messages sent
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Usage Overview</span>
            </CardTitle>
            <CardDescription>
              Monitor your monthly usage and subscription limits
            </CardDescription>
          </div>
          <Badge variant={subscription_tier === 'free' ? 'secondary' : 'default'}>
            {subscription_tier.charAt(0).toUpperCase() + subscription_tier.slice(1)} Plan
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {usageItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {isAtLimit(item.used, item.max) && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {item.used} / {item.max === -1 ? '∞' : item.max}
                </div>
              </div>
              
              <Progress 
                value={getUsagePercentage(item.used, item.max)} 
                className="h-2"
              />
              
              {isAtLimit(item.used, item.max) && (
                <p className="text-sm text-red-600">
                  You've reached your {item.label.toLowerCase()} limit for this month.
                </p>
              )}
            </div>
          ))}

          {subscription_tier === 'free' && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">Upgrade for unlimited access</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Get unlimited connections, templates, 100 AI generations per month, and advanced features with our Pro plan.
                  </p>
                  <Button 
                    onClick={() => createCheckout('pro')} 
                    className="mt-3" 
                    size="sm"
                  >
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
