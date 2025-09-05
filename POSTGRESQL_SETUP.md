# 🐘 PostgreSQL Local Setup Guide

## Quick Local Setup

### Windows
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer, remember postgres password
3. Open Command Prompt as Administrator

### macOS
```bash
# Install with Homebrew
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Create Database

### Method 1: Command Line
```bash
# Connect as postgres user
psql -U postgres

# Create database and user
CREATE DATABASE work_tracker;
CREATE USER work_tracker_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE work_tracker TO work_tracker_user;
\q
```

### Method 2: Using createdb
```bash
createdb -U postgres work_tracker
```

## Environment Variables

Create `.env.local` file:

```env
# Local PostgreSQL
DATABASE_URL="postgresql://work_tracker_user:secure_password_123@localhost:5432/work_tracker"
PGHOST="localhost"
PGDATABASE="work_tracker"
PGUSER="work_tracker_user"
PGPASSWORD="secure_password_123"
PGPORT="5432"

# Generate random secrets
JWT_SECRET="your-random-jwt-secret-32-chars-minimum"
NEXTAUTH_SECRET="your-random-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Run Migration
```bash
npm install
npm run db:migrate
```

## Test Connection
```bash
# Test database connection
psql -U work_tracker_user -d work_tracker -c "SELECT NOW();"

# Start app
npm run dev
```

## Troubleshooting

### Connection Refused
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgres  # macOS

# Start if stopped
sudo systemctl start postgresql  # Linux
brew services start postgresql  # macOS
```

### Authentication Failed
- Check username/password in `.env.local`
- Verify user exists: `psql -U postgres -c "\du"`
- Reset password: `ALTER USER work_tracker_user PASSWORD 'new_password';`

### Database Not Found
```sql
-- Connect as postgres and create database
psql -U postgres
CREATE DATABASE work_tracker;
```

That's it! Your local PostgreSQL should be ready.
