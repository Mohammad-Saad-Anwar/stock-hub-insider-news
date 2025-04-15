
import { Home, BarChart2, Newspaper, Briefcase, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2 px-4 z-50 md:hidden">
      <div className="flex justify-between items-center">
        <NavItem icon={<BarChart2 size={20} />} label="Analytics" path="/analytics" />
        <NavItem icon={<Newspaper size={20} />} label="News" path="/category/technology" />
        <NavItem icon={<Home size={20} />} label="Home" path="/" />
        <NavItem icon={<Briefcase size={20} />} label="Portfolio" path="/portfolio" />
        <NavItem icon={<Settings size={20} />} label="Settings" path="/settings" />
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

function NavItem({ icon, label, path }: NavItemProps) {
  const isActive = window.location.pathname === path;
  
  return (
    <Link 
      to={path} 
      className="flex flex-col items-center space-y-1"
    >
      <div className={`${isActive ? 'text-green-500' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-xs ${isActive ? 'text-green-500' : 'text-gray-400'}`}>
        {label}
      </span>
    </Link>
  );
}
