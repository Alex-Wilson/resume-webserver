// src/controllers/resourceController.js

import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it'; // <-- Import MarkdownIt directly here

// Import our manifest and slugMap from the ContentService
import { manifest, slugMap } from '../services/contentService.js';

// Initialize MarkdownIt once for the controller
const md = new MarkdownIt();

/**
 * The "Traffic Cop" Dispatcher.
 * This function is the primary entry point for all resource-related requests
 * from `resourceRoutes.js`. It determines whether the URL identifier corresponds
 * to a category or a specific article, and dispatches to the appropriate renderer.
 */
export function renderPageDispatcher(req, res, next) {
  // If slugIdentifier exists, it's an article. Otherwise, it's the category base path.
  const identifier = req.params.slugIdentifier;

  // The category is the *base* of where the router was mounted (e.g., 'math', 'certs')
  const categoryBase = req.baseUrl.substring(1); // Remove leading '/'

  // If there's no slugIdentifier, it's a request for the category's landing page (e.g., /math)
  if (!identifier) {
    // Check if categoryBase is a valid category
    if (manifest[categoryBase]) {
      req.params.category = categoryBase; // Set category param for renderCategoryPage
      return renderCategoryPage(req, res, next);
    } else {
      // If the base itself isn't a category, it's a 404
      const err = new Error('Category Not Found');
      err.status = 404;
      return next(err);
    }
  }

  if (slugMap[identifier]) {
    // And ensure it belongs to the correct category base if mounted
    if (slugMap[identifier].category === categoryBase) {
      req.params.category = categoryBase;       // Ensure category is correct
      req.params.slug = identifier;             // Set slug param for renderResourcePage
      return renderResourcePage(req, res, next);
    } else {
      // Slug exists but not under this category path (e.g., /certs/pre-algebra)
      const err = new Error('Resource Not Found in this category');
      err.status = 404;
      return next(err);
    }
  }

  // If we reach here, no category or article matched.
  const err = new Error('Resource or Category Not Found');
  err.status = 404;
  return next(err);
}

/**
 * Renders the page for a specific category, listing all its articles.
 * This function is called by `renderPageDispatcher` when a category URL is matched.
 * Data source: `manifest`
 */
export function renderCategoryPage(req, res, next) {
  const category = req.params.category;
  const categoryData = manifest[category];
  const articles = categoryData.articles || [];
  const sortingOptions = categoryData.sortingOptions || {};
  const filteringOptions = categoryData.filteringOptions || {}; // Also grab filtering options

  const title = category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  res.render('pages/resource-category', {
    title: title,
    category: category,
    content: articles,               // Still passing the articles array as 'content'
    sortingOptions: sortingOptions,  // <--- NEW: Pass the sorting options
    filteringOptions: filteringOptions // <--- NEW: Pass the filtering options
  });
}

/**
 * Renders the page for a single, specific article.
 * This function is called by `renderPageDispatcher` when an article slug URL is matched.
 * Data source: `slugMap` (and then reads the Markdown file)
 */
export function renderResourcePage(req, res, next) {
  const { category, slug } = req.params;

  const articleData = slugMap[slug];

  const filePath = path.join(
    process.cwd(), // This gets the absolute path to your project's root folder
    'public',
    'content',
    category,
    `${slug}.md`,
  );

  try {
    const markdownContent = fs.readFileSync(filePath, 'utf8');

    // --- NOW Using MarkdownIt to convert to HTML ---
    const htmlContent = md.render(markdownContent); // <-- Markdown conversion happens here!

    res.render('pages/article', {
      title: articleData.title,
      content: htmlContent, // Pass the CONVERTED HTML content to the view
      category: articleData.category,
      slug: articleData.slug,
      // Pass any other properties from `articleData` here if your template needs them
    });
  } catch (error) {
    console.error(`Error reading content file for "${slug}" in category "${category}":`, error.message);
    const err = new Error('Resource content file not found');
    err.status = 404;
    return next(err);
  }
}