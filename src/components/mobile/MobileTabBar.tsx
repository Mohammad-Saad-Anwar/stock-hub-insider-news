
import { Home, Newspaper, Search, BarChart2, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function MobileTabBar() {
  const location = useLocation();
  const path = location.pathname;
  
  const tabs = [
    {
      name: "Home",
      icon: Home,
      path: "/"
    },
    {
      name: "News",
      icon: Newspaper,
      path: "/news"
    },
    {
      name: "Trending",
      icon: BarChart2,
      path: "/trending"
    },
    {
      name: "Search",
      icon: Search,
      path: "/search"
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings"
    }
  ];
  
  return (
    <div className="mobile-tab-bar">
      {tabs.map((tab) => {
        const isActive = 
          tab.path === "/" 
            ? path === "/"
            : path.startsWith(tab.path);
            
        return (
          <Link 
            key={tab.name}
            to={tab.path} 
            className={`mobile-tab ${isActive ? 'active' : ''}`}
          >
            <tab.icon size={20} />
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
