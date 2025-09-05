# 📋 Work Tracker - Complete Task Management Solution

A modern, full-featured task management application built with Next.js, TypeScript, and PostgreSQL. Features task management, time tracking, reminders, and a sophisticated notes system with folder organization.

![Work Tracker](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Task Management
- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Task filtering and organization
- Persistent storage with PostgreSQL

### ⏱️ Time Tracking
- Start/stop timers for tasks
- Track time spent on different activities
- Timer history and analytics
- Real-time timer updates

### 🔔 Reminders
- Set reminders for important tasks
- Notification system
- Reminder management
- Due date tracking

### 📝 Advanced Notes System
- **Rich Text Editor** with full formatting support
- **Folder Organization** - Create and manage note folders
- **Drag & Drop** - Move notes between folders easily
- **Context Menus** - Right-click for quick actions
- **Search Functionality** - Find notes and folders quickly
- **Auto-save** with Ctrl+S support
- **Note Previews** with timestamps

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication
- Session management
- User isolation for multi-tenant support

### 🎨 Modern UI/UX
- **Responsive Design** - Works on all devices
- **Dark/Light Mode** support
- **Professional Interface** - Microsoft Word-like notes editor
- **Smooth Animations** - Enhanced user experience
- **Accessibility** - WCAG compliant

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/businessacceleratorai/task-tracker.git
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/work_tracker
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXTAUTH_SECRET=your-nextauth-secret-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Create database
   createdb work_tracker
   
   # Run migrations (in order)
   psql -d work_tracker -f lib/db/auth-migration.sql
   psql -d work_tracker -f lib/db/init.sql
   psql -d work_tracker -f lib/db/notes-migration.sql
   psql -d work_tracker -f lib/db/notes-folders-migration.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
work-tracker/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── folders/      # Folder management
│   │   ├── notes/        # Notes management
│   │   ├── tasks/        # Task management
│   │   ├── timers/       # Timer functionality
│   │   └── reminders/    # Reminder system
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── notes/            # Notes-specific components
│   │   ├── NotesPage.tsx        # Main notes page
│   │   ├── NotesWithFolders.tsx # Sidebar with folders
│   │   ├── FolderItem.tsx       # Individual folder component
│   │   ├── NotesEditor.tsx      # Notes editor container
│   │   └── RichTextEditor.tsx   # Rich text editor
│   ├── ui/               # Reusable UI components
│   └── ...               # Other components
├── lib/                  # Utilities and configurations
│   ├── db/              # Database utilities and migrations
│   ├── auth/            # Authentication utilities
│   └── utils.ts         # General utilities
├── public/              # Static assets
└── ...                  # Configuration files
```

## 🔧 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Robust relational database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Folders Table
```sql
CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  folder_id INTEGER REFERENCES folders(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Key Features Implemented

### ✅ Requirements Completed

1. **✅ "Clear All" button hidden on Notes tab**
   - Conditional rendering based on active tab
   - Button appears on Tasks/Timers/Reminders tabs
   - Hidden specifically on Notes tab

2. **✅ Functional folder creation button (📁)**
   - Creates new folders with default name "New Folder"
   - Database persistence
   - Real-time UI updates

3. **✅ Functional note creation button (+)**
   - Creates notes in specified folders
   - Rich text editor integration
   - Auto-save functionality

### 🚀 Enhanced Features Added

4. **✅ Advanced Folder Management**
   - Right-click context menus
   - Folder renaming with inline editing
   - Folder deletion with protection
   - Note count display

5. **✅ Note Organization**
   - Drag & drop between folders
   - Move notes via context menu
   - Search across folders and notes
   - Expandable folder tree

6. **✅ Rich Text Editor**
   - Bold, italic, underline formatting
   - Headers (H1, H2, H3)
   - Bullet and numbered lists
   - Text alignment options
   - Auto-save with Ctrl+S

## 🚀 Deployment

### Quick Deploy Options

#### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/businessacceleratorai/task-tracker)

#### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/businessacceleratorai/task-tracker)

### Manual Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for both Netlify and Vercel.

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### Test User Credentials
For development/testing:
- Email: `test@example.com`
- Password: `password123`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/businessacceleratorai/task-tracker/issues) page
2. Create a new issue if your problem isn't already reported
3. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Integration with external calendars
- [ ] Offline support with sync
- [ ] Advanced search with filters
- [ ] Export/import functionality
- [ ] API documentation

---

**Built with ❤️ by Business Accelerator AI**

**Repository:** https://github.com/businessacceleratorai/task-tracker
**Live Demo:** [Coming Soon]
**Last Updated:** September 2025
