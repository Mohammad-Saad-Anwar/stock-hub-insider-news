
import { ArticleModel } from './articles.model';
import { IArticle, IArticleCreate, IArticleUpdate } from './articles.interface';
import { newsArticles } from '../../../data/mockNews';

export class ArticleService {
  private articleModel: ArticleModel;

  constructor() {
    this.articleModel = new ArticleModel();
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    try {
      // Convert the newsArticles to match IArticle interface
      const articlesData: IArticle[] = newsArticles.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        summary: article.excerpt, // map excerpt to summary
        author: article.author,
        category: article.category,
        imageUrl: article.image, // map image to imageUrl
        featured: article.featured,
        date: article.date,
        updatedAt: article.date, // Use the same date for updatedAt
        tags: article.tags,
        readTime: Math.ceil(article.content.split(' ').length / 200) // Estimate read time
      }));
      
      await this.articleModel.seed(articlesData);
      console.log('Articles collection seeded if empty');
    } catch (error) {
      console.error('Failed to seed articles collection:', error);
    }
  }

  public async getAllArticles(): Promise<IArticle[]> {
    return this.articleModel.findAll();
  }

  public async getArticleById(id: string): Promise<IArticle | null> {
    return this.articleModel.findById(id);
  }

  public async getArticlesByCategory(category: string, limit = 10): Promise<IArticle[]> {
    return this.articleModel.findByCategory(category, limit);
  }

  public async getLatestArticles(limit = 10): Promise<IArticle[]> {
    return this.articleModel.findLatest(limit);
  }

  public async getFeaturedArticles(limit = 5): Promise<IArticle[]> {
    return this.articleModel.findFeatured(limit);
  }

  public async createArticle(articleData: IArticleCreate): Promise<IArticle> {
    return this.articleModel.create(articleData);
  }

  public async updateArticle(id: string, articleData: IArticleUpdate): Promise<IArticle | null> {
    return this.articleModel.update(id, articleData);
  }

  public async deleteArticle(id: string): Promise<boolean> {
    return this.articleModel.delete(id);
  }
}
