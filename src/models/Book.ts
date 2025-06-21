import { Schema, model, Document, Query } from 'mongoose';

export enum BookGenre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY',
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: BookGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is mandatory'],
      trim: true, 
    },
    author: {
      type: String,
      required: [true, 'Author is mandatory'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is mandatory'],
      enum: {
        values: Object.values(BookGenre),
        message: 'Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY',
      },
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is mandatory'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, 'Copies are mandatory'],
      min: [0, 'Copies must be a non-negative number'],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


BookSchema.pre('save', function (next) {
  if (this.isModified('copies')) { 
    if (this.copies === 0) {
      this.available = false; 
    } else if (this.copies > 0 && this.available === false) {
      this.available = true;
    }
  }
  next(); 
});



export default model<IBook>('Book', BookSchema);
