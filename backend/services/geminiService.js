// I am Ironman
const { GoogleGenerativeAI } = require('@google/generative-ai');
const PROMPTS = require('../utils/prompts');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });
  }

  /**
   * Generate content using Gemini AI
   */
  async generateContent(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean up the response - remove any markdown code blocks if present
      return text.replace(/```[\w]*\n?/g, '').trim();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  /**
   * Translate text to target language
   */
  async translate(text, targetLanguage) {
    const prompt = PROMPTS.TRANSLATION(text, targetLanguage);
    return await this.generateContent(prompt);
  }

  /**
   * Simplify text
   */
  async simplify(text) {
    const prompt = PROMPTS.SIMPLIFY(text);
    return await this.generateContent(prompt);
  }

  /**
   * Make text professional
   */
  async makeProfessional(text) {
    const prompt = PROMPTS.PROFESSIONAL(text);
    return await this.generateContent(prompt);
  }

  /**
   * Optimize for SEO
   */
  async optimizeSEO(text) {
    const prompt = PROMPTS.SEO(text);
    return await this.generateContent(prompt);
  }

  /**
   * Fix grammar
   */
  async fixGrammar(text) {
    const prompt = PROMPTS.GRAMMAR(text);
    return await this.generateContent(prompt);
  }

  /**
   * Summarize text
   */
  async summarize(text) {
    const prompt = PROMPTS.SUMMARIZE(text);
    return await this.generateContent(prompt);
  }

  /**
   * Expand content
   */
  async expand(text) {
    const prompt = PROMPTS.EXPAND(text);
    return await this.generateContent(prompt);
  }
}

// Singleton instance
let geminiServiceInstance = null;

const getGeminiService = () => {
  if (!geminiServiceInstance) {
    geminiServiceInstance = new GeminiService();
  }
  return geminiServiceInstance;
};

module.exports = { GeminiService, getGeminiService };
