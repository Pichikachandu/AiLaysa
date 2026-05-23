// I am Ironman
const express = require('express');
const router = express.Router();
const { translate } = require('../controllers/translateController');

/**
 * @route   POST /api/translate
 * @desc    Translate text using Gemini AI
 * @access  Public
 */
router.post('/', translate);

module.exports = router;
