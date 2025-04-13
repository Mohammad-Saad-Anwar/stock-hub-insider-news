
import { useEffect, useState } from "react";
import { getLatestArticles } from "@/api/articles";
import { ArticleCard } from "./ArticleCard";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getLatestArticles(6);
        setArticles(data || []);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
        setError("Failed to load articles. Using mock data instead.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Latest News</h2>
        <Link to="/latest" className="text-sm text-accent hover:underline">
          View All
        </Link>
      </div>
      <Separator className="mb-6" />
      
      {error && (
        <div className="mb-4 p-2 bg-yellow-50 text-yellow-800 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-card animate-pulse h-64 rounded-md border border-border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p>No articles found.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
