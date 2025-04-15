
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BreakingNews } from "@/components/news/BreakingNews";
import { FeaturedArticles } from "@/components/news/FeaturedArticles";
import { TrendingArticles } from "@/components/news/TrendingArticles";
import { LatestArticles } from "@/components/news/LatestArticles";
import { CategoriesSection } from "@/components/news/CategoriesSection";
import { CategoryNewsSection } from "@/components/news/CategoryNewsSection";
import { HeroSection } from "@/components/news/HeroSection";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileNavigation } from "@/components/mobile/MobileNavigation";
import { MobileNewsGrid } from "@/components/mobile/MobileNewsGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { getTrendingArticles, getArticlesByCategory, getLatestArticles } from "@/data/mockNews";

export default function HomePage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      {!isMobile && <Navbar />}
      
      {/* Mobile Header */}
      {isMobile && <MobileHeader />}

      {/* Hero Section - Only on Desktop */}
      {!isMobile && <HeroSection />}
      
      {!isMobile && <BreakingNews />}
      
      <main className={`${isMobile ? 'px-4 py-4 bg-black pb-24' : 'container px-4 py-6'}`}>
        {/* Mobile Layout */}
        {isMobile && (
          <>
            <MobileNewsGrid 
              title="Trending" 
              articles={getTrendingArticles()}
              viewAllLink="/trending"
            />
            
            <MobileNewsGrid 
              title="Politics" 
              articles={getArticlesByCategory("Politics")}
              viewAllLink="/category/politics"
            />
            
            <MobileNewsGrid 
              title="Technology" 
              articles={getArticlesByCategory("Technology")}
              viewAllLink="/category/technology"
            />
            
            <MobileNewsGrid 
              title="Business" 
              articles={getArticlesByCategory("Business")}
              viewAllLink="/category/business"
            />
            
            <MobileNewsGrid 
              title="Latest News" 
              articles={getLatestArticles(6)}
              viewAllLink="/latest"
            />
          </>
        )}
        
        {/* Desktop Layout */}
        {!isMobile && (
          <>
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
          </>
        )}
      </main>
      
      {!isMobile && <Footer />}
      
      {/* Mobile Navigation */}
      {isMobile && <MobileNavigation />}
    </div>
  );
}
