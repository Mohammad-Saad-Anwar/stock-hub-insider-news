import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getArticlesByCategory } from "@/data/mockNews";

interface CategoryNewsSectionProps {
  category: string;
  compact?: boolean;
}

export function CategoryNewsSection({ category, compact = false }: CategoryNewsSectionProps) {
  const articles = getArticlesByCategory(category).slice(0, compact ? 3 : 6);
  const mainArticle = articles[0];
  const otherArticles = articles.slice(1);
  
  if (articles.length === 0) return null;
  
  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title border-l-4 border-accent pl-4">{category}</h2>
        <Link 
          to={`/category/${category.toLowerCase()}`} 
          className="text-sm text-accent hover:underline"
        >
          View All
        </Link>
      </div>
      <Separator className="mb-6" />
      
      {compact ? (
        <div className="space-y-4">
          {articles.map((article) => (
            <Link to={`/article/${article.id}`} key={article.id} className="group">
              <div className="flex gap-4">
                <div className="w-24 h-16 overflow-hidden rounded-md">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Article */}
          <Card className="lg:col-span-2 overflow-hidden group">
            <Link to={`/article/${mainArticle.id}`}>
              <div className="relative h-64 w-full">
                {mainArticle.featured && (
                  <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs font-bold uppercase py-1 px-2 rounded-sm z-10">
                    Premium
                  </span>
                )}
                <img 
                  src={mainArticle.image} 
                  alt={mainArticle.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                  {mainArticle.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm mb-3">
                  {mainArticle.excerpt}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{mainArticle.author}</span>
                  <span className="mx-2">•</span>
                  <span>{mainArticle.date}</span>
                </div>
              </CardContent>
            </Link>
          </Card>
          
          {/* Other Articles */}
          <div className="space-y-4">
            {otherArticles.map((article) => (
              <Link to={`/article/${article.id}`} key={article.id} className="group">
                <div className="flex gap-4">
                  <div className="w-24 h-16 overflow-hidden rounded-md">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
