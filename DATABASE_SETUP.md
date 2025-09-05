# 🗄️ Database Setup Guide for Work Tracker

This guide covers setting up your Work Tracker application with either **Supabase** (recommended for beginners) or **PostgreSQL** (for advanced users).

## 📋 Table of Contents

1. [Option 1: Supabase Setup (Recommended)](#option-1-supabase-setup-recommended)
2. [Option 2: PostgreSQL Setup (Advanced)](#option-2-postgresql-setup-advanced)
3. [Database Schema & Migration](#database-schema--migration)
4. [Environment Variables](#environment-variables)
5. [Testing Connection](#testing-connection)
6. [Troubleshooting](#troubleshooting)

---

## Option 1: Supabase Setup (Recommended)

### 🚀 Why Supabase?
- **Free tier available** (up to 500MB database)
- **Managed PostgreSQL** - no server maintenance
- **Built-in authentication** (optional)
- **Real-time features** (optional)
- **Easy deployment** with Netlify/Vercel

### Step 1: Create Supabase Account

1. **Go to** [supabase.com](https://supabase.com)
2. **Click "Start your project"**
3. **Sign up** with GitHub, Google, or email
4. **Verify your email** if required

### Step 2: Create New Project

1. **Click "New Project"**
2. **Fill in project details:**
   - **Name:** `work-tracker` (or your preferred name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (for development)
3. **Click "Create new project"**
4. **Wait 2-3 minutes** for project setup

### Step 3: Get Connection Details

1. **Go to Settings** → **Database**
2. **Copy the following values:**
   ```
   Host: db.xxxxxxxxxxxxx.supabase.co
   Database name: postgres
   Port: 5432
   User: postgres
   Password: [your-password-from-step-2]
   ```
3. **Also copy the Connection String:**
   ```
   postgresql://postgres:[password]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```

### Step 4: Set Environment Variables

Create/update your `.env.local` file:

```env
# Supabase Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
PGHOST="db.[YOUR-PROJECT-REF].supabase.co"
PGDATABASE="postgres"
PGUSER="postgres"
PGPASSWORD="[YOUR-PASSWORD]"
PGPORT="5432"

# JWT Secret (generate a random 32+ character string)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# App Configuration
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 5: Run Database Migration

```bash
# Navigate to your project directory
cd work-tracker

# Install dependencies if not already done
npm install

# Run the database migration
npm run db:migrate
```

---

## Option 2: PostgreSQL Setup (Advanced)

### 🔧 Local PostgreSQL Installation

#### For Windows:
1. **Download** PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. **Run installer** and follow setup wizard
3. **Remember the password** you set for `postgres` user
4. **Add to PATH** (usually done automatically)

#### For macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Create database user
createuser -s postgres
```

#### For Linux (Ubuntu/Debian):
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user and create database
sudo -u postgres psql
```

### Step 2: Create Database and User

```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE work_tracker;

-- Create user with password
CREATE USER work_tracker_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE work_tracker TO work_tracker_user;

-- Exit
\q
```

### Step 3: Configure Environment Variables

Create/update your `.env.local` file:

```env
# Local PostgreSQL Configuration
DATABASE_URL="postgresql://work_tracker_user:your_secure_password@localhost:5432/work_tracker"
PGHOST="localhost"
PGDATABASE="work_tracker"
PGUSER="work_tracker_user"
PGPASSWORD="your_secure_password"
PGPORT="5432"

# JWT Secret (generate a random 32+ character string)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# App Configuration
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Database Schema & Migration

### Automatic Migration (Recommended)

The project includes migration scripts. Run:

```bash
# Install dependencies
npm install

# Run migration
npm run db:migrate
```

### Manual Migration (If needed)

If automatic migration fails, run these SQL commands manually:

```sql
-- Connect to your database
psql -U [username] -d [database_name]

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create folders table
CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Note',
    content TEXT,
    folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create timers table
CREATE TABLE timers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    duration INTEGER DEFAULT 0,
    is_running BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reminders table
CREATE TABLE reminders (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reminder_time TIMESTAMP NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_folder_id ON notes(folder_id);
CREATE INDEX idx_folders_user_id ON folders(user_id);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_timers_user_id ON timers(user_id);
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
```

---

## Environment Variables

### Complete .env.local Template

```env
# Database Configuration (choose one)
# For Supabase:
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
PGHOST="db.[project-ref].supabase.co"
PGDATABASE="postgres"
PGUSER="postgres"
PGPASSWORD="[your-supabase-password]"
PGPORT="5432"

# For Local PostgreSQL:
# DATABASE_URL="postgresql://work_tracker_user:password@localhost:5432/work_tracker"
# PGHOST="localhost"
# PGDATABASE="work_tracker"
# PGUSER="work_tracker_user"
# PGPASSWORD="your_secure_password"
# PGPORT="5432"

# JWT Secret (REQUIRED - generate a random string)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random-at-least-32-characters"

# NextAuth Configuration
NEXTAUTH_SECRET="your-nextauth-secret-here-also-random"
NEXTAUTH_URL="http://localhost:3000"

# Optional: For production deployment
# NEXTAUTH_URL="https://your-domain.com"
```

### 🔐 Generating Secure Secrets

```bash
# Generate JWT_SECRET (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use online generator: https://generate-secret.vercel.app/32
```

---

## Testing Connection

### Test Database Connection

Create a test file to verify connection:

```bash
# Create test file
cat > test-db.js << 'EOF'
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully!');
    
    const result = await client.query('SELECT NOW()');
    console.log('📅 Current time:', result.rows[0].now);
    
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();
