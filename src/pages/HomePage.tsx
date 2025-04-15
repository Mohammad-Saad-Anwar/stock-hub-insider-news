
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BreakingNews } from "@/components/news/BreakingNews";
import { FeaturedArticles } from "@/components/news/FeaturedArticles";
import { TrendingArticles } from "@/components/news/TrendingArticles";
import { LatestArticles } from "@/components/news/LatestArticles";
import { CategoriesSection } from "@/components/news/CategoriesSection";
import { CategoryNewsSection } from "@/components/news/CategoryNewsSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileTabBar } from "@/components/mobile/MobileTabBar";
import { MobileNewsCarousel } from "@/components/mobile/MobileNewsCarousel";
import { useEffect, useState } from "react";
import { categories, getArticlesByCategory, getTrendingArticles, newsArticles } from "@/data/mockNews";

export default function HomePage() {
  const isMobile = useIsMobile();
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [techArticles, setTechArticles] = useState([]);
  const [businessArticles, setBusinessArticles] = useState([]);
  
  useEffect(() => {
    // Load articles for mobile view
    if (isMobile) {
      setTrendingArticles(getTrendingArticles());
      setTechArticles(getArticlesByCategory("Technology"));
      setBusinessArticles(getArticlesByCategory("Business"));
    }
  }, [isMobile]);
  
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background mobile-content">
        <MobileHeader />
        
        <main>
          {/* Breaking news is hidden for mobile as requested */}
          
          <MobileNewsCarousel 
            title="Trending" 
            articles={trendingArticles} 
          />
          
          <MobileNewsCarousel 
            title="Technology" 
            articles={techArticles}
            category="Technology"
          />
          
          <MobileNewsCarousel 
            title="Business" 
            articles={businessArticles}
            category="Business"  
          />
        </main>
        
        <MobileTabBar />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero section removed as requested */}
      <BreakingNews />
      <main className="container px-4 py-6">
        <FeaturedArticles />
        <TrendingArticles />
        
        {/* Category-specific news sections */}
        <CategoryNewsSection category="Business" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <CategoryNewsSection category="Technology" compact />
          <CategoryNewsSection category="Markets" compact />
        </div>
        
        <LatestArticles />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
}
