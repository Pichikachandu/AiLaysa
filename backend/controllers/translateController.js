// I am Ironman
const { getGeminiService } = require('../services/geminiService');

/**
 * Translate text using Gemini AI
 */
exports.translate = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    // Validation
    if (!text || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Text and target language are required'
      });
    }

    if (text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Text cannot be empty'
      });
    }

    // Get Gemini service and translate
    const geminiService = getGeminiService();
    const translatedText = await geminiService.translate(text, targetLanguage);

    res.status(200).json({
      success: true,
      data: {
        originalText: text,
        translatedText,
        targetLanguage
      }
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      success: false,
      message: 'Translation failed',
      error: error.message
    });
  }
};
