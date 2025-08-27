// src/services/contentService.js

import fs from 'fs';
import path from 'path';

// The path to our manifest JSON files, relative to this service file.
const manifestsFolderPath = path.join(import.meta.dirname, '../data_manifests');

// These will be populated by initializeContent() and then exported.
// They start as empty objects, populated upon explicit initialization.
export let manifest = {};
export let slugMap = {};

/**
 * Initializes the content service by loading all manifest files
 * and building the manifest and slugMap.
 * This function should be called once at application startup (from app.js).
 */
export function initializeContent() {
  console.log('ContentService: Starting content initialization...');

  const loadedManifest = {};
  const loadedSlugMap = {};

  try {
    const files = fs.readdirSync(manifestsFolderPath);

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const category = path.basename(file, '.json');
        const filePath = path.join(manifestsFolderPath, file);
        const articles = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        loadedManifest[category] = articles; // Populate local manifest first

        for (const article of articles) {
          if (loadedSlugMap[article.slug]) {
            throw new Error(
              `FATAL ERROR: Duplicate slug detected! The slug "${article.slug}" is used in both "${loadedSlugMap[article.slug].category}" and "${category}". Slugs must be unique.`
            );
          }
          loadedSlugMap[article.slug] = { ...article, category: category }; // Populate local slugMap
        }
      }
    }
    // Assign the locally loaded data to the exported variables
    manifest = loadedManifest;
    slugMap = loadedSlugMap;

    console.log(
      `ContentService: Successfully loaded ${Object.keys(manifest).length} categories and ${
        Object.keys(slugMap).length
      } unique articles.`
    );
  } catch (error) {
    console.error('ContentService: ERROR during initialization:', error.message);
    // It's critical for the app to have this data, so re-throw the error to halt startup.
    throw error;
  }
}