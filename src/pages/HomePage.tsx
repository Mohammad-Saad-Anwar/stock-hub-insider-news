
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/news/HeroSection";
import { FeaturedArticles } from "@/components/news/FeaturedArticles";
import { LatestArticles } from "@/components/news/LatestArticles";
import { TrendingArticles } from "@/components/news/TrendingArticles";
import { CategoriesSection } from "@/components/news/CategoriesSection";
import { CategoryNewsSection } from "@/components/news/CategoryNewsSection";
import { getLatestArticles, getFeaturedArticles, getTrendingArticles } from "@/data/mockNews";
import { categories } from "@/data/mockNews";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileNavigation } from "@/components/mobile/MobileNavigation";
import { MobileNewsGrid } from "@/components/mobile/MobileNewsGrid";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HomePage() {
  const isMobile = useIsMobile();
  const latest = getLatestArticles();
  const featured = getFeaturedArticles();
  const trending = getTrendingArticles();

  // Use the first category for an example category section
  const exampleCategory = categories[0];
  
  return (
    <div className="min-h-screen bg-background">
      {isMobile ? (
        // Mobile layout
        <div className="bg-black text-white">
          <MobileHeader />
          
          {/* Mobile Featured News */}
          <main className="px-4 pb-20">
            <MobileNewsGrid 
              title="Featured" 
              articles={featured} 
              viewAllLink="/category/featured" 
            />
            
            <MobileNewsGrid 
              title="Latest News" 
              articles={latest} 
              viewAllLink="/latest" 
            />
            
            <MobileNewsGrid 
              title="Trending" 
              articles={trending} 
              viewAllLink="/trending" 
            />
            
            {/* More sections can be added here */}
          </main>
          
          <MobileNavigation />
        </div>
      ) : (
        // Desktop layout
        <>
          <Navbar />
          <main>
            <HeroSection />
            <div className="container px-4 py-8">
              <div className="flex flex-col gap-10">
                <FeaturedArticles articles={featured} />
                <LatestArticles />
                <TrendingArticles />
                <CategoriesSection categories={categories} />
                <CategoryNewsSection 
                  category={exampleCategory} 
                />
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
