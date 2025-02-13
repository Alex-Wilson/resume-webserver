// Load environment variables from .env file
require('dotenv').config();

// Imports necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const markdownIt = require("markdown-it");

// Initializes Express application and Markdown parser
const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if not set in .env
const md = markdownIt();

// Set up Pug as the templating engine and define views directory
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../src/views'));

// Serve static files (CSS, JS, images, etc.) from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Helper Functions-------------------------------------------------------------
// Function to render a Markdown file into HTML and serve it using the matching Pug template
function renderMarkdownPage(res, filePath, pageTitle) {
  let markdownContent = "";
  if (fs.existsSync(filePath)) { // Check if file exists before reading
    markdownContent = md.render(fs.readFileSync(filePath, "utf8"));
  }
  res.render(pageTitle, { content: markdownContent }); // Use pageTitle as template name
}

// Routes-----------------------------------------------------------------------
// Default homepage route, renders index.md with index.pug
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../src/views/markdown/index.md');
  renderMarkdownPage(res, filePath, "index"); // Matches index.pug
});

// About Me page, renders about-me.md with about-me.pug
app.get('/about-me', (req, res) => {
  const filePath = path.join(__dirname, '../src/views/markdown/about-me.md');
  renderMarkdownPage(res, filePath, "about-me"); // Matches about-me.pug
});

// Certifications page, loads JSON and renders certifications.pug
app.get('/certifications', (req, res) => {
  fs.readFile(path.join(__dirname, '../public/extras/certs.json'), 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error loading certifications data');
    res.render('certifications', { certifications: JSON.parse(data).certifications });
  });
});

// ASCII Art Editor page, renders ascii-art-editor.pug
app.get('/ascii-art-editor', (req, res) => {
  res.render('ascii-art-editor');
});

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});