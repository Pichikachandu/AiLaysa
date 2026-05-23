// I am Ironman
const mongoose = require('mongoose');

const DraftSchema = new mongoose.Schema({
  sourceText: {
    type: String,
    required: true,
    trim: true
  },
  translatedText: {
    type: String,
    required: true,
    trim: true
  },
  sourceLanguage: {
    type: String,
    default: 'English'
  },
  targetLanguage: {
    type: String,
    required: true
  },
  wordCount: {
    type: Number,
    default: 0
  },
  characterCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
DraftSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Draft', DraftSchema);
