import { Request, Response } from 'express';
import Book, { BookGenre } from '../models/Book';
import catchAsync from '../utils/catchAsync';
import { successResponse, errorResponse } from '../utils/apiResponse';



export const createBook = catchAsync(async (req: Request, res: Response) => {
  const newBook = new Book(req.body); 
  const savedBook = await newBook.save(); 

  const responseData = {
    _id: savedBook._id,
    title: savedBook.title,
    author: savedBook.author,
    genre: savedBook.genre,
    isbn: savedBook.isbn,
    description: savedBook.description,
    copies: savedBook.copies,
    available: savedBook.available,
    createdAt: savedBook.createdAt,
    updatedAt: savedBook.updatedAt,
  };

  res.status(201).json(successResponse('Book created successfully', responseData));
});

export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const { filter, sortBy, sort, limit } = req.query;

  let query: any = {}; 
  let sortOptions: { [key: string]: 'asc' | 'desc' | 1 | -1 } = {};

  if (filter && typeof filter === 'string' && Object.values(BookGenre).includes(filter.toUpperCase() as BookGenre)) {
    query.genre = filter.toUpperCase(); 
  }

  if (sortBy && typeof sortBy === 'string') {
    const sortOrder = (sort === 'desc' || sort === '-1') ? -1 : 1;
    sortOptions[sortBy] = sortOrder;
  } else {
    sortOptions.createdAt = -1;
  }

  const parsedLimit = limit ? parseInt(limit as string) : 10;
  const actualLimit = Math.max(1, parsedLimit);

  const books = await Book.find(query)
    .sort(sortOptions)
    .limit(actualLimit);

  res.status(200).json(successResponse('Books retrieved successfully', books));
});

export const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params; 
  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json(errorResponse('Book not found', 'Book with the given ID does not exist.'));
  }

  res.status(200).json(successResponse('Book retrieved successfully', book));
});

export const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params; 
  const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBook) {
    return res.status(404).json(errorResponse('Book not found', 'Book with the given ID does not exist.'));
  }

  res.status(200).json(successResponse('Book updated successfully', updatedBook));
});

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const deletedBook = await Book.findByIdAndDelete(bookId);

  if (!deletedBook) {
    return res.status(404).json(errorResponse('Book not found', 'Book with the given ID does not exist.'));
  }

  res.status(200).json(successResponse('Book deleted successfully', null));
});
