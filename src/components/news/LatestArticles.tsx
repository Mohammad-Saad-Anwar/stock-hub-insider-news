
import { useEffect, useState } from "react";
import { getLatestArticles } from "@/data/mockNews";
import { ArticleCard } from "./ArticleCard";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export function LatestArticles() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const articles = getLatestArticles().slice(0, 6);

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
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Note</p>
            <p>{error}</p>
          </div>
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
