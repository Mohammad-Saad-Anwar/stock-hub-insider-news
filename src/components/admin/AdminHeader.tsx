
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AdminHeader() {
  return (
    <header className="bg-card border-b border-border py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome to your admin panel</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 text-sm rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-accent w-48 md:w-64" 
            />
          </div>
          
          <Button size="icon" variant="ghost" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </Button>
          
          <ThemeToggle />
          
          <Button size="icon" variant="ghost">
            <Settings className="h-5 w-5" />
          </Button>
          
          <span className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
            A
          </span>
        </div>
      </div>
    </header>
  );
}
