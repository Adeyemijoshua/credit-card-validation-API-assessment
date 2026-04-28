import express from 'express';
import dotenv from 'dotenv';
import cardRoutes from './routes/card.routes';
import { rateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use('/api/v1/cards', cardRoutes);
app.use(errorHandler);

export default app;