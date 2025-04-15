
import { Search, Star, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function MobileHeader({ 
  title = "News", 
  showBackButton = false, 
  onBack 
}: MobileHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="bg-black py-4 px-4 md:hidden sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {showBackButton ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-0 text-white" 
            onClick={onBack}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Button>
        ) : (
          <h1 className="text-xl font-bold text-white">{title}</h1>
        )}
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-gray-800"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5 text-gray-300" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-gray-800"
          >
            <Star className="h-5 w-5 text-gray-300" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full bg-gray-800"
              >
                <Menu className="h-5 w-5 text-gray-300" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-900 text-white border-gray-800">
              <div className="flex flex-col gap-4 py-8">
                <h3 className="text-xl font-bold">Menu</h3>
                {["Technology", "Markets", "Business", "Science", "Politics", "Health"].map(
                  (category) => (
                    <a 
                      key={category} 
                      href={`/category/${category.toLowerCase()}`}
                      className="py-2 text-gray-300 hover:text-white"
                    >
                      {category}
                    </a>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="mt-3 animate-accordion-down">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search news..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-600 text-white"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
