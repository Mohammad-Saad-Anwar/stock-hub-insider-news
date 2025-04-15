
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { NewsArticle } from "@/data/mockNews";
import { ArticleCard } from "@/components/news/ArticleCard";

interface MobileNewsCarouselProps {
  title: string;
  articles: NewsArticle[];
  category?: string;
}

export function MobileNewsCarousel({ title, articles, category }: MobileNewsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const viewAllLink = category 
    ? `/category/${category.toLowerCase().replace(/\s+/g, '-')}` 
    : '/latest';
  
  // Show 5 articles per slide
  const slidesCount = Math.ceil(articles.length / 5);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };
  
  return (
    <div className="mb-6">
      <div className="px-4 flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={prevSlide}
            className="p-1 bg-muted rounded-full text-muted-foreground"
            disabled={slidesCount <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-1 bg-muted rounded-full text-muted-foreground"
            disabled={slidesCount <= 1}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <Link to={viewAllLink} className="text-xs text-accent ml-1 flex items-center">
            View All
            <ChevronRight className="h-3 w-3 ml-0.5" />
          </Link>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: slidesCount }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full px-4 grid grid-cols-5 gap-2">
              {articles
                .slice(slideIndex * 5, slideIndex * 5 + 5)
                .map((article) => (
                  <ArticleCard key={article.id} article={article} variant="mobile" />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
