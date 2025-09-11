// src/controllers/resourceController.js

import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

import { manifest, slugMap } from '../services/contentService.js';

const md = new MarkdownIt();

export function renderPageDispatcher(req, res, next) {
  const identifier = req.params.slugIdentifier;
  const categoryBase = req.baseUrl.substring(1);

  if (!identifier) {
    if (manifest[categoryBase]) {
      req.params.category = categoryBase;
      return renderCategoryPage(req, res, next);
    } else {
      const err = new Error('Category Not Found');
      err.status = 404;
      return next(err);
    }
  }

  if (slugMap[identifier]) {
    if (slugMap[identifier].category === categoryBase) {
      req.params.category = categoryBase;
      req.params.slug = identifier;
      return renderResourcePage(req, res, next);
    } else {
      const err = new Error('Resource Not Found in this category');
      err.status = 404;
      return next(err);
    }
  }

  const err = new Error('Resource or Category Not Found');
  err.status = 404;
  return next(err);
}

/**
 * Renders the page for a specific category, dynamically selecting the template.
 */
export function renderCategoryPage(req, res, next) {
  const category = req.params.category;

  // *** CRITICAL CHANGE: Get all relevant data from the manifest entry ***
  const categoryData = manifest[category];
  const articles = categoryData.articles || [];
  const sortingOptions = categoryData.sortingOptions || {};
  const filteringOptions = categoryData.filteringOptions || {};
  // NEW: Extract displayType and tableColumns from manifest
  const templateName = categoryData.template || 'resource-category'; // Use specified template, default to 'resource-category'
  const displayType = categoryData.displayType || 'list'; // Use specified displayType, default to 'list'
  const tableColumns = categoryData.tableColumns || []; // Use specified tableColumns

  const title = category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  // *** CRITICAL FIX: Dynamically select the Pug template to render ***
  res.render(`pages/${templateName}`, { // Renders 'pages/resource-category' or 'pages/problem-category'
    title: title,
    category: category,
    content: articles,
    sortingOptions: sortingOptions,
    filteringOptions: filteringOptions,
    displayType: displayType,   // NEW: Pass displayType to template
    tableColumns: tableColumns  // NEW: Pass tableColumns to template
  });
}

export function renderResourcePage(req, res, next) {
  const { category, slug } = req.params;

  const articleData = slugMap[slug];

  const filePath = path.join(
    process.cwd(),
    'public',
    'content',
    category,
    `${slug}.md`,
  );

  try {
    const markdownContent = fs.readFileSync(filePath, 'utf8');
    const htmlContent = md.render(markdownContent);

    res.render('pages/article', {
      title: articleData.title,
      content: htmlContent,
      category: articleData.category,
      slug: articleData.slug,
    });
  } catch (error) {
    console.error(`Error reading content file for "${slug}" in category "${category}":`, error.message);
    const err = new Error('Resource content file not found');
    err.status = 404;
    return next(err);
  }
}