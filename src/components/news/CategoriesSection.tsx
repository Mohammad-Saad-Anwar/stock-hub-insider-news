
import { Link } from "react-router-dom";
import { categories } from "@/data/mockNews";

export function CategoriesSection() {
  return (
    <section className="my-12">
      <h2 className="section-title">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="p-6 bg-card border border-border rounded-lg text-center hover:border-accent transition-colors duration-200"
          >
            <h3 className="font-heading font-medium">{category}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
