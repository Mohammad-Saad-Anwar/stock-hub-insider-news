
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getArticlesByCategory, categories } from "@/data/mockNews";
import { ArticleCard } from "@/components/news/ArticleCard";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileNavigation } from "@/components/mobile/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Convert slug back to category name
  const categoryName = categories.find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  const articles = categoryName ? getArticlesByCategory(categoryName) : [];
  
  if (!categoryName) {
    return (
      <div className="min-h-screen">
        {isMobile ? <MobileHeader title="Category Not Found" /> : <Navbar />}
        <main className={isMobile ? "p-4 bg-black" : "container px-4 py-12"}>
          <div className="text-center">
            <h1 className={`text-3xl font-bold mb-4 ${isMobile ? 'text-white' : ''}`}>Category Not Found</h1>
            <p className={isMobile ? 'text-gray-300' : ''}>
              The category you are looking for doesn't exist.
            </p>
          </div>
        </main>
        {isMobile ? <MobileNavigation /> : <Footer />}
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen ${isMobile ? 'bg-black' : ''}`}>
      {isMobile ? (
        <MobileHeader title={categoryName} />
      ) : (
        <Navbar />
      )}
      
      <main className={isMobile ? "px-4 py-4 pb-20 bg-black" : "container px-4 py-6"}>
        {!isMobile && (
          <h1 className="text-3xl font-bold mb-8 border-l-4 border-accent pl-4">{categoryName}</h1>
        )}
        
        {articles.length > 0 ? (
          <div className={isMobile 
            ? "grid grid-cols-2 gap-3" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {articles.map(article => (
              isMobile ? (
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
                    <h3 className="text-sm font-medium text-white line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ) : (
                <ArticleCard key={article.id} article={article} />
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={`${isMobile ? 'text-gray-400' : 'text-muted-foreground'}`}>
              No articles found in this category.
            </p>
          </div>
        )}
      </main>
      
      {isMobile ? <MobileNavigation /> : <Footer />}
    </div>
  );
}

// Missing import
import { Link } from "react-router-dom";
