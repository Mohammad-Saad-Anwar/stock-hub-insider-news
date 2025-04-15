
import { Bell, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface MobileHeaderProps {
  title?: string;
}

export function MobileHeader({ title = "News" }: MobileHeaderProps) {
  return (
    <div className="mobile-header">
      <div className="flex items-center">
        <Menu className="h-5 w-5 mr-3" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <button className="rounded-full p-1">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
