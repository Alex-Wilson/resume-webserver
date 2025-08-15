// src/controllers/mainController.js

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// --- ADD: Import the contentService to find the README file ---
import * as contentService from '../services/contentService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function renderHomePage(req, res) {
  res.render('pages/index');
}

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

export function serveResumePdf(req, res) {
  const pdfPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'content',
    'alexander-wilson-resume.pdf'
  );
  res.sendFile(pdfPath);
}

export async function renderCertificationsPage(req, res, next) {
  try {
    const certsPath = path.join(
      process.cwd(),
      'public',
      'content',
      'certs.json'
    );

    const fileContent = await fs.readFile(certsPath, 'utf8');
    const data = JSON.parse(fileContent);
    const certificationsArray = data.certifications;

    // Render the page and pass the parsed data to it
    res.render('pages/certifications', {
      title: 'Certifications',
      certifications: certificationsArray, // Pass the array, not the whole object
    });
  } catch (err) {
    console.error('Failed to load or parse certifications.json:', err);
    next(err);
  }
}