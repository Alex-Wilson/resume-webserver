// src/controllers/mainController.js

import path from 'path';
import { fileURLToPath } from 'url';
// --- ADD: Import the contentService to find the README file ---
import * as contentService from '../services/contentService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderHomePage(req, res) {
  res.render('pages/index');
}

export function serveResumePdf(req, res) {
  const pdfPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'content',
    'resume',
    'alexander-wilson-resume.pdf'
  );
  res.sendFile(pdfPath);
}

export function renderCertificationsPage(req, res) {
  res.render('pages/certifications', { title: 'Certifications' });
}

// --- ADD: The function to render the README page ---
export function renderReadmePage(req, res, next) {
  // The slug for 'public/content/README.md' will be 'README'
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