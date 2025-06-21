import { Router } from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.controller';

const router = Router();

router.post('/', createBook);

router.get('/', getAllBooks);

router.get('/:bookId', getBookById);

router.put('/:bookId', updateBook);

router.delete('/:bookId', deleteBook);

export default router;
