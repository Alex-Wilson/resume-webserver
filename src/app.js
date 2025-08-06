// app.js

// Use ES module imports for a modern setup
import 'dotenv/config'; // Loads .env file automatically
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import your new router (WITH the .js extension)
import pageRouter from './routes/pageRoutes.js';

// Since we are using ES Modules, __dirname is not available. This is the workaround.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// --- App Configuration ---

// 1. Set Pug as the templating engine.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 2. Serve static files from the "public" directory.
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- Routes ---

// 3. Use the imported router for all page-related routes.
app.use('/', pageRouter);

// --- Error Handling ---

// 4. Handle 404 Not Found errors.
app.use((req, res, next) => {
  res.status(404).render('pages/404', {
    title: 'Page Not Found',
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});