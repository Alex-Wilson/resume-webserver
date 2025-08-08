// src/services/contentService.js

import { promises as fs } from 'fs';
import path from 'path';
import markdownIt from 'markdown-it';

const md = markdownIt({ html: true }); // Enable HTML tags in Markdown
const contentDir = path.join(process.cwd(), 'content');

// This cache will hold all our rendered articles in memory.
const articleCache = new Map();

/**
 * Reads all .md files from the /content directory, renders them to HTML,
 * and stores them in the cache. This function is called once on server startup.
 */
export async function initializeContent() {
  console.log('Initializing content cache...');
  try {
    const files = await fs.readdir(contentDir);
    const markdownFiles = files.filter((file) => path.extname(file) === '.md');

    for (const file of markdownFiles) {
      const filePath = path.join(contentDir, file);
      const slug = path.basename(file, '.md'); // 'my-article.md' -> 'my-article'
      const markdownContent = await fs.readFile(filePath, 'utf8');
      const htmlContent = md.render(markdownContent);

      // For now, we'll generate a simple title from the slug.
      // This can be enhanced later with front-matter.
      const title = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

      articleCache.set(slug, {
        slug,
        title,
        html: htmlContent,
      });
    }
    console.log(`Content cache initialized. Loaded ${articleCache.size} articles.`);
  } catch (error) {
    console.error('Failed to initialize content cache:', error);
  }
}

/**
 * Retrieves a single article from the cache by its slug.
 * @param {string} slug - The slug of the article.
 * @returns {object | undefined} The article object or undefined if not found.
 */
export function getArticleBySlug(slug) {
  return articleCache.get(slug);
}

/**
 * Retrieves a list of all articles (slug and title) from the cache.
 * @returns {Array<object>} A list of all articles.
 */
export function getAllArticles() {
  // Return an array of all values from the map
  return Array.from(articleCache.values());
}