// I am Ironman
const Draft = require('../models/Draft');

/**
 * Save a new draft
 */
exports.saveDraft = async (req, res) => {
  try {
    const { sourceText, translatedText, sourceLanguage, targetLanguage } = req.body;

    // Validation
    if (!sourceText || !translatedText || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Source text, translated text, and target language are required'
      });
    }

    // Calculate word and character count
    const wordCount = translatedText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characterCount = translatedText.length;

    // Create new draft
    const draft = await Draft.create({
      sourceText,
      translatedText,
      sourceLanguage: sourceLanguage || 'English',
      targetLanguage,
      wordCount,
      characterCount
    });

    res.status(201).json({
      success: true,
      data: draft,
      message: 'Draft saved successfully'
    });

  } catch (error) {
    console.error('Save draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save draft',
      error: error.message
    });
  }
};

/**
 * Get the latest draft
 */
exports.getLatestDraft = async (req, res) => {
  try {
    const latestDraft = await Draft.findOne().sort({ createdAt: -1 });

    if (!latestDraft) {
      return res.status(404).json({
        success: false,
        message: 'No drafts found'
      });
    }

    res.status(200).json({
      success: true,
      data: latestDraft
    });

  } catch (error) {
    console.error('Get latest draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve draft',
      error: error.message
    });
  }
};

/**
 * Get all drafts (paginated)
 */
exports.getAllDrafts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const drafts = await Draft.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Draft.countDocuments();

    res.status(200).json({
      success: true,
      data: drafts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get all drafts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve drafts',
      error: error.message
    });
  }
};

/**
 * Delete a draft
 */
exports.deleteDraft = async (req, res) => {
  try {
    const { id } = req.params;

    const draft = await Draft.findByIdAndDelete(id);

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: 'Draft not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Draft deleted successfully'
    });

  } catch (error) {
    console.error('Delete draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete draft',
      error: error.message
    });
  }
};
