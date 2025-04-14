
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export class CategoryValidation {
  private static createSchema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    description: Joi.string().allow('').optional()
  });

  private static updateSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    description: Joi.string().allow('').optional()
  }).min(1);

  public static validateCreate = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = CategoryValidation.createSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    
    next();
  };

  public static validateUpdate = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = CategoryValidation.updateSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    
    next();
  };
}
