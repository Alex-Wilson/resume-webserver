const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Set Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "../public")));

// Define routes
app.get("/", (req, res) => {
  res.render("index"); // Render the homepage (index.pug)
});

app.get("/certs", (req, res) => {
  res.render("certs"); // Render the certs.pug template
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
