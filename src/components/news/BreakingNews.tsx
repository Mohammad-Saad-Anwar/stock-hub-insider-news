
import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export function BreakingNews() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const breakingNews = [
    "Apple's stock surges 8% on better-than-expected earnings report",
    "Tesla announces new AI chip for autonomous driving capabilities",
    "Microsoft completes $75 billion Activision Blizzard acquisition",
    "Amazon warehouse workers vote to unionize in historic decision"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);
  
  const nextNews = () => {
    setActiveIndex((activeIndex + 1) % breakingNews.length);
  };
  
  const prevNews = () => {
    setActiveIndex((activeIndex - 1 + breakingNews.length) % breakingNews.length);
  };

  return (
    <div className="bg-accent text-accent-foreground py-3 sticky top-[60px] z-30 w-full">
      <div className="container flex items-center">
        <div className="bg-destructive text-destructive-foreground font-bold py-1 px-4 mr-4 text-sm uppercase flex-shrink-0">
          Breaking News
        </div>
        
        <button 
          onClick={prevNews}
          className="text-accent-foreground/80 hover:text-accent-foreground mr-2"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="overflow-hidden whitespace-nowrap text-ellipsis flex-1">
          <p className="animate-slide-in-right">
            {breakingNews[activeIndex]}
          </p>
        </div>
        
        <button 
          onClick={nextNews}
          className="text-accent-foreground/80 hover:text-accent-foreground ml-2"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
