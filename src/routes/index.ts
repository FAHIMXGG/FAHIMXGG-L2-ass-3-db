import { Router } from 'express';
import bookRoutes from './book.routes';
import borrowRoutes from './borrow.routes';

const router = Router();

router.use('/books', bookRoutes);
router.use('/borrow', borrowRoutes);

export default router;
