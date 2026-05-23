// I am Ironman
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  // Load saved theme and draft on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const savedDraft = localStorage.getItem('draft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setSourceText(draft.sourceText || '');
      setTranslatedText(draft.translatedText || '');
      setTargetLanguage(draft.targetLanguage || 'Spanish');
      setLastSaved(draft.lastSaved || null);
    }

    const savedHistory = localStorage.getItem('translationHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Save draft to localStorage
  const saveDraft = () => {
    const draft = {
      sourceText,
      translatedText,
      targetLanguage,
      lastSaved: new Date().toLocaleTimeString()
    };
    localStorage.setItem('draft', JSON.stringify(draft));
    setLastSaved(draft.lastSaved);
    alert('Draft saved!');
  };

  // Clear editors
  const clearEditors = () => {
    if (window.confirm('Are you sure you want to clear both editors?')) {
      setSourceText('');
      setTranslatedText('');
      localStorage.removeItem('draft');
      setLastSaved(null);
    }
  };

  // Export as TXT
  const exportAsTxt = () => {
    const content = `Source Text:\n${sourceText}\n\nTranslation (${targetLanguage}):\n${translatedText}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export as HTML
  const exportAsHtml = () => {
    const content = `
<!DOCTYPE html>
<html>
<head>
  <title>Translation</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    .section { margin-bottom: 30px; }
    .label { font-weight: bold; color: #666; margin-bottom: 10px; }
    .content { background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="section">
    <div class="label">Source Text:</div>
    <div class="content">${sourceText}</div>
  </div>
  <div class="section">
    <div class="label">Translation (${targetLanguage}):</div>
    <div class="content">${translatedText}</div>
  </div>
</body>
</html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save translation to history
  const saveToHistory = (source, translated, language) => {
    const newHistoryItem = {
      id: Date.now(),
      source,
      translated,
      language,
      timestamp: new Date().toLocaleString()
    };
    const updatedHistory = [newHistoryItem, ...history].slice(0, 50); // Keep last 50 items
    setHistory(updatedHistory);
    localStorage.setItem('translationHistory', JSON.stringify(updatedHistory));
  };

  // Load history item
  const loadFromHistory = (historyItem) => {
    setSourceText(historyItem.source);
    setTranslatedText(historyItem.translated);
    setTargetLanguage(historyItem.language);
    setShowHistory(false);
  };

  // Clear history
  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      localStorage.removeItem('translationHistory');
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, targetLanguage })
      });
      const data = await response.json();
      if (data.success) {
        setTranslatedText(data.data.translatedText);
        // Save to history
        saveToHistory(sourceText, data.data.translatedText, targetLanguage);
      } else {
        alert('Translation failed: ' + data.message);
      }
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation error. Please check if the backend is running.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Count words and characters
  const sourceWordCount = sourceText.trim() ? sourceText.trim().split(/\s+/).length : 0;
  const sourceCharCount = sourceText.length;
  const translatedWordCount = translatedText.trim() ? translatedText.trim().split(/\s+/).length : 0;
  const translatedCharCount = translatedText.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-violet-500 to-indigo-600' : 'bg-gradient-to-br from-violet-600 to-indigo-700'}`}>
              <span className="text-white text-xl font-bold">AI</span>
            </div>
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Localization Platform
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Powered by Gemini AI
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History ({history.length})
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className={`rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} mb-6`}>
          {/* Toolbar */}
          <div className={`p-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className={`appearance-none pl-4 pr-10 py-2.5 rounded-lg text-sm font-medium border cursor-pointer transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-white hover:border-slate-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <option value="Spanish">🇪🇸 Spanish</option>
                  <option value="French">🇫🇷 French</option>
                  <option value="German">🇩🇪 German</option>
                  <option value="Japanese">🇯🇵 Japanese</option>
                  <option value="Hindi">🇮🇳 Hindi</option>
                  <option value="Tamil">🇮🇳 Tamil</option>
                  <option value="Italian">🇮🇹 Italian</option>
                  <option value="Portuguese">🇧🇷 Portuguese</option>
                  <option value="Russian">🇷🇺 Russian</option>
                  <option value="Chinese">🇨🇳 Chinese</option>
                  <option value="Korean">🇰🇷 Korean</option>
                  <option value="Arabic">🇸🇦 Arabic</option>
                </select>
                <svg className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>

              <button
                onClick={saveDraft}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isDarkMode 
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save
              </button>

              <button
                onClick={clearEditors}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isDarkMode 
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            </div>
          </div>

          {/* Editors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  Source
                </label>
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {sourceWordCount} words · {sourceCharCount} chars
                </span>
              </div>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className={`w-full p-4 rounded-xl border resize-none transition-all focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                style={{ minHeight: '280px' }}
              />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  Translation ({targetLanguage})
                </label>
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {translatedWordCount} words · {translatedCharCount} chars
                </span>
              </div>
              <textarea
                value={translatedText}
                onChange={(e) => setTranslatedText(e.target.value)}
                placeholder="Translation will appear here..."
                readOnly
                className={`w-full p-4 rounded-xl border resize-none transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 text-slate-300 placeholder-slate-500' 
                    : 'bg-slate-50/50 border-slate-200 text-slate-600 placeholder-slate-400'
                }`}
                style={{ minHeight: '280px' }}
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleTranslate}
                disabled={!sourceText.trim() || isTranslating}
                className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25"
              >
                {isTranslating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Translating...
                  </span>
                ) : 'Translate'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportAsTxt}
                  disabled={!translatedText}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  TXT
                </button>

                <button
                  onClick={exportAsHtml}
                  disabled={!translatedText}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 ${
                    isDarkMode 
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  HTML
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm ${isDarkMode ? 'bg-slate-900/50 text-slate-400' : 'bg-white/50 text-slate-500'}`}>
          <div className="flex items-center gap-4">
            <span>Total: {sourceWordCount + translatedWordCount} words</span>
            <span className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>-</span>
            <span>{sourceCharCount + translatedCharCount} characters</span>
          </div>
          {lastSaved && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Saved at {lastSaved}</span>
            </div>
          )}
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className={`mt-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className={`p-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between`}>
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Translation History
              </h2>
              <button
                onClick={clearHistory}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isDarkMode 
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                Clear All
              </button>
            </div>
            
            {history.length === 0 ? (
              <div className="p-8 text-center">
                <svg className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  No translation history yet
                </p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border-b last:border-b-0 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                      isDarkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}
                    onClick={() => loadFromHistory(item)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        isDarkMode 
                          ? 'bg-violet-500/10 text-violet-400' 
                          : 'bg-violet-100 text-violet-700'
                      }`}>
                        {item.language}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {item.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm mb-1 line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.source}
                    </p>
                    <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.translated}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
