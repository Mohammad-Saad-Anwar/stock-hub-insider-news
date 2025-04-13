
import { newsArticles } from '@/data/mockNews';

// Client-side implementations using mock data
const articles = [...newsArticles];

/**
 * Get all articles (client-side mock implementation)
 */
export async function getAllArticles() {
  try {
    return articles;
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
}

/**
 * Get featured articles (client-side mock implementation)
 */
export async function getFeaturedArticles() {
  try {
    return articles.filter(article => article.featured).slice(0, 5);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}

/**
 * Get latest articles (client-side mock implementation)
 */
export async function getLatestArticles(limit = 10) {
  try {
    // Sort by date (assuming articles have date property)
    return [...articles]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}

/**
 * Get articles by category (client-side mock implementation)
 */
export async function getArticlesByCategory(category, limit = 10) {
  try {
    return articles
      .filter(article => article.category === category)
      .slice(0, limit);
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    return [];
  }
}

/**
 * Get article by ID (client-side mock implementation)
 */
export async function getArticleById(id) {
  try {
    return articles.find(article => article.id === id) || null;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return null;
  }
}

/**
 * Create new article (client-side mock implementation)
 */
export async function createArticle(articleData) {
  try {
    // Generate a unique ID
    const newId = `article-${Date.now()}`;
    const newArticle = {
      ...articleData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    articles.push(newArticle);
    return { success: true, id: newId };
  } catch (error) {
    console.error('Error creating article:', error);
    return { success: false, error };
  }
}

/**
 * Update article (client-side mock implementation)
 */
export async function updateArticle(id, articleData) {
  try {
    const index = articles.findIndex(article => article.id === id);
    if (index !== -1) {
      articles[index] = {
        ...articles[index],
        ...articleData,
        updatedAt: new Date().toISOString()
      };
      return { success: true, modifiedCount: 1 };
    }
    return { success: false, modifiedCount: 0 };
  } catch (error) {
    console.error(`Error updating article with ID ${id}:`, error);
    return { success: false, error };
  }
}

/**
 * Delete article (client-side mock implementation)
 */
export async function deleteArticle(id) {
  try {
    const initialLength = articles.length;
    const newArticles = articles.filter(article => article.id !== id);
    articles.length = 0;
    articles.push(...newArticles);
    return { success: initialLength > articles.length };
  } catch (error) {
    console.error(`Error deleting article with ID ${id}:`, error);
    return { success: false, error };
  }
}

/**
 * Initialize mock data (only for client-side implementation)
 */
export async function initializeDatabase() {
  console.log('Using client-side mock implementation');
  return { success: true };
}
