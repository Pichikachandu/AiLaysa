// I am Ironman
const express = require('express');
const router = express.Router();
const { improveText } = require('../controllers/aiController');

/**
 * @route   POST /api/ai/improve
 * @desc    Improve text using AI (simplify, professional, seo, grammar, summarize, expand)
 * @access  Public
 */
router.post('/improve', improveText);

module.exports = router;
