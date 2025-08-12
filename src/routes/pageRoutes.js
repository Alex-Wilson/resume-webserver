// src/routes/pageRoutes.js

import express from 'express';
import * as pageController from '../controllers/pageController.js';

const router = express.Router();

// Route for the main list of articles (e.g., /articles)
router.get('/', pageController.renderArticleListPage);

// --- CHANGE: Use a wildcard (*) to capture nested paths in the slug ---
// This will match '/articles/anything/can/go/here' and capture the full
// path in `req.params.slug`.
// This must come AFTER any other specific routes in this file.
router.get('/:slug(*)', pageController.renderSingleArticle);

export default router;