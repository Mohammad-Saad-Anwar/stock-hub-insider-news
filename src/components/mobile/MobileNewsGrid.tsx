
import { Link } from "react-router-dom";
import { NewsArticle } from "@/data/mockNews";

interface MobileNewsGridProps {
  title: string;
  articles: NewsArticle[];
  viewAllLink?: string;
}

export function MobileNewsGrid({ title, articles, viewAllLink }: MobileNewsGridProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mb-6 md:hidden">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
            View All
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="relative flex flex-col h-40 overflow-hidden rounded-lg bg-gray-800"
          >
            <img
              src={article.image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-2">
              <span className="text-xs font-medium text-green-400 mb-1">
                {article.category}
              </span>
              <h3 className="text-sm font-medium text-white line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
