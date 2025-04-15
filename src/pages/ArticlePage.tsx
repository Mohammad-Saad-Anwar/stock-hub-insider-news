
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getArticleById } from "@/data/mockNews";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileNavigation } from "@/components/mobile/MobileNavigation";
import { Share2, Bookmark, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const article = id ? getArticleById(id) : null;
  
  if (!article) {
    return (
      <div className="min-h-screen">
        {isMobile ? <MobileHeader title="Article Not Found" /> : <Navbar />}
        <main className={isMobile ? "p-4 bg-black" : "container px-4 py-12"}>
          <div className="text-center">
            <h1 className={`text-3xl font-bold mb-4 ${isMobile ? 'text-white' : ''}`}>Article Not Found</h1>
            <p className={isMobile ? 'text-gray-300' : ''}>
              The article you are looking for doesn't exist or has been removed.
            </p>
          </div>
        </main>
        {isMobile ? <MobileNavigation /> : <Footer />}
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen ${isMobile ? 'bg-black' : 'bg-background'}`}>
      {isMobile ? (
        <MobileHeader showBackButton onBack={() => navigate(-1)} />
      ) : (
        <Navbar />
      )}
      
      <main className={`${isMobile ? 'px-0 pt-0 pb-20 bg-black' : 'container px-4 py-6'}`}>
        {isMobile ? (
          // Mobile Article Layout
          <>
            <div className="relative w-full h-72">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h1 className="text-xl font-bold text-white mb-2">{article.title}</h1>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 text-sm text-gray-300">
                    <span className="text-red-500">★ 4.8</span>
                    <span>• {article.date.split('-')[0]}</span>
                  </div>
                  <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
                    {article.category}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <Button className="flex-1 mr-2 bg-red-600 hover:bg-red-700 text-white">
                Play
              </Button>
              <Button variant="outline" className="flex-1 border-gray-700 text-gray-300">
                Download
              </Button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Genre: {article.category}</h3>
                <div 
                  className="text-gray-300 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
                />
              </div>
              
              <Separator className="bg-gray-800 my-4" />
              
              <div>
                <h3 className="text-white font-medium mb-2">Related News</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">See more</span>
                  <Button variant="link" className="text-gray-400 p-0 h-auto">
                    <span className="text-xs">See more</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Desktop Article Layout
          <>
            <article className="max-w-4xl mx-auto">
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="text-4xl font-bold font-heading mb-4">{article.title}</h1>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <span className="font-medium">{article.author}</span>
                <span className="mx-2">•</span>
                <span>{article.date}</span>
                <span className="mx-2">•</span>
                <span>5 min read</span>
              </div>
              
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }} />
              </div>
              
              <Separator className="my-8" />
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <Badge variant="outline">Stocks</Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </article>
          </>
        )}
      </main>
      
      {isMobile ? <MobileNavigation /> : <Footer />}
    </div>
  );
}
