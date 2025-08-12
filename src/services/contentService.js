// src/services/contentService.js

import { promises as fs } from 'fs';
import path from 'path';
import markdownIt from 'markdown-it';

const md = markdownIt({ html: true }); // Enable HTML tags in Markdown
// --- CHANGE: Point to the new content directory inside 'public' ---
const contentDir = path.join(process.cwd(), 'public', 'content');

// This cache will hold all our rendered articles in memory.
const articleCache = new Map();

/**
 * Recursively scans a directory for markdown files.
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
      // --- CHANGE: Slug is now the relative path from the root content dir ---
      // This ensures uniqueness, e.g., 'folder/my-article'
      const slug = path
        .relative(contentDir, fullPath)
        .replace(/\\/g, '/') // Normalize path separators to forward slashes
        .replace(/\.md$/, ''); // Remove the .md extension

      const markdownContent = await fs.readFile(fullPath, 'utf8');
      const htmlContent = md.render(markdownContent);

      // For now, we'll generate a simple title from the slug's last part.
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
 * Reads all .md files from the /public/content directory recursively,
 * renders them to HTML, and stores them in the cache.
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
    // If content dir doesn't exist, we can just log it and continue
    if (error.code === 'ENOENT') {
      console.warn(
        `Content directory not found at ${contentDir}. No articles loaded.`
      );
    }
  }
}

/**
 * Retrieves a single article from the cache by its slug.
 * @param {string} slug - The slug of the article (e.g., 'folder/my-article').
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