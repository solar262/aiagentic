import { useState } from "react";
import { LinkedInConnector } from "./LinkedInConnector";
import { ProspectDiscovery } from "./ProspectDiscovery";
import { CampaignManagement } from "./CampaignManagement";
import { ActivityDashboard } from "./ActivityDashboard";
import { MessageTemplates } from "./MessageTemplates";
import { Settings } from "./Settings";
import UserGuide from "./UserGuide";
import { ConversationAnalyzerComponent } from "./ConversationAnalyzerComponent";
import { CalendarIntegration } from "./CalendarIntegration";
import { BookingAgent } from "./BookingAgent";
import { SubscriptionCard } from "./SubscriptionCard";
import { UsageDashboard } from "./UsageDashboard";
import { ExtensionAuth } from "./ExtensionAuth";
import { 
  Users, 
  Search, 
  Target, 
  BarChart3, 
  MessageSquare, 
  Settings2, 
  HelpCircle, 
  MessageCircle,
  Calendar,
  Bot,
  CreditCard,
  Activity,
  Chrome
} from "lucide-react";

interface DashboardProps {
  user?: any;
}

export const Dashboard = ({ user }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <ActivityDashboard user={user} />;
      case 'linkedin':
        return <LinkedInConnector isConnected={true} onConnectionChange={() => {}} />;
      case 'prospect':
        return <ProspectDiscovery user={user} />;
      case 'campaign':
        return <CampaignManagement user={user} />;
      case 'templates':
        return <MessageTemplates />;
      case 'analyzer':
        return <ConversationAnalyzerComponent user={user} />;
      case 'calendar':
        return <CalendarIntegration />;
      case 'booking':
        return <BookingAgent user={user} />;
      case 'subscription':
        return <SubscriptionCard />;
      case 'usage':
        return <UsageDashboard />;
      case 'settings':
        return <Settings />;
      case 'guide':
        return <UserGuide />;
      case 'extension':
        return <ExtensionAuth user={user} />;
      default:
        return <ActivityDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-slate-900">The People's Partner</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-600">
            {user?.user_metadata?.full_name || user?.email || 'Demo User'}
          </span>
          {/* Add user avatar or profile dropdown here */}
        </div>
      </header>

      <div className="flex">
        
        <aside className="w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveSection('home')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'home' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Activity</span>
            </button>

            <button
              onClick={() => setActiveSection('linkedin')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'linkedin' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>LinkedIn Connector</span>
            </button>

            <button
              onClick={() => setActiveSection('prospect')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'prospect' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Prospect Discovery</span>
            </button>

            <button
              onClick={() => setActiveSection('campaign')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'campaign' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Campaign Management</span>
            </button>

            <button
              onClick={() => setActiveSection('templates')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'templates' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message Templates</span>
            </button>

            <button
              onClick={() => setActiveSection('analyzer')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'analyzer' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Conversation Analyzer</span>
            </button>

            <button
              onClick={() => setActiveSection('calendar')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'calendar' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar Integration</span>
            </button>

            <button
              onClick={() => setActiveSection('booking')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'booking' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Booking Agent</span>
            </button>

            <button
              onClick={() => setActiveSection('subscription')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'subscription' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Subscription</span>
            </button>

            <button
              onClick={() => setActiveSection('usage')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'usage' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Usage Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveSection('extension')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'extension' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Chrome className="w-4 h-4" />
              <span>Chrome Extension</span>
            </button>

            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings2 className="w-4 h-4" />
              <span>Settings</span>
            </button>

            <button
              onClick={() => setActiveSection('guide')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                activeSection === 'guide' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>User Guide</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
