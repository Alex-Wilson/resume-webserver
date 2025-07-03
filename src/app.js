// Load environment variables from .env file
require('dotenv').config();

// Imports necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const https = require('https'); // Re-included
const mongoose = require('mongoose'); // Re-included

// Initialize Express application and Markdown parser
const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if not set in .env
const md = markdownIt();

// Set up Pug as the templating engine and define views directory
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../src/views'));

// Serve static files (CSS, JS, images, etc.) from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Helper Functions
// Function to render a Markdown file into HTML and serve it using the matching Pug template
function renderMarkdownPage(res, markdownFileName, pugTemplateName) {
  const filePath = path.join(
    __dirname,
    '../src/views/markdown',
    markdownFileName
  );
  let markdownContent = '';

  if (fs.existsSync(filePath)) {
    // Check if file exists before reading
    markdownContent = md.render(fs.readFileSync(filePath, 'utf8'));
  } else {
    // Optional: Render a 404 page or show a message if Markdown file is not found
    console.warn(`Markdown file not found: ${filePath}`);
    return res.status(404).render('404', {
      message: 'Content not found.',
    }); // Assuming you have a 404.pug template
  }
  res.render(pugTemplateName, { content: markdownContent }); // Use pugTemplateName
}

// Routes
// Generic route for Markdown-based pages
const markdownPages = [
  '/',
  '/README',
  '/projects',
  '/resources',
  '/blog',
];

markdownPages.forEach((route) => {
  const markdownFileName =
    route === '/' ? 'index.md' : `${route.substring(1)}.md`; // Convert /route to route.md
  // Adjust Pug template name generation based on your actual Pug file names
  // For '/README', it would become 'README'
  // For '/projects', it would become 'projects'
  const pugTemplateName =
    route === '/' ? 'index' : route.substring(1).replace(/\//g, '-');

  app.get(route, (req, res) => {
    // Choose ONE of these options based on your Pug template strategy:
    // Option A: All Markdown pages use a single, generic Pug template (e.g., 'index.pug' or 'markdown.pug')
    renderMarkdownPage(res, markdownFileName, 'index'); // Using 'index' as the generic template

    // Option B: Each Markdown page has a corresponding Pug template with the same base name (e.g., README.md -> README.pug)
    // renderMarkdownPage(res, markdownFileName, pugTemplateName);
  });
});

// Resume route, serves the PDF file directly
app.get('/resume', (req, res) => {
  const resumePath = path.join(
    __dirname,
    '../public/documents/resumes/alexander-wilson-resume.pdf'
  );

  if (fs.existsSync(resumePath)) {
    res.setHeader('Content-Type', 'application/pdf');
    fs.createReadStream(resumePath).pipe(res);
  } else {
    res.status(404).send('Resume not found');
  }
});

// Certifications page, loads JSON and renders certifications.pug
app.get('/certifications', (req, res) => {
  fs.readFile(
    path.join(__dirname, '../public/extras/certs.json'),
    'utf-8',
    (err, data) => {
      if (err) {
        console.error('Error loading certifications data:', err);
        return res.status(500).send('Error loading certifications data');
      }
      res.render('certifications', {
        certifications: JSON.parse(data).certifications,
      });
    }
  );
});

// Dedicated route for YGO Tool (NOT a Markdown file)
app.get('/projects/ygo-tool', (req, res) => {
  // --- ADD YOUR CUSTOM LOGIC FOR THE YGO TOOL PAGE HERE ---
  // This might involve:
  // 1. Rendering a specific Pug template for the tool:
  res.render('ygo-tool'); // Assuming you'll have a src/views/ygo-tool-page.pug
  // 2. Serving a static HTML file for the tool (if it's a separate app):
  // res.sendFile(path.join(__dirname, '../public/ygo-tool/index.html'));
  // 3. Proxying to a different server where the tool runs:
  // (More complex, requires middleware like 'http-proxy-middleware')

  // For now, let's just render a placeholder page or a specific Pug template.
  // Make sure 'ygo-tool-page.pug' exists in src/views/
});

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});