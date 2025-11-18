# SHARE Gateway - Training Portal

## Project Overview

SHARE Gateway is a comprehensive onboarding and training portal built for staff, investors, and partners of the SHARE Mobile Clinic in Haiti. The application provides structured courses with lessons and interactive quizzes, automatic progress tracking, and real-time completion certificates.

## Current State

**Status**: ✅ MVP Complete - Fully functional training portal

### Completed Features
- ✅ Supabase authentication (email/password)
- ✅ Beautiful responsive landing page with hero section
- ✅ User registration and login flows
- ✅ Automatic course assignment on registration
- ✅ Dashboard with course progress tracking
- ✅ Course pages with lesson and quiz listings
- ✅ Interactive lesson viewer with markdown support
- ✅ Multiple-choice quiz system with instant feedback
- ✅ Real-time progress calculation (stored in JSONB)
- ✅ Automatic completion tracking and certificates
- ✅ Protected routes with authentication
- ✅ Mobile-responsive design throughout
- ✅ Loading states and error handling

## Architecture

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Shadcn UI components
- **Routing**: Wouter (React Router alternative)
- **State**: React Context API for auth
- **Typography**: Inter (UI) + Merriweather (content)

### Backend
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Progress Storage**: JSONB arrays for lessons/quizzes completed
- **Auto-assignment**: Database trigger assigns orientation course to new users

### Key Files
- `client/src/lib/supabase.ts` - Supabase client configuration
- `client/src/lib/courses.ts` - Hardcoded course data structure
- `client/src/contexts/AuthContext.tsx` - Authentication state management
- `client/src/pages/` - All page components
- `shared/schema.ts` - TypeScript types and database schema
- `supabase-setup.sql` - Database setup SQL (run in Supabase console)

## Database Schema

### user_courses table
```sql
- id: UUID (primary key)
- user_id: UUID (references auth.users)
- course_id: TEXT
- assigned_at: TIMESTAMP
- completed_at: TIMESTAMP (nullable)
- progress_percentage: INTEGER (0-100)
- lessons_completed: JSONB (array of lesson IDs)
- quizzes_completed: JSONB (array of quiz IDs)
```

## User Preferences

- Authentic documentary-style images for medical clinic context
- Material Design 3 inspired color system
- Clean, professional UI appropriate for healthcare/education
- Emphasis on accessibility and mobile responsiveness
- Serif fonts (Merriweather) for lesson content readability

## Recent Changes (Nov 18, 2024)

- Built complete frontend with all pages and components
- Integrated Supabase authentication and database
- Implemented course progress tracking with JSONB storage
- Created orientation course with 3 lessons and 1 quiz
- Added automatic course assignment trigger
- Fixed DOM nesting issues in Navbar component
- Configured design system with Inter and Merriweather fonts

## Setup Instructions

### 1. Supabase Configuration
1. Create Supabase project at supabase.com
2. Add environment variables (already configured):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 2. Database Setup
1. Go to Supabase → SQL Editor
2. Run the SQL in `supabase-setup.sql`
3. This creates the `user_courses` table, RLS policies, and auto-assignment trigger

### 3. Run Application
```bash
npm install
npm run dev
```

## Course Structure

### Orientation Common (orientation_common)
**Target**: All new team members

**Lessons**:
1. Welcome to SHARE - Introduction to the organization
2. Our Mission & Values - Core principles and impact
3. Working in Haiti - Cultural context and operations

**Quiz**: 5-question assessment (70% passing grade)
- Questions cover mission, values, operations, and cultural awareness

## Progress Calculation

```javascript
const totalItems = lessons.length + quizzes.length;
const completedItems = lessonsCompleted.length + quizzesCompleted.length;
const progress = Math.round((completedItems / totalItems) * 100);
```

When progress reaches 100%, `completed_at` timestamp is set automatically.

## Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own course records
- Protected routes redirect to login if not authenticated
- Supabase handles password hashing and session management

## Design System

**Colors**: Material Design 3 with primary blue (#3B82F6)
**Spacing**: 4/6/8/12/16 unit system
**Components**: Shadcn UI with custom theming
**Breakpoints**: 
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Future Enhancements

- Admin dashboard for course management
- Additional courses for different roles (staff/investor/partner)
- Certificate PDF generation
- Email notifications for course assignments
- Course completion analytics
- Multi-language support (Haitian Creole/French/English)
- Video lesson support
- Discussion forums per course
