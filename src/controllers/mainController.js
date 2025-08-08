// src/controllers/mainController.js

import { promises as fs } from 'fs';
import path from 'path';
// This import is the key fix, making the contentService functions available.
import * as contentService from '../services/contentService.js';

/**
 * Renders the main home page using content from index.md.
 */
export function renderHomePage(req, res, next) {
  try {
    const homeContent = contentService.getArticleBySlug('index');
    const contentHtml = homeContent
      ? homeContent.html
      : '<p class="error">Error: Could not load homepage content.</p>';
    res.render('pages/index', {
      title: 'Home',
      content: contentHtml,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Renders the README page using content from README.md.
 */
export function renderReadmePage(req, res, next) {
  const readmeArticle = contentService.getArticleBySlug('README');

  if (readmeArticle) {
    res.render('pages/article', {
      title: 'README',
      content: readmeArticle.html,
    });
  } else {
    // If README.md wasn't found in the cache, trigger the 404 handler.
    next();
  }
}

/**
 * Renders the certifications page by loading data from a JSON file.
 */
export async function renderCertificationsPage(req, res, next) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'extras', 'certs.json');
    const data = await fs.readFile(filePath, 'utf8');
    const certsData = JSON.parse(data);

    res.render('pages/certifications', {
      title: 'Certifications',
      certifications: certsData.certifications,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Serves the resume PDF file directly.
 */
export function serveResumePdf(req, res, next) {
  const resumePath = path.join(
    process.cwd(),
    'public',
    'documents',
    'resume',
    'alexander-wilson-resume.pdf',
  );
  res.sendFile(resumePath, (err) => {
    if (err) {
      next();
    }
  });
}