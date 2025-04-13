
import { newsArticles } from '@/data/mockNews';
import { connectToDatabase } from '@/server/mongodb';

// Fallback to client-side mock if server-side fails
const mockArticles = [...newsArticles];

/**
 * Get all articles from MongoDB or fallback to mock data
 */
export async function getAllArticles() {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection("articles").find({}).toArray();
    
    if (articles && articles.length > 0) {
      return articles;
    } else {
      console.log("No articles found in database, using mock data");
      return mockArticles;
    }
  } catch (error) {
    console.error('Error fetching all articles:', error);
    console.log("Using mock data as fallback");
    return mockArticles;
  }
}

/**
 * Get featured articles from MongoDB or fallback to mock
 */
export async function getFeaturedArticles() {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection("articles")
      .find({ featured: true })
      .limit(5)
      .toArray();
    
    if (articles && articles.length > 0) {
      return articles;
    } else {
      return mockArticles.filter(article => article.featured).slice(0, 5);
    }
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return mockArticles.filter(article => article.featured).slice(0, 5);
  }
}

/**
 * Get latest articles from MongoDB or fallback to mock
 */
export async function getLatestArticles(limit = 10) {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection("articles")
      .find({})
      .sort({ date: -1 })
      .limit(limit)
      .toArray();
    
    if (articles && articles.length > 0) {
      return articles;
    } else {
      return [...mockArticles]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    }
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [...mockArticles]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
}

/**
 * Get articles by category from MongoDB or fallback to mock
 */
export async function getArticlesByCategory(category, limit = 10) {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection("articles")
      .find({ category })
      .limit(limit)
      .toArray();
    
    if (articles && articles.length > 0) {
      return articles;
    } else {
      return mockArticles
        .filter(article => article.category === category)
        .slice(0, limit);
    }
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    return mockArticles
      .filter(article => article.category === category)
      .slice(0, limit);
  }
}

/**
 * Get article by ID from MongoDB or fallback to mock
 */
export async function getArticleById(id) {
  try {
    const { db } = await connectToDatabase();
    const article = await db.collection("articles").findOne({ id });
    return article || mockArticles.find(article => article.id === id);
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return mockArticles.find(article => article.id === id) || null;
  }
}

/**
 * Create new article in MongoDB
 */
export async function createArticle(articleData) {
  try {
    const { db } = await connectToDatabase();
    // Generate a unique ID
    const newId = `article-${Date.now()}`;
    const newArticle = {
      ...articleData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await db.collection("articles").insertOne(newArticle);
    return { success: true, id: newId };
  } catch (error) {
    console.error('Error creating article:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update article in MongoDB
 */
export async function updateArticle(id, articleData) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("articles").updateOne(
      { id },
      { 
        $set: { 
          ...articleData, 
          updatedAt: new Date().toISOString() 
        } 
      }
    );
    
    return { 
      success: result.matchedCount > 0, 
      modifiedCount: result.modifiedCount 
    };
  } catch (error) {
    console.error(`Error updating article with ID ${id}:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete article from MongoDB
 */
export async function deleteArticle(id) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("articles").deleteOne({ id });
    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error(`Error deleting article with ID ${id}:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * Initialize database with mock data if empty
 */
export async function initializeDatabase() {
  try {
    const { db } = await connectToDatabase();
    // Check if there are any articles
    const count = await db.collection("articles").countDocuments();
    
    // If database is empty, seed it with mock data
    if (count === 0) {
      console.log("Database is empty, seeding with mock data");
      await db.collection("articles").insertMany(mockArticles);
      return { success: true, message: "Database seeded with mock data" };
    }
    
    return { success: true, message: "Database already contains data" };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error: error.message };
  }
}
