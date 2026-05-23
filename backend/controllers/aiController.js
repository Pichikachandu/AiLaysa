// I am Ironman
const { getGeminiService } = require('../services/geminiService');

/**
 * AI improvement endpoint
 * Handles various AI text improvements
 */
exports.improveText = async (req, res) => {
  try {
    const { text, action } = req.body;

    // Validation
    if (!text || !action) {
      return res.status(400).json({
        success: false,
        message: 'Text and action are required'
      });
    }

    if (text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Text cannot be empty'
      });
    }

    const geminiService = getGeminiService();
    let result;

    // Route to appropriate AI function
    switch (action) {
      case 'simplify':
        result = await geminiService.simplify(text);
        break;
      case 'professional':
        result = await geminiService.makeProfessional(text);
        break;
      case 'seo':
        result = await geminiService.optimizeSEO(text);
        break;
      case 'grammar':
        result = await geminiService.fixGrammar(text);
        break;
      case 'summarize':
        result = await geminiService.summarize(text);
        break;
      case 'expand':
        result = await geminiService.expand(text);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action. Supported actions: simplify, professional, seo, grammar, summarize, expand'
        });
    }

    res.status(200).json({
      success: true,
      data: {
        originalText: text,
        improvedText: result,
        action
      }
    });

  } catch (error) {
    console.error('AI improvement error:', error);
    res.status(500).json({
      success: false,
      message: 'AI improvement failed',
      error: error.message
    });
  }
};
