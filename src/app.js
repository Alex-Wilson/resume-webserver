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
    markdownContent = md.render(fs.readFileSync(filePath, 'utf8'));
  } else {
    console.warn(`Markdown file not found: ${filePath}`);
    return res.status(404).render('404', {
      message: 'Content not found.',
    });
  }
  res.render(pugTemplateName, { content: markdownContent }); // Use pugTemplateName
}

// Routes
const markdownPages = [
  '/',
  '/README'
];

markdownPages.forEach((route) => {
  const markdownFileName =
    route === '/' ? 'README.md' : `${route.substring(1)}.md`; // Convert /route to route.md
  const pugTemplateName =
    route === '/' ? 'index' : route.substring(1).replace(/\//g, '-');

  app.get(route, (req, res) => {
    renderMarkdownPage(res, markdownFileName, 'index'); // Using 'index' as the generic template
  });
});

// Resume route, serves the PDF file directly
app.get('/resume', (req, res) => {
  const resumePath = path.join(
    __dirname,
    '../public/documents/resume/alexander-wilson-resume.pdf'
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

  res.render('ygo-tool'); 

});

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

/*
--------------------------------------------------------------------------------------------------------------------------------
// Load environment variables
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? 443 : process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await logCardCount();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define the card schema
const cardSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String },
  atk: { type: Number, default: null },
  def: { type: Number, default: null },
  level: { type: Number, default: null },
  rank: { type: Number, default: null },
  linkval: { type: Number, default: null },
  scale: { type: Number, default: null },
  race: { type: String, default: null },
  attribute: { type: String },
  card_images: { type: Array, default: [] },
  card_prices: { type: Array, default: [] },
  card_sets: { type: Array, default: [] },
});

// Create indexes for efficient querying
cardSchema.index({ name: 1 });
cardSchema.index({ type: 1 });
cardSchema.index({ race: 1 });
cardSchema.index({ attribute: 1 });
cardSchema.index({ level: 1 });
cardSchema.index({ rank: 1 });
cardSchema.index({ linkval: 1 });
cardSchema.index({ scale: 1 });
cardSchema.index({ 'card_sets.set_rarity': 1 });

const Card = mongoose.model('Card', cardSchema);

// Debug function to log query details
function logQuery(query, source) {
  console.log('\n=== Query Debug Info ===');
  console.log('Source:', source);
  console.log('Query:', JSON.stringify(query, null, 2));
  console.log('=====================\n');
}

// Log the current number of cards in the database
const logCardCount = async () => {
  try {
    const count = await Card.countDocuments({});
    console.log(`Total number of cards in the database: ${count}`);
  } catch (error) {
    console.error('Error counting documents:', error);
  }
};

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Yu-Gi-Oh! Editor page
app.get('/ygo-editor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'ygo-editor.html'));
});

// Function to build the query object based on filters
function buildQuery(filters) {
  console.log('\n=== Building Query ===');
  console.log('Received filters:', JSON.stringify(filters, null, 2));

  const {
    rarity,
    cardType,
    monsterType,
    monsterSubType,
    monsterAbility,
    monsterRace,
    monsterAttribute,
    monsterLevel,
    monsterRank,
    linkRating,
    pendulumScale,
    spellType,
    trapType,
  } = filters;

  const query = {};

  // Mapping objects with logging
  console.log('\n=== Type Mapping Debug ===');
  
  const cardTypeMap = {
    Monster: /.*Monster.i,
    Spell: /^Spell Card$/i,
    Trap: /^Trap Card$/i,
  };
  console.log('Card Type Map:', cardTypeMap);

  const monsterTypeMap = {
    'Normal Monster': /^Normal Monster$/i,
    'Effect Monster': /Effect/i,
    'Fusion Monster': /Fusion/i,
    'Ritual Monster': /Ritual/i,
    'Synchro Monster': /Synchro/i,
    'XYZ Monster': /Xyz/i,
    'Pendulum Monster': /Pendulum/i,
    'Link Monster': /Link/i,
  };
  console.log('Monster Type Map:', monsterTypeMap);

  const spellTypeMap = {
    'Normal': /^Spell Card$/i,
    'Field': /^Spell Card Field$/i,
    'Equip': /^Spell Card Equip$/i,
    'Continuous': /^Spell Card Continuous$/i,
    'Quick-Play': /^Spell Card Quick-Play$/i,
    'Ritual': /^Spell Card Ritual$/i,
  };

  const trapTypeMap = {
    'Normal': /^Trap Card$/i,
    'Continuous': /^Trap Card Continuous$/i,
    'Counter': /^Trap Card Counter$/i,
  };

  const monsterAbilityMap = {
    'Spirit': /Spirit/i,
    'Toon': /Toon/i,
    'Union': /Union/i,
    'Gemini': /Gemini/i,
    'Flip': /Flip/i,
  };

  // Apply filters with detailed logging
  console.log('\n=== Applying Filters ===');

  if (cardType && cardType !== 'all') {
    console.log('Processing cardType:', cardType);
    const typeFilter = cardTypeMap[cardType];
    if (typeFilter instanceof RegExp) {
      query.type = { $regex: typeFilter.source };
      console.log('Applied card type regex:', typeFilter.source);
    } else {
      query.type = typeFilter;
      console.log('Applied direct card type:', typeFilter);
    }
  }

  if (rarity) {
    console.log('Processing rarity:', rarity);
    query['card_sets.set_rarity'] = rarity;
  }

  if (monsterType && monsterType !== 'all') {
    console.log('Processing monsterType:', monsterType);
    const typeFilter = monsterTypeMap[monsterType];
    if (typeFilter instanceof RegExp) {
      console.log('Before setting monster type query:', JSON.stringify(query.type || 'none'));
      query.type = { $regex: typeFilter.source };
      console.log('After setting monster type query:', JSON.stringify(query.type));
    } else {
      query.type = typeFilter;
    }
    console.log('Final monster type query part:', JSON.stringify(query.type));
  }

  if (monsterSubType) {
    console.log('Processing monsterSubType:', monsterSubType);
    if (!query.type) {
      query.type = { $regex: monsterSubType };
    } else if (query.type.$regex) {
      const existingPattern = query.type.$regex;
      query.type.$regex = `${existingPattern}.*${monsterSubType}`;
    }
    console.log('Updated query with subtype:', JSON.stringify(query.type));
  }

  if (monsterAbility) {
    console.log('Processing monsterAbility:', monsterAbility);
    const abilityFilter = monsterAbilityMap[monsterAbility];
    if (abilityFilter) {
      query.desc = { $regex: abilityFilter.source };
      console.log('Applied ability filter:', abilityFilter.source);
    }
  }

  if (monsterRace) {
    console.log('Processing monsterRace:', monsterRace);
    query.race = monsterRace;
  }

  if (monsterAttribute) {
    console.log('Processing monsterAttribute:', monsterAttribute);
    query.attribute = monsterAttribute;
  }

  if (monsterLevel) {
    console.log('Processing monsterLevel:', monsterLevel);
    query.level = parseInt(monsterLevel, 10);
  }

  if (monsterRank) {
    console.log('Processing monsterRank:', monsterRank);
    query.rank = parseInt(monsterRank, 10);
  }

  if (linkRating) {
    console.log('Processing linkRating:', linkRating);
    query.linkval = parseInt(linkRating, 10);
  }

  if (pendulumScale) {
    console.log('Processing pendulumScale:', pendulumScale);
    query.scale = parseInt(pendulumScale, 10);
  }

  if (spellType) {
    console.log('Processing spellType:', spellType);
    const typeFilter = spellTypeMap[spellType];
    if (typeFilter) {
      query.type = { $regex: typeFilter.source };
      console.log('Applied spell type filter:', typeFilter.source);
    }
  }

  if (trapType) {
    console.log('Processing trapType:', trapType);
    const typeFilter = trapTypeMap[trapType];
    if (typeFilter) {
      query.type = { $regex: typeFilter.source };
      console.log('Applied trap type filter:', typeFilter.source);
    }
  }

  // Add case-insensitive option to all regex queries
  if (query.type && query.type.$regex && !query.type.$options) {
    query.type.$options = 'i';
    console.log('Added case-insensitive option to type query');
  }
  if (query.desc && query.desc.$regex && !query.desc.$options) {
    query.desc.$options = 'i';
    console.log('Added case-insensitive option to desc query');
  }

  console.log('\n=== Final Query ===');
  console.log(JSON.stringify(query, null, 2));
  console.log('==================\n');

  return query;
}

// Function to perform flexible regex search with debug logging
async function performFlexibleSearch(term, query, offset, limit) {
  console.log('\n=== Performing Flexible Search ===');
  console.log('Search term:', term);
  console.log('Initial query:', JSON.stringify(query, null, 2));
  console.log('Offset:', offset);
  console.log('Limit:', limit);

  // Input validation
  if (term.length > 100) {
    console.log('Search term too long');
    throw new Error('Search term is too long.');
  }

  const isValidTerm = /^[\w\s'-]{1,100}$/.test(term);
  if (!isValidTerm) {
    console.log('Invalid search term');
    throw new Error('Invalid search term.');
  }

  // Normalize the search term
  const normalizedTerm = term.toLowerCase().trim();
  console.log('Normalized term:', normalizedTerm);

  // Escape special regex characters
  const escapedTerm = normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  console.log('Escaped term:', escapedTerm);

  // Construct the flexible regex pattern
  const regexPattern = escapedTerm.split(/\s+/).join('.*');
  const regex = new RegExp(regexPattern, 'i');
  console.log('Final regex pattern:', regex.toString());

  // Add the regex search to the query
  const regexQuery = { ...query, name: { $regex: regex } };
  console.log('Final search query:', JSON.stringify(regexQuery, null, 2));

  // Perform the search with filters and pagination
  const startTime = Date.now();
  const cards = await Card.find(regexQuery)
    .collation({ locale: 'en', strength: 2 })
    .skip(parseInt(offset, 10))
    .limit(parseInt(limit, 10));

  console.log(`Search completed in ${Date.now() - startTime}ms`);
  console.log(`Found ${cards.length} cards`);

  return cards;
}

// API endpoint to search for cards by name with filters
app.get('/api/cards/search', async (req, res) => {
  console.log('\n=== API Search Request ===');
  console.log('Query parameters:', req.query);

  // Extract query parameters
  const {
    term = '',
    offset = 0,
    limit = 100,
    rarity,
    cardType,
    monsterType,
    monsterSubType,
    monsterAbility,
    monsterRace,
    monsterAttribute,
    monsterLevel,
    monsterRank,
    linkRating,
    pendulumScale,
    spellType,
    trapType,
  } = req.query;

  // Build the query object
  const query = buildQuery({
    rarity,
    cardType,
    monsterType,
    monsterSubType,
    monsterAbility,
    monsterRace,
    monsterAttribute,
    monsterLevel,
    monsterRank,
    linkRating,
    pendulumScale,
    spellType,
    trapType,
  });

  try {
    let cards = [];
    const startTime = Date.now();
    
    if (term) {
      console.log('Performing search with term:', term);
      cards = await performFlexibleSearch(term, query, offset, limit);
    } else {
      console.log('Performing regular query without search term');
      cards = await Card.find(query)
        .collation({ locale: 'en', strength: 2 })
        .skip(parseInt(offset, 10))
        .limit(parseInt(limit, 10));
    }

    console.log(`Query executed in ${Date.now() - startTime}ms`);
    console.log(`Returning ${cards.length} cards`);

    res.json({ cards });
  } catch (error) {
    console.error('Error searching for cards:', error);
    res.status(500).json({ error: 'Error searching for cards' });
  }
});

// API route to get cards with filters
app.get('/api/cards', async (req, res) => {
  console.log('\n=== API Cards Request ===');
  console.log('Query parameters:', req.query);

  // Extract query parameters
  const {
    term = '',
    offset = 0,
    limit = 100,
    rarity,
    cardType,
    monsterType,
    monsterSubType,
    monsterAbility,
    monsterRace,
    monsterAttribute,
    monsterLevel,
    monsterRank,
    linkRating,
    pendulumScale,
    spellType,
    trapType,
  } = req.query;

  // Build the query object
  const query = buildQuery({
    rarity,
    cardType,
    monsterType,
    monsterSubType,
    monsterAbility,
    monsterRace,
    monsterAttribute,
    monsterLevel,
    monsterRank,
    linkRating,
    pendulumScale,
    spellType,
    trapType,
  });

  try {
    let cards = [];
    const startTime = Date.now();

    if (term) {
      console.log('Performing search with term:', term);
      cards = await performFlexibleSearch(term, query, offset, limit);
    } else {
      console.log('Performing regular query without search term');
      cards = await Card.find(query)
        .collation({ locale: 'en', strength: 2 })
        .skip(parseInt(offset, 10))
        .limit(parseInt(limit, 10));
    }

    console.log(`Query executed in ${Date.now() - startTime}ms`);
    console.log(`Returning ${cards.length} cards`);

    // Log a sample of the returned cards for debugging
    if (cards.length > 0) {
      console.log('Sample card types returned:');
      cards.slice(0, 5).forEach(card => {
        console.log(`- ${card.name}: ${card.type}`);
      });
    }

    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    console.error('Query that caused error:', query);
    res.status(500).send('Error fetching card data');
  }
});

// Default route
app.get('*', (req, res) => {
  console.log('Serving default route');
  res.sendFile(path.join(__dirname, 'public', 'html', 'under-construction.html'));
});

// Start the server
if (isProduction) {
  let options = {};
  try {
    options = {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    };
    console.log('SSL certificates loaded successfully');
  } catch (error) {
    console.error('Error loading SSL certificates:', error);
    process.exit(1);
  }
  https.createServer(options, app).listen(PORT, () => {
    console.log('Running in PRODUCTION');
    console.log(`HTTPS Server is listening on port ${PORT}`);
    console.log(`Find this page at: https://alexwilson.info`);
  });
} else {
  app.listen(PORT, () => {
    console.log('Running in DEVELOPMENT');
    console.log(`HTTP Server is listening on port ${PORT}`);
    console.log(`Find this page at: http://localhost:${PORT}/ygo-editor`);
  });
}

// Initialize the database with logging
const initializeDatabase = async () => {
  console.log('\n=== Initializing Database ===');
  try {
    const count = await Card.countDocuments({});
    console.log(`Current card count: ${count}`);
    
    if (count === 0) {
      console.log('Database is empty. Please populate the database before starting the server.');
    } else {
      console.log('Cards already fetched. Skipping initialization.');
      
      // Log some sample card types for debugging
      const sampleCards = await Card.find().limit(5);
      console.log('\nSample card types in database:');
      sampleCards.forEach(card => {
        console.log(`- ${card.name}: ${card.type}`);
      });
      
      // Log count of Ritual cards
      const ritualCount = await Card.countDocuments({
        type: { $regex: 'Ritual', $options: 'i' }
      });
      console.log(`\nTotal Ritual cards in database: ${ritualCount}`);
    }
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
  console.log('=== Initialization Complete ===\n');
};
initializeDatabase();

// Graceful shutdown
const shutdown = () => {
  console.log('\n=== Server Shutdown Initiated ===');
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown).on('SIGTERM', shutdown);

*/