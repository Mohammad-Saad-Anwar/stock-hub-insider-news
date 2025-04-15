
import { Request, Response } from 'express';
import { ArticleService } from './articles.service';
import { IArticleCreate, IArticleUpdate } from './articles.interface';

export class ArticleController {
  private articleService: ArticleService;
  
  constructor() {
    this.articleService = new ArticleService();
  }

  public getAllArticles = async (_req: Request, res: Response): Promise<void> => {
    try {
      const articles = await this.articleService.getAllArticles();
      res.status(200).json(articles);
    } catch (error) {
      console.error('Error getting all articles:', error);
      res.status(500).json({ message: 'Failed to get articles' });
    }
  };

  public getArticleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const article = await this.articleService.getArticleById(id);
      
      if (!article) {
        res.status(404).json({ message: 'Article not found' });
        return;
      }
      
      res.status(200).json(article);
    } catch (error) {
      console.error(`Error getting article by id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to get article' });
    }
  };

  public getArticlesByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = req.params.category;
      const limit = Number(req.query.limit) || 10;
      const articles = await this.articleService.getArticlesByCategory(category, limit);
      res.status(200).json(articles);
    } catch (error) {
      console.error(`Error getting articles for category ${req.params.category}:`, error);
      res.status(500).json({ message: 'Failed to get articles by category' });
    }
  };

  public getLatestArticles = async (req: Request, res: Response): Promise<void> => {
    try {
      const limit = Number(req.query.limit) || 10;
      const articles = await this.articleService.getLatestArticles(limit);
      res.status(200).json(articles);
    } catch (error) {
      console.error('Error getting latest articles:', error);
      res.status(500).json({ message: 'Failed to get latest articles' });
    }
  };

  public getFeaturedArticles = async (req: Request, res: Response): Promise<void> => {
    try {
      const limit = Number(req.query.limit) || 5;
      const articles = await this.articleService.getFeaturedArticles(limit);
      res.status(200).json(articles);
    } catch (error) {
      console.error('Error getting featured articles:', error);
      res.status(500).json({ message: 'Failed to get featured articles' });
    }
  };

  public createArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const articleData = req.body as IArticleCreate;
      const newArticle = await this.articleService.createArticle(articleData);
      res.status(201).json(newArticle);
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ message: 'Failed to create article' });
    }
  };

  public updateArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const articleData = req.body as IArticleUpdate;
      
      const updatedArticle = await this.articleService.updateArticle(id, articleData);
      
      if (!updatedArticle) {
        res.status(404).json({ message: 'Article not found' });
        return;
      }
      
      res.status(200).json(updatedArticle);
    } catch (error) {
      console.error(`Error updating article with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to update article' });
    }
  };

  public deleteArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deleted = await this.articleService.deleteArticle(id);
      
      if (!deleted) {
        res.status(404).json({ message: 'Article not found' });
        return;
      }
      
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      console.error(`Error deleting article with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to delete article' });
    }
  };
}
