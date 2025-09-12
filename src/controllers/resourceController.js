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

  const categoryData = manifest[category];
  if (!categoryData) {
      console.error(`Error: Category data for "${category}" not found in manifest.`);
      const err = new Error('Category Data Missing');
      err.status = 500;
      return next(err);
  }

  const articles = categoryData.articles || [];
  const sortingOptions = categoryData.sortingOptions || {};
  const filteringOptions = categoryData.filteringOptions || {};
  
  // NEW: Extract templateName, displayType, tableColumns directly
  const templateName = categoryData.template || 'resource-category'; // Default to resource-category
  const displayType = categoryData.displayType || 'list'; // Default to list
  const tableColumns = categoryData.tableColumns || []; // Default to empty array

  const title = category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  // *** CRITICAL DEBUGGING: Log which template is being selected ***
  console.log(`Rendering category: ${category} with template: pages/${templateName}.pug`);
  console.log(`Display Type: ${displayType}, Table Columns: ${tableColumns.length}`);

  res.render(`pages/${templateName}`, { // Renders 'pages/resource-category' or 'pages/problem-category'
    title: title,
    category: category, // Always pass 'category' for window.currentCategoryIdentifier
    content: articles,
    sortingOptions: sortingOptions,
    filteringOptions: filteringOptions,
    displayType: displayType,   // Pass displayType to template
    tableColumns: tableColumns  // Pass tableColumns to template
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