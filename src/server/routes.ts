
import { Router } from 'express';
import articlesRoutes from './api/articles/articles.routes';

const router = Router();

router.use('/articles', articlesRoutes);

// Health check endpoint
router.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router;
