# Work Tracker - Deployment Guide

This guide provides step-by-step instructions for deploying the Work Tracker application to Netlify and Vercel.

## 🚀 Quick Overview

Work Tracker is a Next.js application with PostgreSQL database that includes:
- Task management
- Time tracking
- Reminders
- Notes with folder organization
- User authentication

## 📋 Prerequisites

Before deploying, ensure you have:
- GitHub account with the repository
- PostgreSQL database (we recommend Supabase or Neon for production)
- Environment variables configured

## 🔧 Environment Variables

Create these environment variables in your deployment platform:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=https://your-domain.com

# Node Environment
NODE_ENV=production
```

## 🗄️ Database Setup

### Option 1: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Run the migration scripts in SQL Editor:

```sql
-- Run these scripts in order:
-- 1. lib/db/auth-migration.sql
-- 2. lib/db/init.sql  
-- 3. lib/db/notes-migration.sql
-- 4. lib/db/notes-folders-migration.sql
```

### Option 2: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Run the same migration scripts

## 🌐 Netlify Deployment

### Method 1: Git Integration (Recommended)

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the `task-tracker` repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add all the environment variables listed above

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

### Method 2: Manual Deploy

1. **Build Locally**
   ```bash
   npm run build
   npm run export  # If using static export
   ```

2. **Upload to Netlify**
   - Drag and drop the `out` folder to Netlify

## ▲ Vercel Deployment

### Method 1: Git Integration (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: Leave empty (default)

3. **Add Environment Variables**
   - In the deployment configuration, add all environment variables
   - Or go to Project Settings > Environment Variables after deployment

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add JWT_SECRET
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   ```

## 🔍 Post-Deployment Checklist

### ✅ Verify Functionality
- [ ] Application loads without errors
- [ ] User registration/login works
- [ ] Database connection is established
- [ ] All tabs (Tasks, Timers, Reminders, Notes) are functional
- [ ] Notes folder creation and organization works
- [ ] Authentication persists across sessions

### ✅ Test Features
- [ ] Create and manage tasks
- [ ] Start/stop timers
- [ ] Add reminders
- [ ] Create folders and notes
- [ ] Move notes between folders
- [ ] Rich text editor functionality
- [ ] Search functionality

### ✅ Performance
- [ ] Page load times are acceptable
- [ ] Database queries are optimized
- [ ] Static assets are cached properly

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure all dependencies are in `package.json`
- Check TypeScript errors: `npm run type-check`
- Verify environment variables are set

**Database Connection Issues**
- Verify DATABASE_URL format
- Check database server is accessible
- Ensure migration scripts have been run

**Authentication Issues**
- Verify JWT_SECRET is set and secure
- Check NEXTAUTH_URL matches your domain
- Ensure cookies are working (check HTTPS)

**Notes Not Loading**
- Check database tables exist (folders, notes)
- Verify API endpoints are working
- Check browser console for errors

### Debug Commands

```bash
# Check build locally
npm run build

# Type checking
npm run type-check

# Test database connection
npm run db:test

# View logs
vercel logs  # For Vercel
netlify logs # For Netlify
```

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit secrets to Git
   - Use strong, unique JWT_SECRET
   - Rotate secrets regularly

2. **Database**
   - Use connection pooling
   - Enable SSL connections
   - Regular backups

3. **HTTPS**
   - Always use HTTPS in production
   - Configure proper CORS settings

## 📊 Monitoring

### Recommended Tools
- **Vercel Analytics** (for Vercel deployments)
- **Netlify Analytics** (for Netlify deployments)
- **Sentry** for error tracking
- **LogRocket** for user session recording

### Key Metrics to Monitor
- Page load times
- API response times
- Error rates
- User engagement
- Database performance

## 🚀 Performance Optimization

### Next.js Optimizations
- Enable Image Optimization
- Use Next.js built-in caching
- Implement ISR (Incremental Static Regeneration) where applicable

### Database Optimizations
- Add proper indexes
- Use connection pooling
- Implement query optimization

### Frontend Optimizations
- Code splitting
- Lazy loading
- Optimize bundle size

## 📞 Support

If you encounter issues during deployment:

1. Check the troubleshooting section above
2. Review deployment logs
3. Verify all environment variables
4. Test database connectivity
5. Check GitHub Issues for similar problems

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Application loads without errors
- ✅ All features work as expected
- ✅ Database operations are functional
- ✅ Authentication works properly
- ✅ Performance is acceptable
- ✅ Security measures are in place

---

**Repository:** https://github.com/businessacceleratorai/task-tracker
**Live Demo:** [Your deployed URL here]
**Last Updated:** September 2025
