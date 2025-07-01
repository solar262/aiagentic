
import Dashboard from "@/components/Dashboard";
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  // Generate a proper UUID for demo user
  const demoUserId = uuidv4();
  
  // Mock user object for the dashboard with proper UUID
  const mockUser = {
    id: demoUserId,
    email: "demo@example.com",
    user_metadata: {
      full_name: "Demo User"
    }
  };

  return <Dashboard user={mockUser} />;
};

export default Index;
