//imports and initilization
require('dotenv').config(); // Load environment variables

const express = require('express');
const fs = require('fs');
const path = require('path');
const markdownIt = require("markdown-it");

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if not in .env
const md = markdownIt();

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../src/views'));

// Serve static files from "public"
app.use(express.static(path.join(__dirname, '../public')));




//helper functions --------------------------
// Function to render markdown files
function renderMarkdownPage(res, filePath, pageTitle) {
  let markdownContent = "";
  if (fs.existsSync(filePath)) {
    markdownContent = md.render(fs.readFileSync(filePath, "utf8"));
  }
  res.render('index', { title: pageTitle, content: markdownContent });
}

//Routes

// Default homepage (index.md)
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../src/views/markdown/index.md');
  renderMarkdownPage(res, filePath, "Home");
});

// Certifications page (loads JSON data)
app.get('/certifications', (req, res) => {
  const certsPath = path.join(__dirname, '../public/extras/certs.json');

  fs.readFile(certsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading certifications JSON:', err);
      res.status(500).send('Error loading certifications data');
      return;
    }

    try {
      const certifications = JSON.parse(data).certifications;
      res.render('certifications', { certifications });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Invalid JSON format');
    }
  });
});



// About Me page
app.get('/about-me', (req, res) => {
  const filePath = path.join(__dirname, '../src/views/markdown/about-me.md');
  renderMarkdownPage(res, filePath, "about-me");
});


app.get('/ascii-art-editor', (req, res) => {
  res.render('ascii-art-editor', { title: "ASCII Art Editor" });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
