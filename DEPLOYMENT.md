# 🚀 NovaGPT Deployment Guide

## Overview

This guide will help you deploy NovaGPT to production with:

- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas (Already set up)

---

## 📋 Prerequisites

- [x] GitHub account with novagpt repository
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] Render account (sign up at [render.com](https://render.com))
- [x] MongoDB Atlas database (already configured)
- [x] Gemini API key (already have)

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with GitHub

### Step 2: Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub account
3. Select the `novagpt` repository
4. Configure:
   - **Name**: `novagpt-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add:

```
GEMINI_API_KEY=your_actual_gemini_api_key
MONGODB_URI=your_actual_mongodb_connection_string
PORT=5000
```

**Important**: Use your REAL values from `backend/.env`

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait 2-5 minutes for deployment
3. Copy your backend URL (e.g., `https://novagpt-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with GitHub

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Import `novagpt` repository
3. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

### Step 3: Add Environment Variable

Click "Environment Variables" and add:

```
NEXT_PUBLIC_API_URL=https://novagpt-backend.onrender.com
```

**Replace with your actual Render backend URL from Part 1, Step 4**

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app will be live at `https://novagpt-[your-username].vercel.app`

---

## Part 3: Update Backend CORS

### After Frontend Deploys:

1. Copy your Vercel URL (e.g., `https://novagpt-vivekyadav-3.vercel.app`)

2. Go to Render Dashboard → Your Backend Service → Environment

3. The CORS is already configured to accept your Vercel domain!
   (We updated `server.js` to include `https://novagpt-vivekyadav-3.vercel.app`)

4. If your Vercel URL is different, update `backend/server.js` line 12:

   ```javascript
   const allowedOrigins = [
     "http://localhost:3000",
     "https://novagpt.vercel.app",
     "https://YOUR-ACTUAL-VERCEL-URL.vercel.app", // Update this
   ];
   ```

5. Commit and push:

   ```bash
   git add backend/server.js
   git commit -m "Update CORS for production frontend"
   git push origin main
   ```

6. Render will auto-redeploy (takes 2 minutes)

---

## Part 4: Test Your Deployment

### 1. Open Your Vercel URL

Visit: `https://novagpt-[your-username].vercel.app`

### 2. Test Features:

- [ ] Page loads with sidebar and chat area
- [ ] Send a test message
- [ ] AI responds with typing effect
- [ ] Message appears in sidebar
- [ ] Refresh page - history persists
- [ ] Delete a conversation

### 3. If Something Doesn't Work:

**Check Render Logs:**

1. Go to Render Dashboard
2. Click your service
3. Click "Logs" tab
4. Look for errors

**Check Vercel Logs:**

1. Go to Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. Click latest deployment → "View Function Logs"

**Common Issues:**

- **CORS Error**: Update `allowedOrigins` in `server.js`
- **API Not Found**: Check `NEXT_PUBLIC_API_URL` in Vercel env vars
- **MongoDB Error**: Verify `MONGODB_URI` in Render env vars
- **Gemini Error**: Verify `GEMINI_API_KEY` in Render env vars

---

## 🎉 Success Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS updated
- [ ] App works in production
- [ ] Chat history persists
- [ ] All features functional

---

## 📝 Important URLs to Save

**Production App**: `https://novagpt-[your-username].vercel.app`
**Backend API**: `https://novagpt-backend.onrender.com`
**GitHub Repo**: `https://github.com/vivekyadav-3/novagpt`

---

## 💡 Tips

1. **Free Tier Limitations:**

   - Render free tier sleeps after 15 min of inactivity
   - First request after sleep takes ~30 seconds
   - Vercel has no sleep time

2. **Custom Domain (Optional):**

   - Vercel: Settings → Domains → Add your domain
   - Render: Settings → Custom Domain

3. **Monitoring:**

   - Render provides basic metrics
   - Vercel provides analytics

4. **Updates:**
   - Push to GitHub `main` branch
   - Both Render and Vercel auto-deploy
   - Takes 2-3 minutes

---

## 🆘 Need Help?

If deployment fails:

1. Check the logs (Render/Vercel dashboards)
2. Verify all environment variables
3. Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
4. Check that your Gemini API key is valid

---

**Ready to deploy? Start with Part 1!** 🚀
