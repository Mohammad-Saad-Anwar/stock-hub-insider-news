
import { Link } from "react-router-dom";
import { NewsArticle } from "@/data/mockNews";

interface ArticleCardProps {
  article: NewsArticle;
  variant?: "default" | "featured" | "small";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <div className="article-card group h-full">
        <Link to={`/article/${article.id}`} className="block h-full">
          <div className="relative h-96 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="category-badge mb-3">{article.category}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-3">{article.title}</h2>
              <div className="text-white/80 line-clamp-2" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
              <div className="mt-4 text-white/70 text-sm flex items-center">
                <span>{article.author}</span>
                <span className="mx-2">•</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (variant === "small") {
    return (
      <div className="article-card group flex h-28">
        <Link to={`/article/${article.id}`} className="flex h-full w-full">
          <div className="w-28 h-28 overflow-hidden flex-shrink-0">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-3 flex-1">
            <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-accent">{article.title}</h3>
            <div className="text-xs text-muted-foreground">{article.date}</div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="article-card group h-full">
      <Link to={`/article/${article.id}`} className="block h-full">
        <div className="h-56 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="category-badge mb-2">{article.category}</div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-accent line-clamp-2">{article.title}</h3>
          <div className="text-muted-foreground text-sm line-clamp-2 mb-3" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
          <div className="date-text flex items-center justify-between">
            <span>{article.date}</span>
            <span>{article.author}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
