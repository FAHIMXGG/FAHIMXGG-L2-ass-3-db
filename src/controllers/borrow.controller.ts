// src/controllers/borrow.controller.ts
import { Request, Response } from 'express';
import Book from '../models/Book';
import Borrow from '../models/Borrow';
import catchAsync from '../utils/catchAsync';
import { successResponse, errorResponse } from '../utils/apiResponse';
import mongoose from 'mongoose';

export const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const { book: bookId, quantity, dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json(errorResponse('Invalid Book ID', 'The provided book ID is not a valid MongoDB ObjectId.'));
  }

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json(errorResponse('Book not found', 'Book with the provided ID does not exist.'));
  }

  if (book.copies < quantity) {
    return res.status(400).json(errorResponse('Not enough copies available', `Only ${book.copies} copies of "${book.title}" are available.`));
  }

  book.copies -= quantity;

  await book.save();

  const newBorrow = new Borrow({
    book: bookId,
    quantity,
    dueDate,
  });
  const savedBorrow = await newBorrow.save();

  res.status(201).json(successResponse('Book borrowed successfully', savedBorrow));
});

export const getBorrowedBooksSummary = catchAsync(async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'books', 
        localField: '_id',
        foreignField: '_id',
        as: 'bookDetails',
      },
    },
    {
      $unwind: '$bookDetails',
    },
    {
      $project: {
        _id: 0, 
        book: {
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn', 
        },
        totalQuantity: 1,
      },
    },
  ]);

  res.status(200).json(successResponse('Borrowed books summary retrieved successfully', summary));
});
