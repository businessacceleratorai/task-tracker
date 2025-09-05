# 🚀 Work Tracker - Full-Stack Task Management Application

A comprehensive work tracking application built with Next.js, PostgreSQL, and modern authentication. Features task management, timers, reminders, and user authentication with data persistence.

![Work Tracker Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Work+Tracker+Demo)

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** - Secure account creation and authentication
- **JWT Token Authentication** - Secure session management with HTTP-only cookies
- **Password Security** - Bcrypt hashing for secure password storage
- **Session Persistence** - Users stay logged in across browser sessions
- **Data Isolation** - Each user has their own secure workspace

### 📋 Task Management
- **Create Tasks** - Add new tasks with timestamps
- **Task Status** - Mark tasks as pending or completed
- **Task Organization** - Two-column layout (Pending vs Completed)
- **Task Actions** - Complete, delete, and manage tasks
- **Real-time Updates** - Instant UI updates with database persistence

### ⏱️ Timer System
- **Multiple Timers** - Create unlimited custom timers
- **Timer Controls** - Start, pause, reset, and delete timers
- **Custom Duration** - Set timers for any duration in minutes
- **Visual Feedback** - Real-time countdown display
- **Sound Notifications** - Audio alerts when timers complete
- **Timer Persistence** - Timers save state across sessions

### 🔔 Reminder System
- **One-time Reminders** - Set single-use reminders
- **Recurring Reminders** - Set repeating reminders
- **Flexible Intervals** - Configure intervals in minutes or hours
- **Active Management** - Pause/resume reminders as needed
- **Sound Alerts** - Audio notifications when reminders trigger
- **Smart Scheduling** - Automatic next trigger calculation

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on all devices
- **Beautiful Interface** - Modern design with Tailwind CSS
- **Dark/Light Theme Support** - Built-in theme switching
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages
- **Accessibility** - WCAG compliant interface

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Robust relational database
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing and security

### Authentication
- **JWT Tokens** - Secure authentication tokens
- **HTTP-Only Cookies** - Secure cookie-based sessions
- **Password Hashing** - Bcrypt for password security
- **Session Management** - Persistent user sessions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git for version control

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/work-tracker.git
cd work-tracker
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database Configuration
PGHOST=localhost
PGPORT=5432
PGDATABASE=work_tracker
PGUSER=your_username
PGPASSWORD=your_password

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
```

### 4. Database Setup
```bash
# Create database
createdb work_tracker

# Run database migrations (tables will be created automatically on first run)
npm run dev
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

The application uses PostgreSQL with the following tables:

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);
```

### Timers Table
```sql
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
```

### Reminders Table
```sql
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
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Timers
- `GET /api/timers` - Get user's timers
- `POST /api/timers` - Create new timer
- `PUT /api/timers/[id]` - Update timer
- `DELETE /api/timers/[id]` - Delete timer

### Reminders
- `GET /api/reminders` - Get user's reminders
- `POST /api/reminders` - Create new reminder
- `PUT /api/reminders/[id]` - Update reminder
- `DELETE /api/reminders/[id]` - Delete reminder

### Utility
- `DELETE /api/clear-all` - Clear all user data

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify
1. Build the application: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables
4. Set up PostgreSQL database

### Deploy to Railway
1. Connect GitHub repository
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy automatically

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **HTTP-Only Cookies** - Prevent XSS attacks
- **CSRF Protection** - Built-in Next.js protection
- **Data Validation** - Input sanitization and validation
- **SQL Injection Prevention** - Parameterized queries
- **User Data Isolation** - Complete data separation between users

## 🎯 Usage Guide

### Getting Started
1. **Register Account** - Create a new account with email and password
2. **Login** - Sign in to access your personal workspace
3. **Add Tasks** - Create tasks to track your work
4. **Set Timers** - Use timers for focused work sessions
5. **Create Reminders** - Set up notifications for important events

### Task Management
- Click "Add Task" to create new tasks
- Use "Complete" button to mark tasks as done
- Delete tasks you no longer need
- View pending and completed tasks in separate columns

### Timer Usage
- Create timers with custom names and durations
- Use Play/Pause buttons to control timers
- Reset timers to original duration
- Get audio notifications when timers complete

### Reminder System
- Set one-time or recurring reminders
- Configure intervals in minutes or hours
- Pause/resume reminders as needed
- Receive audio alerts when reminders trigger

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PostgreSQL](https://www.postgresql.org/) - Advanced open source database
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Built with ❤️ using Next.js, PostgreSQL, and modern web technologies**
