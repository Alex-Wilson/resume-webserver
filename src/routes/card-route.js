const express = require('express');
const router = express.Router();
const cardService = require('../services/cardService');
const { CARD_TYPES, MONSTER_RACES, ATTRIBUTES, SPELL_TYPES, TRAP_TYPES } = require('../utils/queryBuilder');

// Debug flag
const DEBUG = true;

// Debug logger
function log(message, data = null) {
    if (DEBUG) {
        console.log(`\n[CardRoutes] ${message}`);
        if (data) console.log(JSON.stringify(data, null, 2));
    }
}

// Middleware to log requests
router.use((req, res, next) => {
    log(`${req.method} ${req.path}`, { 
        query: req.query,
        params: req.params,
        body: req.body 
    });
    next();
});

// Error handler middleware
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        log('Error in route:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: DEBUG ? error.message : undefined
        });
    });
};

// GET /api/cards/search
router.get('/search', asyncHandler(async (req, res) => {
    log('Handling search request', req.query);

    const searchParams = {
        cardName: req.query.cardName,
        setCode: req.query.setCode,
        rarity: req.query.rarity,
        cardType: req.query.cardType,
        race: req.query.race,
        attribute: req.query.attribute,
        spellType: req.query.spellType,
        trapType: req.query.trapType,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 50
    };

    const result = await cardService.searchCards(searchParams);

    res.json({
        success: true,
        data: result.cards,
        pagination: {
            page: result.page,
            totalPages: result.totalPages,
            total: result.total
        }
    });
}));

// GET /api/cards/:setCode
router.get('/:setCode', asyncHandler(async (req, res) => {
    log('Handling get card by set code request', { setCode: req.params.setCode });

    const card = await cardService.getCardBySetCode(req.params.setCode);

    if (!card) {
        return res.status(404).json({
            success: false,
            error: 'Card not found'
        });
    }

    res.json({
        success: true,
        data: card
    });
}));

// GET /api/cards/filter-options/all
router.get('/filter-options/all', asyncHandler(async (req, res) => {
    log('Handling get filter options request');

    res.json({
        success: true,
        data: {
            cardTypes: Object.values(CARD_TYPES),
            monsterRaces: MONSTER_RACES,
            attributes: ATTRIBUTES,
            spellTypes: SPELL_TYPES,
            trapTypes: TRAP_TYPES,
            rarities: [
                'Common',
                'Rare',
                'Super Rare',
                'Ultra Rare',
                'Secret Rare',
                'Ultimate Rare',
                'Ghost Rare',
                'Platinum Rare',
                'Gold Rare',
                'Collector\'s Rare',
                'Starlight Rare',
                'Prismatic Secret Rare'
            ]
        }
    });
}));

// GET /api/cards/stats
router.get('/stats', asyncHandler(async (req, res) => {
    log('Handling get card stats request');

    const stats = await cardService.getCardStats();

    res.json({
        success: true,
        data: stats
    });
}));

// Error handling middleware
router.use((err, req, res, next) => {
    log('Error caught in middleware:', err);
    
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal server error',
        details: DEBUG ? {
            stack: err.stack,
            details: err.details
        } : undefined
    });
});

module.exports = router;