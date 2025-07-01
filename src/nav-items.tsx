
import { Home, Building2 } from "lucide-react";
import Index from "./pages/Index";
import CoachingTool from "./pages/CoachingTool";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Coaching Tool",
    to: "/coaching-tool",
    icon: <Building2 className="h-4 w-4" />,
    page: <CoachingTool />,
  },
];
