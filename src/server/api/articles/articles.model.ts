
import { Collection, Document, ObjectId } from 'mongodb';
import { IArticle, IArticleCreate, IArticleUpdate } from './articles.interface';
import { getDb } from '../../common/database';

export class ArticleModel {
  private collection: Collection | null = null;
  
  private async getCollection(): Promise<Collection> {
    if (!this.collection) {
      const db = await getDb();
      this.collection = db.collection('articles');
    }
    return this.collection;
  }

  public async findAll(): Promise<IArticle[]> {
    const collection = await this.getCollection();
    return (await collection.find({}).toArray()) as unknown as IArticle[];
  }

  public async findById(id: string): Promise<IArticle | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ id }) as unknown as IArticle;
  }

  public async findByCategory(category: string, limit: number): Promise<IArticle[]> {
    const collection = await this.getCollection();
    return (await collection.find({ category }).limit(limit).toArray()) as unknown as IArticle[];
  }

  public async findLatest(limit: number): Promise<IArticle[]> {
    const collection = await this.getCollection();
    return (await collection.find({}).sort({ date: -1 }).limit(limit).toArray()) as unknown as IArticle[];
  }

  public async findFeatured(limit: number): Promise<IArticle[]> {
    const collection = await this.getCollection();
    return (await collection.find({ featured: true }).limit(limit).toArray()) as unknown as IArticle[];
  }

  public async create(article: IArticleCreate): Promise<IArticle> {
    const collection = await this.getCollection();
    
    const now = new Date().toISOString();
    const newArticle: IArticle = {
      ...article,
      id: `article-${Date.now()}`,
      featured: article.featured || false,
      date: now,
      updatedAt: now
    };
    
    await collection.insertOne(newArticle as unknown as Document);
    return newArticle;
  }

  public async update(id: string, article: IArticleUpdate): Promise<IArticle | null> {
    const collection = await this.getCollection();
    
    const updatedArticle = {
      ...article,
      updatedAt: new Date().toISOString()
    };
    
    await collection.updateOne({ id }, { $set: updatedArticle });
    return this.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount === 1;
  }
  
  public async seed(articles: IArticle[]): Promise<void> {
    const collection = await this.getCollection();
    const count = await collection.countDocuments();
    
    if (count === 0) {
      await collection.insertMany(articles as unknown as Document[]);
    }
  }
}
