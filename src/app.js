// src/app.js

import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import mainRouter from './routes/mainRoutes.js';
import pageRouter from './routes/pageRoutes.js';
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

// 1. Main application routes are mounted first at the root level.
//    Handles URLs like: /, /resume, /certifications
app.use('/', mainRouter);

// 2. The article router is mounted at the '/articles' base path.
//    Handles URLs like: /articles, /articles/my-first-post
app.use('/articles', pageRouter);

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