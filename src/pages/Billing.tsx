
import React, { useState, useEffect } from "react";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { UsageDashboard } from "@/components/UsageDashboard";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const Billing = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

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

        <div className="space-y-8">
          <UsageDashboard user={user} />
          <SubscriptionCard />
        </div>
      </div>
    </div>
  );
};

export default Billing;
