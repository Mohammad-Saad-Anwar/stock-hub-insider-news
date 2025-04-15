
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export class ArticleValidation {
  private static createSchema = Joi.object({
    title: Joi.string().required().min(5).max(200),
    content: Joi.string().required().min(20),
    summary: Joi.string().required().min(10).max(500),
    author: Joi.string().required(),
    category: Joi.string().required(),
    imageUrl: Joi.string().uri().optional(),
    featured: Joi.boolean().optional(),
    tags: Joi.array().items(Joi.string()).optional()
  });

  private static updateSchema = Joi.object({
    title: Joi.string().min(5).max(200).optional(),
    content: Joi.string().min(20).optional(),
    summary: Joi.string().min(10).max(500).optional(),
    author: Joi.string().optional(),
    category: Joi.string().optional(),
    imageUrl: Joi.string().uri().optional(),
    featured: Joi.boolean().optional(),
    tags: Joi.array().items(Joi.string()).optional()
  });

  public static validateCreate(req: Request, res: Response, next: NextFunction): void {
    const { error } = ArticleValidation.createSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    
    next();
  }

  public static validateUpdate(req: Request, res: Response, next: NextFunction): void {
    const { error } = ArticleValidation.updateSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    
    next();
  }
}
