// src/services/contentService.js

import fs from 'fs';
import path from 'path';

const manifestsFolderPath = path.join(import.meta.dirname, '../data_manifests');

export let manifest = {}; // Stores { categoryIdentifier: { articles: [...], sortingOptions: {...}, filteringOptions: {...}, template: "...", displayType: "...", tableColumns: [...] } }
export let slugMap = {};   // Stores a flat map of all articles by their unique slug

export function initializeContent() {
  console.log('ContentService: Starting content initialization (VERIFIED)'); // Added VERIFIED
  console.log(`Loading manifests from: ${manifestsFolderPath}`); // Debugging path

  const loadedManifest = {};
  const loadedSlugMap = {};

  try {
    const files = fs.readdirSync(manifestsFolderPath);

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const categoryIdentifier = path.basename(file, '.json');
        const filePath = path.join(manifestsFolderPath, file);
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // *** CRITICAL VERIFICATION: Ensure these properties are extracted ***
        const articles = fileContent.articles || [];
        const sortingOptions = fileContent.sortingOptions || {};
        const filteringOptions = fileContent.filteringOptions || {};
        const template = fileContent.template || 'resource-category'; // Check this exact line
        const displayType = fileContent.displayType || 'list';
        const tableColumns = fileContent.tableColumns || [];

        loadedManifest[categoryIdentifier] = { articles, sortingOptions, filteringOptions, template, displayType, tableColumns };

        for (const article of articles) {
          if (loadedSlugMap[article.slug]) {
            throw new Error(
              `FATAL ERROR: Duplicate slug detected! The slug "${article.slug}" is used in both "${loadedSlugMap[article.slug].category}" and "${categoryIdentifier}". Slugs must be unique.`
            );
          }
          loadedSlugMap[article.slug] = { ...article, category: categoryIdentifier };
        }
        console.log(`  Loaded manifest for: ${categoryIdentifier}. Template: ${template}, DisplayType: ${displayType}`); // Debugging each manifest
      }
    }
    manifest = loadedManifest;
    slugMap = loadedSlugMap;

    console.log(
      `ContentService: Successfully loaded ${Object.keys(manifest).length} categories and ${
        Object.keys(slugMap).length
      } unique articles (VERIFIED).`
    );
  } catch (error) {
    console.error('ContentService: ERROR during initialization:', error.message);
    throw error;
  }
}