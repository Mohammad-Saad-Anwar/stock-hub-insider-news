
import { Request, Response } from 'express';
import { CategoryService } from './categories.service';
import { ICategoryCreate, ICategoryUpdate } from './categories.interface';

export class CategoryController {
  private categoryService: CategoryService;
  
  constructor() {
    this.categoryService = new CategoryService();
  }

  public getAllCategories = async (_req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error getting all categories:', error);
      res.status(500).json({ message: 'Failed to get categories' });
    }
  };

  public getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const category = await this.categoryService.getCategoryById(id);
      
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      
      res.status(200).json(category);
    } catch (error) {
      console.error(`Error getting category by id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to get category' });
    }
  };

  public getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const slug = req.params.slug;
      const category = await this.categoryService.getCategoryBySlug(slug);
      
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      
      res.status(200).json(category);
    } catch (error) {
      console.error(`Error getting category by slug ${req.params.slug}:`, error);
      res.status(500).json({ message: 'Failed to get category by slug' });
    }
  };

  public createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryData = req.body as ICategoryCreate;
      const newCategory = await this.categoryService.createCategory(categoryData);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Failed to create category' });
    }
  };

  public updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const categoryData = req.body as ICategoryUpdate;
      
      const updatedCategory = await this.categoryService.updateCategory(id, categoryData);
      
      if (!updatedCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(`Error updating category with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to update category' });
    }
  };

  public deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deleted = await this.categoryService.deleteCategory(id);
      
      if (!deleted) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(`Error deleting category with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Failed to delete category' });
    }
  };
}
