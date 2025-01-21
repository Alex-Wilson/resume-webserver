const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Define routes
app.get('/', (req, res) => {
  res.render('index'); // Render the homepage (index.pug)
});

app.get('/certifications', (req, res) => {
  const certsPath = path.join(__dirname, '../public/extras/certs.json');

  // Read the JSON file for certifications
  fs.readFile(certsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading certifications JSON:', err);
      res.status(500).send('Error loading certifications data');
      return;
    }

    const certifications = JSON.parse(data).certifications; // Parse the JSON data
    res.render('certifications', { certifications }); // Pass the data to the template
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
