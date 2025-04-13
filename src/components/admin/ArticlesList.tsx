
import { useState, useEffect } from "react";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  Search, 
  ArrowUpDown,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllArticles, deleteArticle } from "@/api/articles";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export function ArticlesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const data = await getAllArticles();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError(err.message || "Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  const handleDeleteArticle = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const result = await deleteArticle(id);
        if (result.success) {
          setArticles(articles.filter(article => article.id !== id));
          toast({
            title: "Article deleted",
            description: "The article has been successfully deleted.",
          });
        } else {
          throw new Error("Failed to delete article");
        }
      } catch (err) {
        console.error("Error deleting article:", err);
        toast({
          title: "Error",
          description: "Failed to delete the article.",
          variant: "destructive",
        });
      }
    }
  };
  
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 flex items-center">
        <AlertCircle className="h-8 w-8 text-destructive mr-4" />
        <div>
          <h3 className="font-bold text-lg">Error</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold">Articles</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm rounded-md bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-accent w-full md:w-64"
            />
          </div>
          
          <Button as={Link} to="/admin/articles/new">
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>
      
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <div className="flex items-center">
                  Title
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Author</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No articles found
                </td>
              </tr>
            ) : (
              filteredArticles.map((article) => (
                <tr key={article.id} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4 max-w-xs truncate">{article.title}</td>
                  <td className="py-3 px-4">{article.category}</td>
                  <td className="py-3 px-4">{article.author}</td>
                  <td className="py-3 px-4">{article.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      article.featured ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    }`}>
                      {article.featured ? "Featured" : "Published"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/article/${article.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/admin/articles/edit/${article.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteArticle(article.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
