# AI Localization Platform

A production-grade MERN stack application for AI-powered bilingual content editing and localization, inspired by DeepL, Grammarly, and Notion AI.

## 🌟 Features

### Core Features
- **Side-by-side Bilingual Editor**: Source editor on left, translated editor on right with responsive mobile layout
- **Multi-language Support**: Spanish, French, German, Japanese, Hindi, Tamil, Italian, Portuguese, Russian, Chinese, Korean, Arabic
- **Live Statistics**: Real-time word and character count for both editors
- **Smart Draft Management**: 
  - Save to localStorage
  - Save to MongoDB
  - Restore on reload
  - Auto-save every 10 seconds
- **Dark/Light Mode**: Smooth transitions with CSS variables and localStorage persistence

### Bonus Features
- **Real Gemini AI Translation**: Using Google's Gemini 1.5 Flash model for natural, fast translations
- **Segment Highlighting**: Click sentences in source to highlight matching translated sentences with smooth animations
- **Export Options**: Export as .txt or .html files using Blob API
- **AI Writing Assistant Sidebar**:
  - Simplify Text
  - Professional Tone
  - SEO Optimization
  - Grammar Fix
  - Summarize
  - Expand Content
- **Keyboard Shortcuts**:
  - `Ctrl + S` → Save Draft
  - `Ctrl + Enter` → Translate
  - `Ctrl + D` → Toggle Dark Mode
  - `Ctrl + /` → Show Keyboard Shortcuts
  - `Ctrl + Delete` → Clear Editors
- **Copy Button**: One-click copy to clipboard for translated text
- **Clear Button**: Clear editors with confirmation modal
- **Loading States**: Skeleton loaders, translate loading spinner, save indicators
- **Toast Notifications**: Using react-hot-toast for user feedback

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── translateController.js  # Translation endpoint logic
│   ├── draftController.js     # Draft CRUD operations
│   └── aiController.js        # AI improvement endpoints
├── middleware/
│   └── errorMiddleware.js     # Global error handling
├── models/
│   └── Draft.js               # Mongoose schema for drafts
├── routes/
│   ├── translateRoutes.js     # Translation API routes
│   ├── draftRoutes.js         # Draft API routes
│   └── aiRoutes.js            # AI improvement routes
├── services/
│   └── geminiService.js       # Gemini AI integration
├── utils/
│   └── prompts.js             # AI prompt templates
├── .env.example               # Environment variables template
├── package.json               # Backend dependencies
└── server.js                  # Express server entry point
```

### Frontend (React 19 + Vite + Tailwind CSS)
```
frontend/
├── public/                    # Static assets
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx           # Application header
│   │   ├── EditorPanel.jsx      # Text editor component
│   │   ├── LanguageSelector.jsx # Language dropdown
│   │   ├── FooterStats.jsx      # Statistics footer
│   │   ├── ThemeToggle.jsx      # Dark/light mode toggle
│   │   ├── TranslateButton.jsx  # Translation action button
│   │   ├── ExportButtons.jsx    # Export functionality
│   │   ├── SegmentHighlighter.jsx # Sentence highlighting
│   │   ├── AISidebar.jsx        # AI assistant sidebar
│   │   ├── DraftStatus.jsx      # Save status indicator
│   │   ├── LoadingSkeleton.jsx  # Loading state component
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── MasalaPacket.jsx     # Hidden fun feature
│   │   ├── ToastProvider.jsx    # Toast notification provider
│   │   ├── EmptyState.jsx       # Empty state display
│   │   ├── ActionToolbar.jsx    # Action buttons toolbar
│   │   └── KeyboardShortcuts.jsx # Shortcuts modal
│   ├── context/
│   │   └── ThemeContext.jsx     # Theme management context
│   ├── hooks/
│   │   ├── useAutoSave.js       # Auto-save hook
│   │   ├── useTheme.js          # Theme hook
│   │   └── useTranslation.js    # Translation hook
│   ├── pages/
│   │   └── Home.jsx             # Main application page
│   ├── services/
│   │   ├── api.js               # Axios configuration
│   │   ├── translationService.js # Translation API calls
│   │   └── draftService.js      # Draft API calls
│   ├── utils/
│   │   ├── exportUtils.js       # Export functionality
│   │   ├── textUtils.js         # Text analysis utilities
│   │   ├── storageUtils.js      # localStorage utilities
│   │   └── constants.js        # App constants
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Application entry point
│   ├── index.css               # Global styles with Tailwind
│   └── App.css                 # Custom CSS
├── package.json               # Frontend dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── postcss.config.js          # PostCSS configuration
```

## 🚀 Tech Stack

### Frontend
- **React 19**: Latest React with concurrent features
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **React Hot Toast**: Elegant toast notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **@google/generative-ai**: Gemini AI SDK
- **gemini-1.5-flash**: Fast AI model for translations

## 📸 Screenshots

*(Screenshots section - add actual screenshots after deployment)*

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Gemini API Key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### 1. Clone the Repository
```bash
git clone <repository-url>
cd frontend_second_round
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# GEMINI_API_KEY=your_gemini_api_key
# MONGO_URI=your_mongodb_uri
# PORT=5000
# FRONTEND_URL=http://localhost:5173

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Production Build

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ai-localization
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📜 API Endpoints

### Translation
- `POST /api/translate` - Translate text to target language

### Drafts
- `POST /api/drafts` - Save a new draft
- `GET /api/drafts/latest` - Get the latest draft
- `GET /api/drafts` - Get all drafts (paginated)
- `DELETE /api/drafts/:id` - Delete a draft

### AI Improvements
- `POST /api/ai/improve` - Improve text using AI (actions: simplify, professional, seo, grammar, summarize, expand)

## 🎯 Scripts

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Deployment Guide

### Quick Deployment
- **Frontend**: Deploy to Vercel (see [DEPLOYMENT.md](./DEPLOYMENT.md))
- **Backend**: Deploy to Render (see [DEPLOYMENT.md](./DEPLOYMENT.md))

### Backend Deployment (e.g., Render, Railway, Heroku)

1. Push code to GitHub
2. Connect your deployment platform to the repository
3. Set environment variables in the deployment platform
4. Deploy - the platform will automatically run `npm start`

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set `VITE_API_URL` to your production backend URL

### MongoDB Deployment
- Use MongoDB Atlas for cloud database
- Update `MONGO_URI` in environment variables

### Detailed Deployment Instructions
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide with step-by-step instructions.

## 🔮 Future Improvements

- [ ] User authentication and authorization
- [ ] Translation history and analytics
- [ ] Collaborative editing features
- [ ] Real-time translation with WebSocket
- [ ] Support for document uploads (PDF, DOCX)
- [ ] Translation memory for consistent terminology
- [ ] Batch translation for multiple files
- [ ] API rate limiting and caching
- [ ] Advanced AI features (tone detection, style matching)
- [ ] Integration with CAT tools
- [ ] Mobile app (React Native)
- [ ] Browser extension

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👏 Acknowledgments

- Inspired by DeepL, Grammarly, Notion AI, and Lokalise
- Built with Google's Gemini AI
- UI components inspired by shadcn/ui and Linear.app
- Icons from Lucide React

## 📞 Support

For support, email support@example.com or open an issue in the repository.

---

**Built with ❤️ for the AI Frontend Hackathon - May 2026**
