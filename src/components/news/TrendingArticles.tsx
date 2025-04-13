
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { getTrendingArticles } from "@/data/mockNews";
import { ArticleCard } from "./ArticleCard";

export function TrendingArticles() {
  const trendingArticles = getTrendingArticles();

  return (
    <section className="my-8">
      <div className="flex items-center mb-4">
        <Flame className="h-5 w-5 mr-2 text-red-500" />
        <h2 className="text-xl font-bold">Trending Now</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingArticles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="small" />
        ))}
      </div>
    </section>
  );
}
