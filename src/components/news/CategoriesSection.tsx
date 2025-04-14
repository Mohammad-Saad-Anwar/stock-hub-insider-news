
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "@/api/categories";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
        // Try to set mock data if available
        try {
          import('@/data/mockNews').then(({ categories }) => {
            setCategories(categories.map((name, index) => ({
              id: `category-${index + 1}`,
              name,
              slug: name.toLowerCase().replace(/\s+/g, '-'),
            })));
          });
        } catch (mockError) {
          console.error("Failed to load mock data:", mockError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="my-12">
        <h2 className="section-title">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="p-6 bg-card animate-pulse border border-border rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-12">
        <h2 className="section-title">Categories</h2>
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Note</p>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-12">
      <h2 className="section-title">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="p-6 bg-card border border-border rounded-lg text-center hover:border-accent transition-colors duration-200"
          >
            <h3 className="font-heading font-medium">{category.name}</h3>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link to="/admin/categories">Manage Categories</Link>
        </Button>
      </div>
    </section>
  );
}
