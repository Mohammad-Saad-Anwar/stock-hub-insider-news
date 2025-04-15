
import { useState } from "react";
import { newsArticles } from "@/data/mockNews";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  Search, 
  ArrowUpDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArticlesList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredArticles = newsArticles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
          
          <Button>
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
            {filteredArticles.map((article) => (
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
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
