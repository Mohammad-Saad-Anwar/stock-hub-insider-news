
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { name: "Home", path: "/" },
    { name: "Technology", path: "/category/technology" },
    { name: "Markets", path: "/category/markets" },
    { name: "Business", path: "/category/business" },
    { name: "Startups", path: "/category/startups" },
    { name: "Science", path: "/category/science" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Bar */}
      <div className="bg-card py-2 border-b border-border">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold font-heading">
              <span className="text-accent">Tech</span>Stocks<span className="text-accent">Insider</span>
            </h1>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <span>New York</span>
              <span className="mx-2">•</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="container py-3">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={category.path}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  category.name === "Home" 
                    ? "bg-destructive text-destructive-foreground" 
                    : "hover:bg-accent/10"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-accordion-down">
            <nav className="flex flex-col space-y-3">
              {categories.map((category, index) => (
                <Link 
                  key={index}
                  to={category.path}
                  className={`px-2 py-1 text-sm font-medium ${
                    category.name === "Home" 
                      ? "text-accent" 
                      : "hover:text-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link 
                to="/admin" 
                className="px-2 py-1 text-sm font-medium hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-3 animate-accordion-down">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search tech stocks news..."
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                autoFocus
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
