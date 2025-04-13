
import { getFeaturedArticles } from "@/data/mockNews";
import { ArticleCard } from "./ArticleCard";

export function FeaturedArticles() {
  const featuredArticles = getFeaturedArticles();
  const mainFeatured = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);

  return (
    <section className="my-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ArticleCard article={mainFeatured} variant="featured" />
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
