// src/services/contentService.js

import fs from 'fs';
import path from 'path';

const manifestsFolderPath = path.join(import.meta.dirname, '../data_manifests');

export let manifest = {}; // Stores { categoryIdentifier: { articles: [...], sortingOptions: {...}, filteringOptions: {...} } }
export let slugMap = {};   // Stores a flat map of all articles by their unique slug

export function initializeContent() {
  console.log('ContentService: Starting content initialization...');

  const loadedManifest = {};
  const loadedSlugMap = {};

  try {
    const files = fs.readdirSync(manifestsFolderPath);

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const categoryIdentifier = path.basename(file, '.json');
        const filePath = path.join(manifestsFolderPath, file);
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // *** CRITICAL CHANGE: Expecting fileContent to be an OBJECT ***
        // It now expects the JSON to be an object with 'articles', 'sortingOptions', and 'filteringOptions' keys.
        const articles = fileContent.articles || [];
        const sortingOptions = fileContent.sortingOptions || {};
        const filteringOptions = fileContent.filteringOptions || {}; // Also grab filtering options

        loadedManifest[categoryIdentifier] = { articles, sortingOptions, filteringOptions }; // Store all data

        for (const article of articles) {
          if (loadedSlugMap[article.slug]) {
            throw new Error(
              `FATAL ERROR: Duplicate slug detected! The slug "${article.slug}" is used in both "${loadedSlugMap[article.slug].category}" and "${categoryIdentifier}". Slugs must be unique.`
            );
          }
          loadedSlugMap[article.slug] = { ...article, category: categoryIdentifier };
        }
      }
    }
    manifest = loadedManifest;
    slugMap = loadedSlugMap;

    console.log(
      `ContentService: Successfully loaded ${Object.keys(manifest).length} categories and ${
        Object.keys(slugMap).length
      } unique articles.`
    );
  } catch (error) {
    console.error('ContentService: ERROR during initialization:', error.message);
    throw error;
  }
}