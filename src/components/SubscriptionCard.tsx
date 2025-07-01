
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Users, BarChart3, Settings } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

export const SubscriptionCard = () => {
  const { subscription_tier, subscribed, createCheckout, openCustomerPortal, loading } = useSubscription();

  const plans = [
    {
      name: "Free",
      price: "$0",
      tier: "free",
      icon: <Zap className="w-5 h-5" />,
      features: [
        "25 LinkedIn connections/month",
        "3 message templates",
        "Basic analytics",
        "Email support"
      ],
      color: "bg-gray-100 text-gray-800",
      current: subscription_tier === 'free'
    },
    {
      name: "Pro",
      price: "$49",
      tier: "pro",
      icon: <Crown className="w-5 h-5" />,
      features: [
        "Unlimited connections",
        "Unlimited templates",
        "Advanced analytics",
        "Team collaboration (10 users)",
        "Priority support"
      ],
      color: "bg-blue-100 text-blue-800",
      current: subscription_tier === 'pro'
    },
    {
      name: "Enterprise",
      price: "$199",
      tier: "enterprise",
      icon: <Users className="w-5 h-5" />,
      features: [
        "Everything in Pro",
        "Team collaboration (50 users)",
        "White-label branding",
        "API access",
        "Dedicated success manager",
        "Advanced security"
      ],
      color: "bg-purple-100 text-purple-800",
      current: subscription_tier === 'enterprise'
    }
  ];

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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="text-gray-600 mt-2">Scale your LinkedIn outreach with the right plan for your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.tier} className={`relative ${plan.current ? 'ring-2 ring-blue-500' : ''}`}>
            {plan.current && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Current Plan
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className={`w-12 h-12 rounded-full ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                {plan.icon}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                {plan.tier !== 'free' && <span className="text-gray-600">/month</span>}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                {plan.current && subscribed ? (
                  <Button 
                    onClick={openCustomerPortal}
                    variant="outline" 
                    className="w-full"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Billing
                  </Button>
                ) : plan.tier === 'free' ? (
                  <Button disabled variant="outline" className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    onClick={() => createCheckout(plan.tier as 'pro' | 'enterprise')}
                    className="w-full"
                  >
                    {subscription_tier === 'free' ? 'Upgrade Now' : 'Switch Plan'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
