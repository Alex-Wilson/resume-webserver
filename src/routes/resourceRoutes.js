// src/routes/resourceRoutes.js

import express from 'express';
import * as resourceController from '../controllers/resourceController.js';

const router = express.Router();

// --- IMPORTANT: Route order matters! ---
// The more specific route must be defined before the more general one.

/**
 * Route for a single, specific resource page.
 *
 * This route matches URLs that have at least two parts after the domain,
 * for example:
 * - /math/algebra/pre-algebra
 * - /leet-code-writeups/arrays/two-sum
 *
 * It captures the first part as `:category` and EVERYTHING after it as `:slug`.
 * The `(*)` is a wildcard that allows the slug to contain slashes.
 * It directs the request to the `renderResourcePage` controller function.
 */
router.get('/:category/:slug(*)', resourceController.renderResourcePage);

/**
 * Route for a category landing page.
 *
 * This route matches URLs with only one part, for example:
 * - /math
 * - /leet-code-writeups
 *
 * It captures that part as `:category` and directs the request to the
 * `renderCategoryPage` controller function. If this route was placed
 * first, it would incorrectly match a URL like `/math/algebra` and never
 * give the route above a chance to run.
 */
router.get('/:category', resourceController.renderCategoryPage);

export default router;