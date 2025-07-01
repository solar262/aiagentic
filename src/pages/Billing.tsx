
import React from "react";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { UsageDashboard } from "@/components/UsageDashboard";

const Billing = () => {
  const mockUser = {
    id: "demo-user",
    email: "demo@example.com",
    user_metadata: {
      full_name: "Demo User"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Billing & Subscription</h1>
          <p className="text-slate-600 mt-2">Manage your subscription and monitor usage</p>
        </div>

        <div className="space-y-8">
          <UsageDashboard user={mockUser} />
          <SubscriptionCard />
        </div>
      </div>
    </div>
  );
};

export default Billing;
