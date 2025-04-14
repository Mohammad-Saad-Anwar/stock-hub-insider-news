
import { Collection } from 'mongodb';
import { ICategory, ICategoryCreate, ICategoryUpdate } from './categories.interface';
import { getDb } from '../../common/database';

export class CategoryModel {
  private collection: Collection | null = null;
  
  private async getCollection(): Promise<Collection> {
    if (!this.collection) {
      const db = await getDb();
      this.collection = db.collection('categories');
    }
    return this.collection;
  }

  public async findAll(): Promise<ICategory[]> {
    const collection = await this.getCollection();
    return (await collection.find({}).sort({ name: 1 }).toArray()) as unknown as ICategory[];
  }

  public async findById(id: string): Promise<ICategory | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ id }) as unknown as ICategory;
  }

  public async findBySlug(slug: string): Promise<ICategory | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ slug }) as unknown as ICategory;
  }

  public async create(category: ICategoryCreate): Promise<ICategory> {
    const collection = await this.getCollection();
    
    const now = new Date().toISOString();
    const slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const newCategory: ICategory = {
      id: `category-${Date.now()}`,
      name: category.name,
      slug: slug,
      description: category.description || '',
      createdAt: now,
      updatedAt: now
    };
    
    await collection.insertOne(newCategory as any);
    return newCategory;
  }

  public async update(id: string, category: ICategoryUpdate): Promise<ICategory | null> {
    const collection = await this.getCollection();
    
    const updatedFields: any = {
      ...category,
      updatedAt: new Date().toISOString()
    };
    
    // If name is updated, update slug as well
    if (category.name) {
      updatedFields.slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    await collection.updateOne({ id }, { $set: updatedFields });
    return this.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount === 1;
  }
  
  public async seed(categories: ICategory[]): Promise<void> {
    const collection = await this.getCollection();
    const count = await collection.countDocuments();
    
    if (count === 0) {
      await collection.insertMany(categories as any[]);
    }
  }
}
