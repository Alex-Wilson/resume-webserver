// src/services/contentService.js

import { promises as fs } from 'fs';
import path from 'path';
import markdownIt from 'markdown-it';

const md = markdownIt({ html: true }); // Enable HTML tags in Markdown
const contentDir = path.join(process.cwd(), 'public', 'content');

// This cache will hold all our rendered articles in memory.
const articleCache = new Map();

/**
 * Recursively scans a directory for markdown files, processes them,
 * and adds them to the article cache.
 * @param {string} dir - The directory to scan.
 */
async function findMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // If it's a directory, recurse into it
      await findMarkdownFiles(fullPath);
    } else if (path.extname(entry.name) === '.md') {
      // The slug is the relative path from the root content directory,
      // ensuring uniqueness (e.g., 'math/algebra/pre-algebra').
      const slug = path
        .relative(contentDir, fullPath)
        .replace(/\\/g, '/') // Normalize path separators to forward slashes
        .replace(/\.md$/, ''); // Remove the .md extension

      const markdownContent = await fs.readFile(fullPath, 'utf8');
      const htmlContent = md.render(markdownContent);

      // Generate a simple title from the last part of the slug.
      const title = path
        .basename(slug)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

      articleCache.set(slug, {
        slug,
        title,
        html: htmlContent,
      });
    }
  }
}

/**
 * Initializes the content cache by recursively scanning the content directory.
 * This function is called once on server startup.
 */
export async function initializeContent() {
  console.log('Initializing content cache...');
  try {
    articleCache.clear(); // Clear cache for potential reloads
    await findMarkdownFiles(contentDir); // Start the recursive search
    console.log(
      `Content cache initialized. Loaded ${articleCache.size} articles.`
    );
  } catch (error) {
    console.error('Failed to initialize content cache:', error);
    if (error.code === 'ENOENT') {
      console.warn(
        `Content directory not found at ${contentDir}. No articles loaded.`
      );
    }
  }
}

/**
 * Retrieves a single article from the cache by its full slug.
 * @param {string} slug - The slug of the article (e.g., 'math/algebra/pre-algebra').
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
  return Array.from(articleCache.values());
}

/**
 * Retrieves articles for a specific category, structured by subdirectory.
 * This version handles both direct articles (e.g., math/pre-algebra.md) and
 * articles in sub-folders (e.g., math/algebra/linear-algebra.md).
 * @param {string} category - The top-level category to filter by (e.g., 'math').
 * @returns {object} An object where keys are formatted subdirectory names
 *                   and values are arrays of article objects.
 */
export function getArticlesByCategory(category) {
  const structuredContent = {};

  for (const article of articleCache.values()) {
    if (article.slug.startsWith(`${category}/`)) {
      const parts = article.slug.split('/');
      // Set a default group name based on the category itself (e.g., "Math")
      let groupName = category
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

      // If there is a sub-folder (e.g., math/algebra/file), use it as the group name instead.
      if (parts.length >= 3) {
        const group = parts[1]; // e.g., 'algebra'
        groupName = group
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());
      }

      // If we haven't seen this group before, create an empty array for it
      if (!structuredContent[groupName]) {
        structuredContent[groupName] = [];
      }

      // Add the current article to its group
      structuredContent[groupName].push(article);
    }
  }
  return structuredContent;
}