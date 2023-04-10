import express, { Application } from 'express';
import morgan from 'morgan';

import mainRoutes from './routes/main';
import authRoutes from './routes/auth';

const app: Application = express();

// Settings
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', mainRoutes);
app.use('/api/auth', authRoutes);

export default app;