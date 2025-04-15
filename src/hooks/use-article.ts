
import { useState, useEffect } from "react";
import { newsArticles } from "@/data/mockNews";

// Helper function to get article by ID
export const getArticleById = (id: string) => {
  return newsArticles.find(article => article.id === id);
};

export function useArticle(id: string) {
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setIsLoading(true);
        const articleData = getArticleById(id);
        
        if (articleData) {
          setArticle(articleData);
          
          // Get related articles
          const related = newsArticles
            .filter(a => a.category === articleData.category && a.id !== id)
            .slice(0, 3);
          setRelatedArticles(related);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticleData();
  }, [id]);

  return { article, relatedArticles, isLoading, error };
}
