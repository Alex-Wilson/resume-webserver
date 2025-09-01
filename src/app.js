// src/app.js

import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import mainRouter from './routes/mainRoutes.js';
import resourceRouter from './routes/resourceRoutes.js';

import { initializeContent } from './services/contentService.js';

// --- Initialize Content Cache on Startup ---
initializeContent();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// --- App Configuration ---
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- Routes ---

// 1. Main application routes are mounted first.
app.use('/', mainRouter);

// 2. The generic resource router handles all dynamic content categories.
app.use('/math', resourceRouter);
app.use('/certifications', resourceRouter);
app.use('/leetcode', resourceRouter);
app.use('/deep-ml', resourceRouter);


// --- Error Handlers ---

// 3. 404 Handler: This runs if a request does not match any route in the routers above.
app.use((req, res, next) => {
  res.status(404).render('pages/404', { title: 'Not Found' });
});

// 4. 500 Handler: This runs if any route handler calls `next(error)`.
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).render('pages/500', { title: 'Server Error' });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});