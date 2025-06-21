import { Schema, model, Document } from 'mongoose';
import { IBook } from './Book';

export interface IBorrow extends Document {
  book: Schema.Types.ObjectId | IBook;
  quantity: number; 
  dueDate: Date; 
  createdAt: Date;
  updatedAt: Date;
}

const BorrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book ID is mandatory'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is mandatory'], 
      min: [1, 'Quantity must be a positive number'], 
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is mandatory'], 
      validate: {
        validator: function (v: Date) {
          return v > new Date(); 
        },
        message: 'Due date must be in the future',
      },
    },
  },
  {
    timestamps: true, 
  }
);

export default model<IBorrow>('Borrow', BorrowSchema);
