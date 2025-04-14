
import { Router } from 'express';
import { CategoryController } from './categories.controller';
import { CategoryValidation } from './categories.validation';
import { AuthMiddleware } from '../../common/auth';

const router = Router();
const categoryController = new CategoryController();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/slug/:slug', categoryController.getCategoryBySlug);

// Protected routes (require authentication)
router.post('/', 
  AuthMiddleware.authenticate, 
  AuthMiddleware.authorizeAdmin,
  CategoryValidation.validateCreate,
  categoryController.createCategory
);

router.put('/:id', 
  AuthMiddleware.authenticate, 
  AuthMiddleware.authorizeAdmin,
  CategoryValidation.validateUpdate, 
  categoryController.updateCategory
);

router.delete('/:id', 
  AuthMiddleware.authenticate, 
  AuthMiddleware.authorizeAdmin, 
  categoryController.deleteCategory
);

export default router;
