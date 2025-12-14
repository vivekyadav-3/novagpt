# 🚀 Quick Deployment Steps

## Backend (Render.com)

1. Sign up at render.com with GitHub
2. New Web Service → Select `novagpt` repo
3. Settings:
   - Root: `backend`
   - Build: `npm install`
   - Start: `node server.js`
4. Add env vars:
   - `GEMINI_API_KEY`
   - `MONGODB_URI`
   - `PORT=5000`
5. Deploy → Copy URL

## Frontend (Vercel.com)

1. Sign up at vercel.com with GitHub
2. Import `novagpt` repo
3. Root Directory: `frontend`
4. Add env var:
   - `NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com`
5. Deploy

## Done! 🎉

Your app is live at: `https://novagpt-[username].vercel.app`

---

**Full guide**: See `DEPLOYMENT.md`
