
import { categories } from '@/data/mockNews';

// Check if running in a browser environment
const isBrowser = typeof window !== 'undefined';

// Always use mock data in browser environment
const mockCategories = categories.map((name, index) => ({
  id: `category-${index + 1}`,
  name: name,
  slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  description: `Articles about ${name}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));

// Only import MongoDB functions in non-browser environments
let connectToDatabase;
if (!isBrowser) {
  // Dynamic import to avoid browser issues
  import('@/server/mongodb').then(module => {
    connectToDatabase = module.connectToDatabase;
  }).catch(error => {
    console.error("Failed to import MongoDB module:", error);
  });
}

/**
 * Get all categories from MongoDB or fallback to mock data
 */
export async function getAllCategories() {
  // Always use mock data in browser environment
  if (isBrowser) {
    console.log("Browser environment detected, using mock categories data");
    return mockCategories;
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection failed");
    }
    
    const categories = await db.collection("categories").find({}).sort({ name: 1 }).toArray();
    
    if (categories && categories.length > 0) {
      return categories;
    } else {
      console.log("No categories found in database, using mock data");
      return mockCategories;
    }
  } catch (error) {
    console.error('Error fetching all categories:', error);
    console.log("Using mock data as fallback");
    return mockCategories;
  }
}

/**
 * Get category by slug from MongoDB or fallback to mock
 */
export async function getCategoryBySlug(slug) {
  if (isBrowser) {
    return mockCategories.find(category => category.slug === slug);
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection failed");
    }
    
    const category = await db.collection("categories").findOne({ slug });
    return category || mockCategories.find(category => category.slug === slug);
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return mockCategories.find(category => category.slug === slug) || null;
  }
}

/**
 * Create new category in MongoDB
 */
export async function createCategory(categoryData) {
  if (isBrowser) {
    console.log("Mock creating category:", categoryData);
    const newId = `category-${Date.now()}`;
    return { 
      success: true, 
      id: newId,
      category: {
        id: newId,
        name: categoryData.name,
        slug: categoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: categoryData.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection failed");
    }
    
    // Generate a unique ID
    const newId = `category-${Date.now()}`;
    const slug = categoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const newCategory = {
      id: newId,
      name: categoryData.name,
      slug: slug,
      description: categoryData.description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await db.collection("categories").insertOne(newCategory);
    return { success: true, id: newId, category: newCategory };
  } catch (error) {
    console.error('Error creating category:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update category in MongoDB
 */
export async function updateCategory(id, categoryData) {
  if (isBrowser) {
    console.log("Mock updating category:", id, categoryData);
    return { success: true, modifiedCount: 1 };
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection failed");
    }
    
    const updateFields = { ...categoryData, updatedAt: new Date().toISOString() };
    
    // If name is updated, update slug as well
    if (categoryData.name) {
      updateFields.slug = categoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    const result = await db.collection("categories").updateOne(
      { id },
      { $set: updateFields }
    );
    
    return { 
      success: result.matchedCount > 0, 
      modifiedCount: result.modifiedCount 
    };
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete category from MongoDB
 */
export async function deleteCategory(id) {
  if (isBrowser) {
    console.log("Mock deleting category:", id);
    return { success: true };
  }

  try {
    const { db } = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection failed");
    }
    
    const result = await db.collection("categories").deleteOne({ id });
    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    return { success: false, error: error.message };
  }
}
