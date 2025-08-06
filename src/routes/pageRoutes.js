// src/routes/pageRoutes.js

import express from 'express';
import * as pageController from '../controllers/pageController.js';

const router = express.Router();

// --- Core & "whoami" Routes ---
router.get('/', pageController.renderHomePage);
router.get('/resume', pageController.serveResumePdf);
router.get('/certifications', pageController.renderCertificationsPage);

// --- Generic Content Routes (handled by one controller) ---
// These routes will look for a matching .md file in the /content directory
router.get('/math', pageController.renderMarkdownPage);
router.get('/certification-resources', pageController.renderMarkdownPage);
router.get('/leet-code-write-ups', pageController.renderMarkdownPage);
router.get('/how-does-a-computer-work', pageController.renderMarkdownPage);
router.get('/time-line-of-computing', pageController.renderMarkdownPage);

// --- Dev Tool Routes (have their own templates and logic) ---
router.get('/ygo-tool', pageController.renderYgoToolPage);
router.get('/ascii-art-tool', pageController.renderAsciiArtToolPage);

export default router;