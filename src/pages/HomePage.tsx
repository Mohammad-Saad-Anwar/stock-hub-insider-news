
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturedArticles } from "@/components/news/FeaturedArticles";
import { TrendingArticles } from "@/components/news/TrendingArticles";
import { LatestArticles } from "@/components/news/LatestArticles";
import { CategoriesSection } from "@/components/news/CategoriesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container px-4 py-6">
        <FeaturedArticles />
        <TrendingArticles />
        <LatestArticles />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
}
