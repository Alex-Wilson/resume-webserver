// src/controllers/pageController.js

import { promises as fs } from 'fs';
import path from 'path';
import markdownIt from 'markdown-it';

const md = markdownIt();

/**
 * Helper function to read and parse a markdown file from the `content` directory.
 * @param {string} fileName - The name of the markdown file (e.g., 'index.md').
 * @returns {Promise<string>} The parsed HTML content.
 */
async function getMarkdownContent(fileName) {
  const filePath = path.join(process.cwd(), 'content', fileName);
  try {
    const markdown = await fs.readFile(filePath, 'utf8');
    return md.render(markdown);
  } catch (error) {
    console.error(`Markdown file not found: ${filePath}`);
    // Re-throw the error to be caught by the controller
    throw new Error(`Content file not found: ${fileName}`);
  }
}

// --- Generic Markdown Page Renderer ---
// This powerful function handles any route that maps to a markdown file.
export async function renderMarkdownPage(req, res, next) {
  try {
    // Get page name from the URL path (e.g., '/math' -> 'math')
    const pageName = req.path.substring(1);
    const markdownFile = `${pageName}.md`;

    const htmlContent = await getMarkdownContent(markdownFile);

    // Auto-generate a nice title from the page name
    const title = pageName
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    // Render a generic article template for all these pages
    res.render('pages/article', {
      title: title,
      content: htmlContent,
    });
  } catch (error) {
    // If the markdown file wasn't found, show a 404 page
    next(); // This will pass control to the 404 handler in app.js
  }
}

// --- Specific Page Controllers ---

// Controller to render the home page
export async function renderHomePage(req, res, next) {
  try {
    const htmlContent = await getMarkdownContent('index.md');
    res.render('pages/index', {
      title: 'Home',
      content: htmlContent,
    });
  } catch (error) {
    next(error);
  }
}

// Controller to render the certifications page (loads JSON)
export async function renderCertificationsPage(req, res, next) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'extras', 'certs.json');
    const data = await fs.readFile(filePath, 'utf8');
    const certsData = JSON.parse(data);

    res.render('../views/pages/certifications', {
      title: 'Certifications',
      certifications: certsData.certifications,
    });
  } catch (error) {
    next(error);
  }
}

// Controller to serve the resume PDF directly
export function serveResumePdf(req, res, next) {
  const resumePath = path.join(
    process.cwd(),
    'public',
    'documents',
    'resume',
    'alexander-wilson-resume.pdf', // Make sure this path is correct
  );
  res.sendFile(resumePath, (err) => {
    if (err) {
      // Let the 404 handler manage the response for a missing file
      next();
    }
  });
}

// --- Tool Page Controllers ---

// Controller for the YGO Tool page
export function renderYgoToolPage(req, res, next) {
  res.render('pages/ygo-tool', { title: 'YGO Tool' });
}

// Controller for the ASCII Art Tool page
export function renderAsciiArtToolPage(req, res, next) {
  res.render('pages/ascii-art-tool', { title: 'ASCII Art Tool' });
}