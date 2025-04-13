
import { Router } from 'express';
import { ArticleController } from './articles.controller';
import { ArticleValidation } from './articles.validation';
import { AuthMiddleware } from '../../common/auth';

const router = Router();
const articleController = new ArticleController();

// Public routes
router.get('/', articleController.getAllArticles);
router.get('/latest', articleController.getLatestArticles);
router.get('/featured', articleController.getFeaturedArticles);
router.get('/category/:category', articleController.getArticlesByCategory);
router.get('/:id', articleController.getArticleById);

// Protected routes (require authentication)
router.post('/', 
  AuthMiddleware.authenticate, 
  AuthMiddleware.authorizeAdmin,
  ArticleValidation.validateCreate,
  articleController.createArticle
);

router.put('/:id', 
  AuthMiddleware.authenticate, 
  AuthMiddleware.authorizeAdmin,
  ArticleValidation.validateUpdate, 
  articleController.updateArticle
);

router.delete('/:id', 
  AuthMiddleware.authenticate, 
  AuthMiddleware.authorizeAdmin, 
  articleController.deleteArticle
);

export default router;
