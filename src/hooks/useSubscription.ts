
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionInfo {
  subscribed: boolean;
  subscription_tier: string;
  subscription_end: string | null;
  loading: boolean;
  max_connections: number;
  max_templates: number;
  requires_verification: boolean;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    subscribed: false,
    subscription_tier: 'free',
    subscription_end: null,
    loading: true,
    max_connections: 25,
    max_templates: 3,
    requires_verification: false,
  });
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSubscription(prev => ({ ...prev, loading: false }));
        return;
      }

      // Get basic subscription info
      const { data: subData, error: subError } = await supabase.functions.invoke('check-subscription');
      if (subError) {
        console.error('Subscription check error:', subError);
      }

      // Get adjusted usage limits (includes verification status)
      const { data: limitsData, error: limitsError } = await supabase.rpc('get_adjusted_usage_limits', {
        user_uuid: user.id
      });

      if (limitsError) {
        console.error('Limits check error:', limitsError);
      }

      const limits = limitsData && limitsData.length > 0 ? limitsData[0] : null;
      
      setSubscription({
        subscribed: subData?.subscribed || false,
        subscription_tier: subData?.subscription_tier || 'free',
        subscription_end: subData?.subscription_end,
        loading: false,
        max_connections: limits?.max_connections || 25,
        max_templates: limits?.max_templates || 3,
        requires_verification: limits?.requires_verification || false,
      });

      // Show verification warning if needed
      if (limits?.requires_verification) {
        toast({
          title: "Verification Required",
          description: "Your account has restricted limits. Please verify your phone number to unlock full features.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription(prev => ({ ...prev, loading: false }));
    }
  };

  const createCheckout = async (planType: 'pro' | 'enterprise') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to a plan.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType }
      });
      if (error) throw error;
      
      // Open in new tab so user doesn't lose their place
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openCustomerPortal = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to manage your billing.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      
      // Open in new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open billing portal. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkSubscription();
  }, []);

  return {
    ...subscription,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
};
