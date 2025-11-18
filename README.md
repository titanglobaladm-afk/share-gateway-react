# SHARE Gateway - Training Portal

A comprehensive onboarding and training portal for staff, investors, and partners of the SHARE Mobile Clinic in Haiti.

## Features

- **Authentication**: Secure email/password authentication with Supabase
- **Course Management**: Structured courses with lessons and quizzes
- **Progress Tracking**: Real-time progress calculation with JSONB storage
- **Interactive Quizzes**: Multiple-choice quizzes with instant feedback
- **Mobile Responsive**: Beautiful UI that works on all devices
- **Auto-Assignment**: New users automatically receive orientation course

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Shadcn UI
- **Routing**: React Router (Wouter)
- **Backend**: Supabase (Authentication + PostgreSQL)
- **Fonts**: Inter (UI) + Merriweather (Content)

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings → API and copy:
   - Project URL → `VITE_SUPABASE_URL`
   - anon/public key → `VITE_SUPABASE_ANON_KEY`
3. Add these as Replit Secrets or `.env` variables

### 2. Database Setup

1. Go to your Supabase project → SQL Editor
2. Copy and paste the entire contents of `supabase-setup.sql`
3. Run the SQL to create:
   - `user_courses` table
   - Row Level Security policies
   - Auto-assignment trigger for new users

### 3. Run the Application

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5000`

## User Flow

1. **Register**: Create account with email/password
2. **Auto-Assignment**: Orientation course automatically assigned
3. **Dashboard**: View assigned courses and progress
4. **Complete Lessons**: Read content and mark as complete
5. **Pass Quizzes**: Score 70% or higher to complete
6. **Track Progress**: Automatic calculation and certificate on 100%

## Course Structure

### Orientation Common Course
- **Lesson 1**: Welcome to SHARE
- **Lesson 2**: Our Mission & Values
- **Lesson 3**: Working in Haiti
- **Quiz**: 5-question assessment (70% to pass)

## Database Schema

### user_courses table
- `id` (UUID): Primary key
- `user_id` (UUID): References auth.users
- `course_id` (TEXT): Course identifier
- `assigned_at` (TIMESTAMP): Assignment date
- `completed_at` (TIMESTAMP): Completion date (nullable)
- `progress_percentage` (INTEGER): 0-100%
- `lessons_completed` (JSONB): Array of lesson IDs
- `quizzes_completed` (JSONB): Array of quiz IDs

## Progress Calculation

```
progress = (completed_lessons + completed_quizzes) / (total_lessons + total_quizzes) * 100
```

When progress reaches 100%, `completed_at` is automatically set.

## Security

- Row Level Security enabled on all tables
- Users can only access their own course records
- Authentication required for all protected routes
- Automatic course assignment on user registration

## Design System

- **Colors**: Material Design 3 inspired
- **Typography**: Inter for UI, Merriweather for content
- **Components**: Shadcn UI with custom theming
- **Spacing**: Consistent 4/6/8/12/16 unit system
- **Interactions**: Subtle hover and active states

## Development

- Frontend hot-reload enabled
- TypeScript for type safety
- ESLint configured
- Responsive breakpoints: mobile (< 768px), tablet (768px+), desktop (1024px+)

## License

Copyright © 2024 SHARE Mobile Clinic
