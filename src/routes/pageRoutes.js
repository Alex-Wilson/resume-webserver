// src/routes/pageRoutes.js

import express from 'express';
import * as pageController from '../controllers/pageController.js';

const router = express.Router();

// Route for the main list of articles (e.g., /articles)
router.get('/', pageController.renderArticleListPage);

// Route for a single article with a dynamic slug (e.g., /articles/my-first-post)
// This must come AFTER any other specific routes in this file.
router.get('/:slug', pageController.renderSingleArticle);

export default router;