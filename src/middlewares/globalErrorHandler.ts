import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';
import { Error as MongooseError } from 'mongoose';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  let statusCode = 500;
  let message = 'Something went wrong on the server.';
  let errorDetail: any = err.message || 'An unexpected error occurred.';

  if (err instanceof MongooseError.ValidationError) {
    statusCode = 400; 
    message = 'Validation failed';

    const errorsCopy: any = JSON.parse(JSON.stringify(err.errors));

    for (const key in errorsCopy) {
      if (errorsCopy.hasOwnProperty(key) && errorsCopy[key].properties) {
        delete errorsCopy[key].properties.path;
        delete errorsCopy[key].properties.value;
      }
    }

    errorDetail = {
      name: err.name,
      errors: errorsCopy
    };
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value entered.';
    const field = Object.keys(err.keyValue)[0];
    errorDetail = `A book with this ${field} already exists.`;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID provided.';
    errorDetail = `Invalid format for ${err.path}: ${err.value}`;
  } else if (err.name === 'Error' && err.message.includes('not found')) {
    statusCode = 404;
    message = err.message;
    errorDetail = err.message;
  } else if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Authentication error';
    errorDetail = err.message;
  }

  res.status(statusCode).json(errorResponse(message, errorDetail));
};

export default globalErrorHandler;
