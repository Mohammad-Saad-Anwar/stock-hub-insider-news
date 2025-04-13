
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getArticlesByCategory, categories } from "@/data/mockNews";
import { ArticleCard } from "@/components/news/ArticleCard";

export default function CategoryPage() {
  const { slug } = useParams();
  
  // Convert slug back to category name
  const categoryName = categories.find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  const articles = categoryName ? getArticlesByCategory(categoryName) : [];
  
  if (!categoryName) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p>The category you are looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-8 border-l-4 border-accent pl-4">{categoryName}</h1>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
