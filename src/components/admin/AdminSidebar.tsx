
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  FileText,
  Settings,
  Users,
  Tag,
  BarChart3,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", icon: Home, path: "/admin" },
  { name: "Articles", icon: FileText, path: "/admin/articles" },
  { name: "Categories", icon: Tag, path: "/admin/categories" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const location = useLocation();
  
  return (
    <div className={`w-64 min-h-screen bg-card border-r border-border p-4 ${!open ? 'hidden' : 'block'} md:block`}>
      <div className="mb-8 pt-4">
        <h1 className="text-xl font-bold px-4">
          <span className="text-accent">Admin</span> Panel
        </h1>
      </div>
      
      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                isActive 
                  ? "bg-accent text-accent-foreground" 
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <Link
          to="/"
          className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Back to Website
        </Link>
      </div>
    </div>
  );
}
