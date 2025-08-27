// src/routes/resourceRoutes.js

import express from 'express';
import * as resourceController from '../controllers/resourceController.js';

const router = express.Router();

// Route for the category landing page (e.g., /math, /certs)
// This will match the base path when mounted, like '/math' becomes '/' here.
router.get('/', resourceController.renderPageDispatcher);

// Route for a specific article (e.g., /math/pre-algebra, /certs/network+)
// This will match the slug, like '/pre-algebra' when mounted under '/math'.
router.get('/:slugIdentifier', resourceController.renderPageDispatcher);

export default router;