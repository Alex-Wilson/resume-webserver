// src/routes/mainRoutes.js

import express from 'express';
import * as mainController from '../controllers/mainController.js';

const router = express.Router();

// Define the routes for your main pages
router.get('/', mainController.renderHomePage);
router.get('/resume', mainController.serveResumePdf);
router.get('/certifications', mainController.renderCertificationsPage);
router.get('/README', mainController.renderReadmePage);


export default router;