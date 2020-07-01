import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import './database';
import middleweres from './middlewares';

// Importing Routes
import indexRoutes from './routes/index.routing';
import authRoutes from './routes/auth.routing';
import userRoutes from './routes/user.routing';

const app = express();

// Middlewares
middleweres(app);

// Routes
app.use('/api', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

export default app;
