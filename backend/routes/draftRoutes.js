// I am Ironman
const express = require('express');
const router = express.Router();
const {
  saveDraft,
  getLatestDraft,
  getAllDrafts,
  deleteDraft
} = require('../controllers/draftController');

/**
 * @route   POST /api/drafts
 * @desc    Save a new draft
 * @access  Public
 */
router.post('/', saveDraft);

/**
 * @route   GET /api/drafts/latest
 * @desc    Get the latest draft
 * @access  Public
 */
router.get('/latest', getLatestDraft);

/**
 * @route   GET /api/drafts
 * @desc    Get all drafts (paginated)
 * @access  Public
 */
router.get('/', getAllDrafts);

/**
 * @route   DELETE /api/drafts/:id
 * @desc    Delete a draft
 * @access  Public
 */
router.delete('/:id', deleteDraft);

module.exports = router;
