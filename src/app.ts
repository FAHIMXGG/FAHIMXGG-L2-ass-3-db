import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import allRoutes from './routes';

const app: Application = express();

app.use(cors()); 
app.use(express.json());

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

export default app;
