
import { CategoryModel } from './categories.model';
import { ICategory, ICategoryCreate, ICategoryUpdate } from './categories.interface';
import { categories } from '../../../data/mockNews';

export class CategoryService {
  private categoryModel: CategoryModel;

  constructor() {
    this.categoryModel = new CategoryModel();
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    try {
      // Convert the categories to match ICategory interface
      const categoriesData: ICategory[] = categories.map((name, index) => {
        const now = new Date().toISOString();
        return {
          id: `category-${index + 1}`,
          name: name,
          slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          description: `Articles about ${name}`,
          createdAt: now,
          updatedAt: now
        };
      });
      
      await this.categoryModel.seed(categoriesData);
      console.log('Categories collection seeded if empty');
    } catch (error) {
      console.error('Failed to seed categories collection:', error);
    }
  }

  public async getAllCategories(): Promise<ICategory[]> {
    return this.categoryModel.findAll();
  }

  public async getCategoryById(id: string): Promise<ICategory | null> {
    return this.categoryModel.findById(id);
  }

  public async getCategoryBySlug(slug: string): Promise<ICategory | null> {
    return this.categoryModel.findBySlug(slug);
  }

  public async createCategory(categoryData: ICategoryCreate): Promise<ICategory> {
    return this.categoryModel.create(categoryData);
  }

  public async updateCategory(id: string, categoryData: ICategoryUpdate): Promise<ICategory | null> {
    return this.categoryModel.update(id, categoryData);
  }

  public async deleteCategory(id: string): Promise<boolean> {
    return this.categoryModel.delete(id);
  }
}
