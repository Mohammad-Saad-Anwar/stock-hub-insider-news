
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { newsArticles } from "@/data/mockNews";
import { ArticleCard } from "@/components/news/ArticleCard";

export default function ArticlePage() {
  const { id } = useParams();
  const article = newsArticles.find(article => article.id === id);
  
  // Get related articles
  const relatedArticles = newsArticles
    .filter(a => a.category === article?.category && a.id !== id)
    .slice(0, 3);
  
  if (!article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p>The article you are looking for doesn't exist or has been removed.</p>
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
              <p className="text-lg font-medium mb-6">{article.excerpt}</p>
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map(tag => (
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
                {relatedArticles.map(article => (
                  <ArticleCard key={article.id} article={article} variant="small" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
