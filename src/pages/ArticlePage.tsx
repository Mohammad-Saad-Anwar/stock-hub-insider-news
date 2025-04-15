
import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileTabBar } from "@/components/mobile/MobileTabBar";
import { useArticle } from "@/hooks/use-article";
import { ArticleDetail } from "@/components/articles/ArticleDetail";
import { ArticleLoading } from "@/components/articles/ArticleLoading";
import { ArticleError } from "@/components/articles/ArticleError";

export default function ArticlePage() {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { article, relatedArticles, isLoading, error } = useArticle(id);
  
  return (
    <div className="min-h-screen">
      {!isMobile && <Navbar />}
      
      {isLoading ? (
        <ArticleLoading isMobile={isMobile} />
      ) : error || !article ? (
        <ArticleError isMobile={isMobile} />
      ) : (
        <ArticleDetail 
          article={article} 
          relatedArticles={relatedArticles}
          isMobile={isMobile} 
        />
      )}
      
      {!isMobile && <Footer />}
      {isMobile && <MobileTabBar />}
    </div>
  );
}
