
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { categories } from "@/data/mockNews";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold font-heading">
              <span className="text-accent">Tech</span>Stocks<span className="text-accent">Insider</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-accent duration-200">Home</Link>
            {categories.slice(0, 4).map((category) => (
              <Link 
                key={category}
                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium hover:text-accent duration-200"
              >
                {category}
              </Link>
            ))}
            <Link to="/categories" className="text-sm font-medium hover:text-accent duration-200">More</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Button asChild className="hidden md:flex">
              <Link to="/admin">Admin</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="px-2 py-1 text-sm font-medium hover:text-accent duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link 
                  key={category}
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-2 py-1 text-sm font-medium hover:text-accent duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link 
                to="/admin" 
                className="px-2 py-1 text-sm font-medium hover:text-accent duration-200"
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
                placeholder="Search for news..."
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
