// src/controllers/mainController.js

import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it'; // Import MarkdownIt for README.md parsing

// Initialize MarkdownIt once for this controller
const md = new MarkdownIt();

// --- Assume contentService is NOT imported here for this controller ---
// The original `contentService` might have been imported if `mainController`
// had other functions using it. We assume only 'renderReadmePage' and
// 'renderCertificationsPage' need data logic here now.

/**
 * Renders the homepage or root page.
 */
export function renderHomePage(req, res, next) {
  res.render('pages/index', { title: 'Welcome to Alex Wilson Info' });
}

/**
 * Renders the custom 'README' (About) page.
 * This reads the static README.md file, parses it, and renders it.
 */
export function renderReadmePage(req, res, next) {
  // Path to your README.md relative to project root
  // Based on your file tree, it's public/content/math/README.md
  const readmeFilePath = path.join(
    process.cwd(),
    'public',
    'content',
    'README.md',
  );

  try {
    const markdownContent = fs.readFileSync(readmeFilePath, 'utf8');
    const htmlContent = md.render(markdownContent); // Convert Markdown to HTML

    res.render('pages/article', { // Assuming 'pages/article' is a suitable template
      title: 'About Alex Wilson', // Custom title for your About page
      content: htmlContent,
      // You can pass other context if needed, like category/slug for breadcrumbs, etc.
      category: 'about', // Arbitrary category for this static page context
      slug: 'readme',
    });
  } catch (error) {
    console.error(`Error rendering /readme page: ${error.message}`);
    const err = new Error('Could not load About page content');
    err.status = 500; // Internal Server Error if README.md file is missing or unreadable
    return next(err);
  }
}

/**
 * Serves the resume PDF directly.
 * (This function does not need changes as it likely serves a static file.)
 */
export function serveResumePdf(req, res, next) {
  const resumePath = path.join(process.cwd(), 'public', 'content', 'documents','resume', 'alexander-wilson-resume.pdf');
  res.sendFile(resumePath, (err) => {
    if (err) {
      console.error('Error sending resume PDF:', err);
      return next(new Error('Resume file not found', { cause: err }));
    }
  });
}

/**
 * Renders the Certifications listing page.
 * This will use your original `certs-table.json` data.
 */
export function renderCertificationsPage(req, res, next) {
  // Path to your certifications JSON data (the one not managed by contentService)
  const certsTableFilePath = path.join(
    process.cwd(),
    'public',
    'content',
    'data',
    'certs-table.json', // Your renamed original certs.json
  );

  try {
    const certsData = JSON.parse(fs.readFileSync(certsTableFilePath, 'utf8'));

    res.render('pages/certifications', { // Assuming 'pages/certifications.pug' template
      title: 'Certifications',
      certifications: certsData.certifications, // Pass the parsed JSON data to the template
    });
  } catch (error) {
    console.error(`Error rendering /certifications page: ${error.message}`);
    const err = new Error('Could not load certifications data');
    err.status = 500;
    return next(err);
  }
}