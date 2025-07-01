
import Dashboard from "@/components/Dashboard";

const Index = () => {
  // Mock user object for the dashboard
  const mockUser = {
    id: "demo-user",
    email: "demo@example.com",
    user_metadata: {
      full_name: "Demo User"
    }
  };

  return <Dashboard user={mockUser} />;
};

export default Index;
