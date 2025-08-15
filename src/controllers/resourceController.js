// src/controllers/resourceController.js

import * as contentService from '../services/contentService.js';

/**
 * Renders a category landing page (e.g., /math).
 *
 * This function is triggered when a user visits a URL like `/math`.
 * 1. It extracts the category name ('math') from the URL parameters.
 * 2. It calls `contentService.getArticlesByCategory('math')` to get the
 *    structured data (e.g., { Algebra: [...], Calculus: [...] }).
 * 3. If any content is found, it renders the `resource-category.pug` template,
 *    passing the title and the structured content to it.
 * 4. If no content is found for that category, it calls `next()` to proceed
 *    to the 404 error handler.
 */
export function renderCategoryPage(req, res, next) {
  const category = req.params.category;
  const structuredContent = contentService.getArticlesByCategory(category);

  if (Object.keys(structuredContent).length > 0) {
    res.render('pages/resource-category', {
      title: category
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      category: category,
      content: structuredContent,
    });
  } else {
    next();
  }
}

/**
 * Renders a single resource page (e.g., /math/algebra/pre-algebra).
 *
 * This function is triggered for more specific URLs.
 * 1. It gets the `category` ('math') and the rest of the `slug` ('algebra/pre-algebra')
 *    from the URL parameters.
 * 2. It combines them to recreate the full, unique slug: 'math/algebra/pre-algebra'.
 * 3. It uses `contentService.getArticleBySlug()` to find that specific article in the cache.
 * 4. If the article is found, it renders the existing `article.pug` template with the
 *    article's title and HTML content.
 * 5. If no article with that slug exists, it calls `next()` to trigger the 404 handler.
 */
export function renderResourcePage(req, res, next) {
  const { category, slug } = req.params;
  const fullSlug = `${category}/${slug}`;

  const article = contentService.getArticleBySlug(fullSlug);

  if (article) {
    res.render('pages/article', {
      title: article.title,
      content: article.html,
    });
  } else {
    next();
  }
}