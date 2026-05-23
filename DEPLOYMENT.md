# Deployment Guide

This guide covers deploying the AI Localization Platform to production.

## 🚀 Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))
- GitHub repository with the code
- Backend API URL (from Render deployment)

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the Vite configuration
   - Configure environment variables:
     - `VITE_API_URL`: Your backend Render URL (e.g., `https://ai-localization-backend.onrender.com/api`)
   - Click "Deploy"

3. **Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
   - Redeploy after adding variables

### Vercel Configuration
The `client/vercel.json` file handles:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing with rewrites

---

## 🌐 Backend Deployment (Render)

### Prerequisites
- Render account (free at [render.com](https://render.com))
- MongoDB Atlas account (free tier available)
- Gemini AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Set up MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user with username/password
   - Get your connection string (URI)
   - Whitelist Render's IP addresses (0.0.0.0/0 for testing)

3. **Deploy to Render**
   - Go to [render.com](https://render.com) and sign in
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `ai-localization-backend`
     - **Region**: Choose nearest region
     - **Branch**: `main`
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`
     - `MONGO_URI`: Your MongoDB connection string
     - `GEMINI_API_KEY`: Your Gemini API key
     - `FRONTEND_URL`: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
   - Click "Deploy Web Service"

4. **Get your Backend URL**
   - After deployment, Render will provide a URL like:
     `https://ai-localization-backend.onrender.com`
   - Use this URL for the frontend's `VITE_API_URL`

### Render Configuration
The `backend/render.yaml` file handles:
- Build and start commands
- Environment variable setup
- Free tier configuration

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=10000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (.env)
```env
VITE_API_URL=https://ai-localization-backend.onrender.com/api
```

---

## 📋 Deployment Checklist

### Before Deployment
- [ ] Update `backend/.env.example` with production-ready values (remove actual secrets)
- [ ] Update `client/.env.example` with production API URL placeholder
- [ ] Test the application locally
- [ ] Ensure all dependencies are in package.json
- [ ] Verify MongoDB connection string works
- [ ] Verify Gemini API key is valid

### Frontend (Vercel)
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] `VITE_API_URL` environment variable set
- [ ] Build successful
- [ ] Deployed URL accessible

### Backend (Render)
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] MongoDB URI obtained
- [ ] Render web service created
- [ ] All environment variables set
- [ ] Build successful
- [ ] Health check endpoint accessible
- [ ] API endpoints working

---

## 🧪 Testing After Deployment

### Backend Health Check
```bash
curl https://ai-localization-backend.onrender.com/health
```

### Frontend
- Visit your Vercel URL
- Test translation feature
- Verify dark/light mode works
- Check history functionality
- Test export features

---

## 🔄 Updating Deployments

### Frontend
- Push changes to GitHub
- Vercel auto-deploys on push
- Or trigger manual deploy from Vercel dashboard

### Backend
- Push changes to GitHub
- Render auto-deploys on push
- Or trigger manual deploy from Render dashboard

---

## 🐛 Troubleshooting

### Frontend Issues
- **API errors**: Check `VITE_API_URL` in Vercel environment variables
- **Build fails**: Check build logs in Vercel dashboard
- **Blank page**: Check browser console for errors

### Backend Issues
- **Connection refused**: Check PORT environment variable
- **MongoDB connection failed**: Verify MONGO_URI and IP whitelist
- **API errors**: Check Render logs and environment variables
- **CORS errors**: Verify FRONTEND_URL matches your Vercel URL

---

## 📞 Support

For deployment issues:
- Vercel: [docs.vercel.com](https://docs.vercel.com)
- Render: [render.com/docs](https://render.com/docs)
- MongoDB: [docs.mongodb.com](https://docs.mongodb.com)
- Gemini AI: [ai.google.dev](https://ai.google.dev)

---

**Last Updated**: May 2026
