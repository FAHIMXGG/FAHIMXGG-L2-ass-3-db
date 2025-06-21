import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import allRoutes from './routes';
import { successResponse } from './utils/apiResponse';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors()); 
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json(successResponse("Welcome to my Library Management API!", null));
});

app.use('/api', allRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found',
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  });
});

app.use(globalErrorHandler);

export default app;
