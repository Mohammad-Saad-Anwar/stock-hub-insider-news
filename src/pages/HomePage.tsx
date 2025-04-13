
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BreakingNews } from "@/components/news/BreakingNews";
import { FeaturedArticles } from "@/components/news/FeaturedArticles";
import { TrendingArticles } from "@/components/news/TrendingArticles";
import { LatestArticles } from "@/components/news/LatestArticles";
import { CategoriesSection } from "@/components/news/CategoriesSection";
import { CategoryNewsSection } from "@/components/news/CategoryNewsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
