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
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../src/views/markdown/index.md');
  renderMarkdownPage(res, filePath, "index"); // Matches index.pug
});

app.get('/readme', (req, res) => {
  const filePath = path.join(__dirname, '../src/views/markdown/readme.md');
  renderMarkdownPage(res, filePath, "about-me"); // Matches about-me.pug
});

app.get('/educational-resources', (req, res) => {
  const filePath = path.join(__dirname, '../src/views/markdown/educational-resources.md');
  renderMarkdownPage(res, filePath, "educational-resources"); // Matches certification-resources.pug
});




// Resume route, serves the PDF file directly
app.get('/resume', (req, res) => {
  const resumePath = path.join(__dirname, '../public/documents/resumes/alexander-wilson-resume.pdf');
  
  // Check if file exists
  if (fs.existsSync(resumePath)) {
    // Set the appropriate content type for PDF
    res.setHeader('Content-Type', 'application/pdf');
    
    // Stream the file to the response
    fs.createReadStream(resumePath).pipe(res);
  } else {
    // If file doesn't exist, send a 404 error
    res.status(404).send('Resume not found');
  }
});


// Certifications page, loads JSON and renders certifications.pug
app.get('/certifications', (req, res) => {
  fs.readFile(path.join(__dirname, '../public/extras/certs.json'), 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error loading certifications data');
    res.render('certifications', { certifications: JSON.parse(data).certifications });
  });
});

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});