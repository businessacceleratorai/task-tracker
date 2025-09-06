# 🚀 Work Tracker - Comprehensive Task Management Application

A modern, full-featured work tracking application built with Next.js, PostgreSQL, and TypeScript. Features task management, time tracking, reminders, and user authentication.

## ✨ Features

- **🔐 User Authentication** - Secure registration and login with JWT tokens
- **📋 Task Management** - Create, update, delete, and organize tasks
- **⏱️ Time Tracking** - Track time spent on tasks with start/stop functionality
- **🔔 Reminders** - Set reminders for important tasks and deadlines
- **📊 Dashboard** - Overview of tasks, time entries, and productivity metrics
- **🎨 Modern UI** - Clean, responsive design with dark/light mode support
- **🔒 Secure** - Password hashing, HTTP-only cookies, and JWT authentication

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, PostgreSQL
- **Authentication**: bcryptjs, jsonwebtoken
- **UI Components**: shadcn/ui, Radix UI
- **Database**: PostgreSQL (local development), Supabase (production)
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 8+
- PostgreSQL installed locally
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/businessacceleratorai/task-tracker.git
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup local PostgreSQL database**
   ```bash
   # Create database and run migrations
   npm run db:setup
   
   # Or manually:
   createdb -h localhost work_tracker
   npm run db:migrate
   ```

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your database credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/work_tracker
PGHOST=localhost
PGPORT=5432
PGDATABASE=work_tracker
PGUSER=user
PGPASSWORD=password

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## 🚀 Deployment

### Vercel + Supabase Deployment

1. **Setup Supabase Database**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your database URL from Settings > Database
   - Run the migration script on your Supabase database

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     ```
     DATABASE_URL=your-supabase-database-url
     JWT_SECRET=your-production-jwt-secret
     NEXTAUTH_SECRET=your-production-nextauth-secret
     NEXTAUTH_URL=https://your-app.vercel.app
     NODE_ENV=production
     ```

3. **Deploy**
   - Push to main branch to trigger automatic deployment
   - Vercel will build and deploy your application

## 📁 Project Structure

```
work-tracker/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...
├── lib/                  # Utility libraries
│   ├── auth/             # Authentication utilities
│   ├── db/               # Database utilities
│   └── ...
├── public/               # Static assets
└── ...
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:setup` - Create database and run migrations

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User accounts and authentication
- **tasks** - Task management and organization
- **time_entries** - Time tracking records
- **reminders** - Task reminders and notifications

## 🔐 Authentication

- **Registration**: Email/password with secure password hashing
- **Login**: JWT token-based authentication
- **Security**: HTTP-only cookies, password validation, secure headers
- **Session**: 7-day token expiration with automatic refresh

## 🎨 UI Components

Built with modern, accessible components:

- **shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/businessacceleratorai/task-tracker/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] Advanced reporting and analytics
- [ ] Integration with external calendars
- [ ] API documentation and public API
- [ ] Automated testing suite

---

**Built with ❤️ using Next.js, PostgreSQL, and modern web technologies.**
