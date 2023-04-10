import express, { Application } from 'express';
import morgan from 'morgan';

import mainRoutes from './routes/main';

const app: Application = express();

// Settings
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));

// Routes
app.use(mainRoutes);

export default app;