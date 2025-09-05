# 🚀 Complete Deployment Guide for Work Tracker

This guide provides step-by-step instructions for deploying the Work Tracker application to various hosting platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ PostgreSQL database (we'll set this up)
- ✅ Code pushed to GitHub repository

## 🎯 Recommended Deployment: Vercel + Supabase (Free Tier)

This is the **BEST FREE OPTION** with excellent performance and reliability.

### Step 1: Set Up Database (Supabase - Free)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub account
   - Click "New Project"

2. **Create Database**
   - Project Name: `work-tracker`
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
   - Click "Create new project"

3. **Get Database Connection Details**
   - Go to Settings → Database
   - Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

4. **Create Database Tables**
   - Go to SQL Editor in Supabase
   - Run this SQL script:

```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Create timers table
CREATE TABLE timers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  remaining INTEGER NOT NULL,
  is_running BOOLEAN DEFAULT FALSE,
  is_completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reminders table
CREATE TABLE reminders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL,
  interval_seconds INTEGER NOT NULL,
  next_trigger TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_timers_user_id ON timers(user_id);
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
CREATE INDEX idx_reminders_next_trigger ON reminders(next_trigger);
```

### Step 2: Deploy to Vercel (Free)

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit with authentication system"
   git branch -M main
   git remote add origin https://github.com/yourusername/work-tracker.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub account
   - Click "New Project"
   - Import your `work-tracker` repository
   - Click "Deploy"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to your project
   - Go to Settings → Environment Variables
   - Add these variables:

   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   JWT_SECRET=your-super-secure-jwt-secret-key-make-it-very-long-and-random-123456789
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=another-secure-secret-for-nextauth-different-from-jwt
   ```

4. **Redeploy**
   - Go to Deployments tab
   - Click "Redeploy" to apply environment variables

### Step 3: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://work-tracker-xyz.vercel.app`)
2. Register a new account
3. Test all features (tasks, timers, reminders)
4. Verify data persistence by logging out and back in

---

## 🌐 Alternative Deployment Options

### Option 2: Netlify + Railway (Free Tier)

#### Database Setup (Railway)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project → Add PostgreSQL
4. Copy the connection string from Variables tab

#### Deploy to Netlify
1. Build the app: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `.next` folder
4. Configure environment variables in Site Settings

### Option 3: Render (All-in-One Free)

1. Go to [render.com](https://render.com)
2. Create PostgreSQL database (free tier)
3. Create Web Service from GitHub repo
4. Configure environment variables
5. Deploy automatically

---

## 🔧 Environment Variables Reference

### Required Variables
```env
# Database (use DATABASE_URL for most platforms)
DATABASE_URL=postgresql://username:password@host:port/database

# OR individual database variables
PGHOST=your-db-host
PGPORT=5432
PGDATABASE=work_tracker
PGUSER=your-username
PGPASSWORD=your-password

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret
```

### How to Generate Secure Secrets
```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Quick Deploy Commands

### Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit with authentication system"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/work-tracker.git
git branch -M main
git push -u origin main
```

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Run development server
npm run dev
```

### Build for Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL is correct
   - Check if database tables are created
   - Ensure database allows external connections

2. **Authentication Not Working**
   - Verify JWT_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Ensure cookies are enabled

3. **Build Errors**
   - Run `npm run build` locally first
   - Check for TypeScript errors
   - Verify all dependencies are installed

4. **Environment Variables Not Loading**
   - Redeploy after adding variables
   - Check variable names match exactly
   - Ensure no trailing spaces in values

### Database Connection Test
```javascript
// Test database connection
const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Database connection failed:', err)
  else console.log('Database connected:', res.rows[0])
  pool.end()
})
```

---

## 📊 Performance Optimization

### For Production
1. **Enable Compression** - Most platforms do this automatically
2. **CDN Integration** - Vercel/Netlify include CDN
3. **Database Indexing** - Already included in SQL schema
4. **Image Optimization** - Next.js handles this automatically

### Monitoring
- **Vercel Analytics** - Built-in performance monitoring
- **Supabase Dashboard** - Database performance metrics
- **Error Tracking** - Consider adding Sentry for error monitoring

---

## 🎉 Success Checklist

After deployment, verify:
- ✅ Application loads without errors
- ✅ User registration works
- ✅ User login/logout works
- ✅ Tasks can be created and managed
- ✅ Timers function correctly
- ✅ Reminders can be set and triggered
- ✅ Data persists across sessions
- ✅ Multiple users have isolated data
- ✅ All API endpoints respond correctly
- ✅ HTTPS is enabled (automatic on most platforms)

---

## 🆘 Support

If you encounter issues:
1. Check the deployment platform's logs
2. Verify environment variables are set correctly
3. Test database connection separately
4. Check GitHub repository for latest updates
5. Review this guide for missed steps

**Your Work Tracker app should now be live and fully functional! 🎉**
