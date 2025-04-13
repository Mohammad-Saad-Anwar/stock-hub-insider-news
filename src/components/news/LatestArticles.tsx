
import { getLatestArticles } from "@/data/mockNews";
import { ArticleCard } from "./ArticleCard";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function LatestArticles() {
  const latestArticles = getLatestArticles().slice(0, 6);

  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Latest News</h2>
        <Link to="/latest" className="text-sm text-accent hover:underline">
          View All
        </Link>
      </div>
      <Separator className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
