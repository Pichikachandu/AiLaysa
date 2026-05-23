// I am Ironman

/**
 * Prompt templates for Gemini AI
 * Centralized prompt management for consistency and easy updates
 */

const PROMPTS = {
  // Translation prompt
  TRANSLATION: (text, targetLanguage) => {
    return `You are a professional translator. Translate the following text to ${targetLanguage}.
    
    Requirements:
    - Preserve the original meaning and tone
    - Maintain formatting (paragraphs, line breaks)
    - Use natural, native-level language
    - Do not add explanations or notes
    - Return ONLY the translated text
    
    Text to translate:
    ${text}`;
  },

  // Simplify text
  SIMPLIFY: (text) => {
    return `You are a writing assistant. Simplify the following text to make it easier to understand.
    
    Requirements:
    - Use simpler vocabulary
    - Shorter sentences where appropriate
    - Maintain the original meaning
    - Keep the same structure/formatting
    - Return ONLY the simplified text
    
    Text:
    ${text}`;
  },

  // Professional tone
  PROFESSIONAL: (text) => {
    return `You are a professional editor. Rewrite the following text in a professional, business-appropriate tone.
    
    Requirements:
    - Use formal, professional language
    - Maintain clarity and precision
    - Keep the original meaning intact
    - Preserve formatting
    - Return ONLY the rewritten text
    
    Text:
    ${text}`;
  },

  // SEO optimization
  SEO: (text) => {
    return `You are an SEO expert. Optimize the following text for search engines.
    
    Requirements:
    - Improve readability and engagement
    - Use clear, descriptive language
    - Maintain the core message
    - Keep formatting intact
    - Return ONLY the optimized text
    
    Text:
    ${text}`;
  },

  // Grammar fix
  GRAMMAR: (text) => {
    return `You are a grammar expert. Fix any grammatical errors in the following text.
    
    Requirements:
    - Correct grammar, spelling, and punctuation
    - Maintain the original style and tone
    - Preserve formatting
    - Return ONLY the corrected text
    
    Text:
    ${text}`;
  },

  // Summarize
  SUMMARIZE: (text) => {
    return `You are a content expert. Provide a concise summary of the following text.
    
    Requirements:
    - Capture the main points
    - Keep it brief and clear
    - Use bullet points if appropriate
    - Return ONLY the summary
    
    Text:
    ${text}`;
  },

  // Expand content
  EXPAND: (text) => {
    return `You are a content writer. Expand the following text with more detail and context.
    
    Requirements:
    - Add relevant details and examples
    - Maintain the original structure
    - Keep the tone consistent
    - Preserve formatting
    - Return ONLY the expanded text
    
    Text:
    ${text}`;
  }
};

module.exports = PROMPTS;
