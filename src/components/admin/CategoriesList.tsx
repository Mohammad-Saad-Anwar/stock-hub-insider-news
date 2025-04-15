
import { useState, useEffect } from "react";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  AlertCircle,
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "@/api/categories";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name cannot exceed 50 characters"),
  description: z.string().optional(),
});

export function CategoriesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  
  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError(err.message || "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  const handleOpenDialog = (category = null) => {
    setEditingCategory(category);
    
    if (category) {
      form.reset({
        name: category.name,
        description: category.description || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
      });
    }
    
    setDialogOpen(true);
  };
  
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const result = await deleteCategory(id);
        if (result.success) {
          setCategories(categories.filter(category => category.id !== id));
          toast({
            title: "Category deleted",
            description: "The category has been successfully deleted.",
          });
        } else {
          throw new Error("Failed to delete category");
        }
      } catch (err) {
        console.error("Error deleting category:", err);
        toast({
          title: "Error",
          description: "Failed to delete the category.",
          variant: "destructive",
        });
      }
    }
  };
  
  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        // Update existing category
        const result = await updateCategory(editingCategory.id, data);
        if (result.success) {
          toast({
            title: "Category updated",
            description: "The category has been successfully updated.",
          });
          
          // Refresh categories list
          await loadCategories();
        } else {
          throw new Error("Failed to update category");
        }
      } else {
        // Create new category
        const result = await createCategory(data);
        if (result.success) {
          toast({
            title: "Category created",
            description: "The category has been successfully created.",
          });
          
          // Add new category to list
          if (result.category) {
            setCategories([...categories, result.category]);
          } else {
            // Refresh categories list
            await loadCategories();
          }
        } else {
          throw new Error("Failed to create category");
        }
      }
      
      // Close dialog
      setDialogOpen(false);
    } catch (err) {
      console.error("Error saving category:", err);
      toast({
        title: "Error",
        description: `Failed to ${editingCategory ? "update" : "create"} the category.`,
        variant: "destructive",
      });
    }
  };
  
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <h2 className="text-xl font-bold">Categories</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm rounded-md bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-accent w-full md:w-64"
            />
          </div>
          
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </div>
      </div>
      
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Slug</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                  No categories found
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{category.slug}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{category.description || "-"}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleOpenDialog(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteCategory(category.id)}
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
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory 
                ? "Update the details of this category." 
                : "Add a new category to organize your articles."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of this category" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingCategory ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
