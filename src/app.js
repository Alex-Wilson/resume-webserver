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

// Load Markdown for the homepage
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../src/views/markdown/about-me.md');

  let markdownContent = "";
  if (fs.existsSync(filePath)) {
    markdownContent = md.render(fs.readFileSync(filePath, "utf8"));
  }

  res.render('index', { content: markdownContent });
});

// Resume website deployment page
app.get('/resume-website-deployment', (req, res) => {
  res.render('resume-website-deployment');
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

    const certifications = JSON.parse(data).certifications;
    res.render('certifications', { certifications });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
