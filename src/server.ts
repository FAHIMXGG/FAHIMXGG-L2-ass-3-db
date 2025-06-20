import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
