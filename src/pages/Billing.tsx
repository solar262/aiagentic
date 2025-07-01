
import React, { useState, useEffect } from "react";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { UsageDashboard } from "@/components/UsageDashboard";
import { PhoneVerification } from "@/components/PhoneVerification";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { useAntiAbuse } from "@/hooks/useAntiAbuse";
import { User } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";

const Billing = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const { requires_verification, checkSubscription } = useSubscription();
  const { trackUserSession } = useAntiAbuse();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          await trackUserSession();
        }
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    setShowVerification(requires_verification);
  }, [requires_verification]);

  const handleVerificationComplete = async () => {
    setShowVerification(false);
    await checkSubscription(); // Refresh subscription info
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Billing & Subscription</h1>
          <p className="text-slate-600 mt-2">Manage your subscription and monitor usage</p>
        </div>

        {/* Verification Required Alert */}
        {requires_verification && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Account Verification Required:</strong> Your account has been flagged for potential duplicate usage. 
              Please verify your phone number to restore full access to your account.
            </AlertDescription>
          </Alert>
        )}

        {/* Phone Verification */}
        {showVerification && (
          <div className="mb-8">
            <PhoneVerification 
              onVerified={handleVerificationComplete}
              required={true}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          <UsageDashboard user={user} />
          <SubscriptionCard />
          
          {/* Account Security Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Account Security</h3>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p>• We monitor for duplicate accounts and suspicious activity</p>
              <p>• Phone verification may be required for account security</p>
              <p>• Verified accounts have higher usage limits and priority support</p>
              <p>• Multiple accounts from the same device/IP may trigger verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
