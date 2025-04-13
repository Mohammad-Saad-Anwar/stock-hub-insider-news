
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  getArticleById, 
  createArticle, 
  updateArticle 
} from "@/api/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  author: z.string().min(2, "Author name must be at least 2 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  image: z.string().url("Image must be a valid URL"),
  tags: z.string().optional(),
  featured: z.boolean().default(false),
});

export function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "technology",
      image: "https://source.unsplash.com/random/1200x800/?tech",
      tags: "",
      featured: false
    }
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id || id === "new") return;
      
      try {
        setIsLoading(true);
        const article = await getArticleById(id);
        
        if (article) {
          // Convert tags array to comma separated string
          const tagsString = article.tags ? article.tags.join(", ") : "";
          
          form.reset({
            ...article,
            tags: tagsString,
          });
        } else {
          toast({
            title: "Article not found",
            description: "The article you are looking for does not exist",
            variant: "destructive"
          });
          navigate("/admin/articles");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        toast({
          title: "Error",
          description: "Failed to load article data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, navigate, toast, form]);
  
  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      
      // Convert tags string to array
      const processedData = {
        ...data,
        tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : []
      };
      
      let result;
      
      if (id && id !== "new") {
        // Update existing article
        result = await updateArticle(id, processedData);
        if (result.success) {
          toast({
            title: "Article updated",
            description: "The article has been updated successfully"
          });
        }
      } else {
        // Create new article
        result = await createArticle(processedData);
        if (result.success) {
          toast({
            title: "Article created",
            description: "The new article has been created successfully"
          });
          // Navigate to edit page with the new ID
          navigate(`/admin/articles/edit/${result.id}`);
        }
      }
      
      if (!result.success) {
        throw new Error(result.error || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save article",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const categories = [
    "technology",
    "finance",
    "stocks",
    "crypto",
    "markets",
    "business"
  ];
  
  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 flex justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p>Loading article data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-6">
        <Button 
          onClick={() => navigate("/admin/articles")} 
          variant="outline"
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
        <h2 className="text-xl font-bold">
          {id && id !== "new" ? "Edit Article" : "Create New Article"}
        </h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Article title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief summary of the article (shown in previews)" 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Full article content" 
                    rows={10}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="tag1, tag2, tag3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured Article</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Featured articles are displayed prominently on the homepage
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/articles")}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {id && id !== "new" ? "Update Article" : "Create Article"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
