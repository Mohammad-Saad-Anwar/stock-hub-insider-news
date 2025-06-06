import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArticleCard } from "@/components/news/ArticleCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, Share2 } from "lucide-react";
import { MobileTabBar } from "@/components/mobile/MobileTabBar";
import { newsArticles } from "@/data/mockNews";

// Helper function to get article by ID
const getArticleById = (id) => {
  return newsArticles.find(article => article.id === id);
};

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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
          const related = newsArticles.filter(a => a.category === articleData.category && a.id !== id).slice(0, 3);
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        {!isMobile && <Navbar />}
        <main className="container px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="h-10 bg-muted rounded-md w-3/4"></div>
            <div className="h-4 bg-muted rounded-md w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded-md"></div>
              <div className="h-4 bg-muted rounded-md"></div>
              <div className="h-4 bg-muted rounded-md w-5/6"></div>
            </div>
          </div>
        </main>
        {!isMobile && <Footer />}
        {isMobile && <MobileTabBar />}
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="min-h-screen">
        {!isMobile && <Navbar />}
        <main className="container px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p>The article you are looking for doesn't exist or has been removed.</p>
          </div>
        </main>
        {!isMobile && <Footer />}
        {isMobile && <MobileTabBar />}
      </div>
    );
  }
  
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background mobile-content">
        {/* Mobile Article Header */}
        <div className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-4 py-3 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </button>
          <button className="p-1">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        
        <main className="pb-16">
          {/* Hero Image */}
          <div className="w-full">
            <img 
              src={article.image} 
              alt={article.title} 
              className="h-60 w-full object-cover"
            />
          </div>
          
          <div className="px-4 pt-4">
            <div className="category-badge mb-2">{article.category}</div>
            <h1 className="text-xl font-bold mb-3">{article.title}</h1>
            
            <div className="flex items-center mb-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">4.9</span>
              <span className="mx-1.5 text-sm text-gray-500">(148)</span>
            </div>
            
            <div className="prose prose-sm max-w-none mb-8">
              <div className="text-base mb-4 font-medium" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6 mb-8">
              {article.tags && article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map(article => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        
        <MobileTabBar />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container px-4 py-6">
        {/* Hero Image */}
        <div className="relative h-96 mb-8">
          <img 
            src={article.image} 
            alt={article.title} 
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="category-badge mb-3">{article.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center mb-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
            </div>
            
            <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none mb-8">
              <div className="text-lg font-medium mb-6" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags && article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map(article => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No related articles found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
