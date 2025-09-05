# Task Tracker - Work Productivity Application

A comprehensive work tracker application built with Next.js, TypeScript, and PostgreSQL. Features task management, multiple timers, and reminder system with sound notifications.

## Features

### Task Management
- **Two-column layout**: Pending (light yellow background) and Completed tasks
- **Click-to-add**: Easy task creation with Enter key support
- **Task completion**: Move tasks from pending to completed with timestamps
- **Date tracking**: Shows creation and completion dates for all tasks
- **Sort functionality**: Filter and sort tasks by date
- **Individual task deletion**: Remove specific tasks as needed

### Timer System
- **Multiple timers**: Run multiple named timers simultaneously
- **Custom durations**: Set timers in minutes with countdown display
- **Timer controls**: Play, pause, reset, and delete functionality
- **Sound notifications**: Browser notification sound when timers complete
- **Real-time updates**: Live countdown with database persistence

### Reminder System
- **One-time or recurring**: Set reminders for single use or repeated intervals
- **Flexible scheduling**: Set by minutes, hours, or specific date/time
- **Sound alerts**: Browser notification sound when reminders trigger
- **Active/inactive states**: Pause and resume reminders as needed
- **Independent system**: Separate from task management

### Data Persistence
- **PostgreSQL backend**: Robust database storage for all data
- **Real-time sync**: All changes immediately saved to database
- **Cross-session persistence**: Data survives browser restarts
- **Clear all functionality**: Red button to reset all data at once

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Icons**: Lucide React
- **Styling**: Clean, minimal design with Apple/Linear-inspired polish

## Installation

1. Clone the repository:
```bash
git clone https://github.com/businessacceleratorai/task-tracker.git
cd task-tracker
```

2. Install dependencies:
```bash
bun install
```

3. Set up PostgreSQL database:
```bash
createdb -h localhost task_tracker
psql -h localhost -d task_tracker -f lib/db/init.sql
```

4. Set environment variables:
```bash
export PGUSER=your_postgres_user
export PGPASSWORD=your_postgres_password
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tasks Table
- `id`: Serial primary key
- `text`: Task description
- `status`: 'pending' or 'completed'
- `created_at`: Timestamp of creation
- `completed_at`: Timestamp of completion (nullable)

### Timers Table
- `id`: Serial primary key
- `name`: Timer name
- `duration`: Total duration in seconds
- `remaining`: Remaining time in seconds
- `is_running`: Boolean for timer state
- `is_completed`: Boolean for completion status
- `created_at`: Timestamp of creation

### Reminders Table
- `id`: Serial primary key
- `name`: Reminder name
- `type`: 'once' or 'recurring'
- `interval_seconds`: Interval in seconds
- `next_trigger`: Next trigger timestamp
- `is_active`: Boolean for active state
- `created_at`: Timestamp of creation

## API Endpoints

### Tasks
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task status
- `DELETE /api/tasks/[id]` - Delete specific task
- `DELETE /api/tasks` - Delete all tasks

### Timers
- `GET /api/timers` - Fetch all timers
- `POST /api/timers` - Create new timer
- `PUT /api/timers/[id]` - Update timer state
- `DELETE /api/timers/[id]` - Delete specific timer
- `DELETE /api/timers` - Delete all timers

### Reminders
- `GET /api/reminders` - Fetch all reminders
- `POST /api/reminders` - Create new reminder
- `PUT /api/reminders/[id]` - Update reminder state
- `DELETE /api/reminders/[id]` - Delete specific reminder
- `DELETE /api/reminders` - Delete all reminders

### Utility
- `DELETE /api/clear-all` - Clear all data from all tables

## Usage

1. **Adding Tasks**: Click the input field, type your task, and press Enter or click "Add Task"
2. **Completing Tasks**: Click the "Complete" button on any pending task
3. **Creating Timers**: Enter a name and duration (in minutes), then click "Add"
4. **Running Timers**: Use play/pause buttons to control timers, reset to restart
5. **Setting Reminders**: Choose one-time or recurring, set interval, and click "Add"
6. **Clearing Data**: Use the red "Clear All" button to reset everything

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Business Accelerator AI**
- Email: businessacceleratorai@gmail.com
- GitHub: [@businessacceleratorai](https://github.com/businessacceleratorai)
