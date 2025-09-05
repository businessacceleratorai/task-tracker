# 🚀 Supabase Database Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub/Google/Email

### Step 2: Create Project
1. Click "New Project"
2. Name: `work-tracker`
3. Create strong password (SAVE THIS!)
4. Choose region closest to you
5. Click "Create new project"
6. Wait 2-3 minutes

### Step 3: Get Connection Details
1. Go to Settings → Database
2. Copy these values:
   - Host: `db.xxxxxxxxxxxxx.supabase.co`
   - Database: `postgres`
   - Port: `5432`
   - User: `postgres`
   - Password: [your password from step 2]

### Step 4: Update Environment Variables
Create `.env.local` file in your project root:

```env
# Replace [PASSWORD] and [PROJECT-REF] with your actual values
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
PGHOST="db.[PROJECT-REF].supabase.co"
PGDATABASE="postgres"
PGUSER="postgres"
PGPASSWORD="[PASSWORD]"
PGPORT="5432"

# Generate random 32+ character strings for these:
JWT_SECRET="your-random-jwt-secret-here-32-chars-minimum"
NEXTAUTH_SECRET="your-random-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 5: Run Migration
```bash
npm install
npm run db:migrate
```

### Step 6: Test
```bash
npm run dev
# Visit http://localhost:3000
# Register and test features
```

## For Production Deployment

### Netlify/Vercel Environment Variables:
Add all the same variables from `.env.local` to your deployment platform:
- DATABASE_URL
- PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT
- JWT_SECRET, NEXTAUTH_SECRET
- NEXTAUTH_URL (change to your production URL)

## Generate Secrets
```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Troubleshooting
- **Connection failed**: Check password and project reference
- **Migration failed**: Run SQL manually in Supabase SQL editor
- **Auth issues**: Verify JWT_SECRET is set and 32+ characters

That's it! Your database should be ready.
