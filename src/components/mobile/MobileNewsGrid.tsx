
import { ArticleCard } from "@/components/news/ArticleCard";
import { NewsArticle } from "@/data/mockNews";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileNewsGridProps {
  title: string;
  articles: NewsArticle[];
  category?: string;
}

export function MobileNewsGrid({ title, articles, category }: MobileNewsGridProps) {
  const viewAllLink = category 
    ? `/category/${category.toLowerCase().replace(/\s+/g, '-')}` 
    : '/latest';
    
  return (
    <div className="mb-6">
      <div className="px-4 flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <Link to={viewAllLink} className="text-xs text-accent flex items-center">
          View All
          <ChevronRight className="h-3 w-3 ml-0.5" />
        </Link>
      </div>
      
      <div className="mobile-news-grid">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.id} article={article} variant="mobile" />
        ))}
      </div>
    </div>
  );
}
