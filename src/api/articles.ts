
import { connectToDatabase } from '@/lib/mongodb';
import { newsArticles } from '@/data/mockNews';

/**
 * Initialize the database with mock data if it's empty
 */
export async function initializeDatabase() {
  const { db } = await connectToDatabase();
  const articlesCollection = db.collection('articles');
  
  const count = await articlesCollection.countDocuments();
  
  if (count === 0) {
    console.log('Initializing database with mock data...');
    await articlesCollection.insertMany(newsArticles);
    console.log('Mock data inserted successfully');
  }
}

/**
 * Get all articles
 */
export async function getAllArticles() {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection('articles').find({}).toArray();
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles() {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection('articles')
      .find({ featured: true })
      .limit(5)
      .toArray();
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}

/**
 * Get latest articles
 */
export async function getLatestArticles(limit = 10) {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection('articles')
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: string, limit = 10) {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection('articles')
      .find({ category: category })
      .limit(limit)
      .toArray();
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    return [];
  }
}

/**
 * Get article by ID
 */
export async function getArticleById(id: string) {
  try {
    const { db } = await connectToDatabase();
    const article = await db.collection('articles').findOne({ id });
    return article ? JSON.parse(JSON.stringify(article)) : null;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return null;
  }
}

/**
 * Create new article
 */
export async function createArticle(articleData: any) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('articles').insertOne({
      ...articleData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Error creating article:', error);
    return { success: false, error };
  }
}

/**
 * Update article
 */
export async function updateArticle(id: string, articleData: any) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('articles').updateOne(
      { id },
      {
        $set: {
          ...articleData,
          updatedAt: new Date()
        }
      }
    );
    return { success: result.matchedCount > 0, modifiedCount: result.modifiedCount };
  } catch (error) {
    console.error(`Error updating article with ID ${id}:`, error);
    return { success: false, error };
  }
}

/**
 * Delete article
 */
export async function deleteArticle(id: string) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('articles').deleteOne({ id });
    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error(`Error deleting article with ID ${id}:`, error);
    return { success: false, error };
  }
}
