
import { useEffect, useState } from "react";
import { getFeaturedArticles } from "@/api/articles";
import { ArticleCard } from "./ArticleCard";
import { AlertCircle } from "lucide-react";

export function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getFeaturedArticles();
        setArticles(data || []);
      } catch (error) {
        console.error("Error fetching featured articles:", error);
        setError("Failed to load featured articles");
        // Try to set mock data if available
        try {
          import('@/data/mockNews').then(({ newsArticles }) => {
            const featuredArticles = newsArticles.filter(article => article.featured).slice(0, 5);
            setArticles(featuredArticles);
          });
        } catch (mockError) {
          console.error("Failed to load mock data:", mockError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <section className="my-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-card animate-pulse rounded-md"></div>
          <div className="lg:col-span-1 grid grid-cols-1 gap-6">
            <div className="h-44 bg-card animate-pulse rounded-md"></div>
            <div className="h-44 bg-card animate-pulse rounded-md"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-8">
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Note</p>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const mainFeatured = articles[0];
  const secondaryFeatured = articles.slice(1, 3);

  return (
    <section className="my-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {mainFeatured && <ArticleCard article={mainFeatured} variant="featured" />}
        </div>
        <div className="lg:col-span-1 grid grid-cols-1 gap-6">
          {secondaryFeatured.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
