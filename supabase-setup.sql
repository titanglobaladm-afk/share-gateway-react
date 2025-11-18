-- SHARE Gateway - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor to create the required table

-- Create user_courses table
CREATE TABLE IF NOT EXISTS user_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  lessons_completed JSONB NOT NULL DEFAULT '[]'::jsonb,
  quizzes_completed JSONB NOT NULL DEFAULT '[]'::jsonb,
  CONSTRAINT unique_user_course UNIQUE(user_id, course_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_course_id ON user_courses(course_id);

-- Enable Row Level Security
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

-- Create policies for user_courses
-- Users can only read their own course records
CREATE POLICY "Users can view own courses"
  ON user_courses FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own course progress
CREATE POLICY "Users can update own courses"
  ON user_courses FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow authenticated users to insert course records (for auto-assignment)
CREATE POLICY "Users can insert own courses"
  ON user_courses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically assign default course to new users
CREATE OR REPLACE FUNCTION assign_default_course()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_courses (user_id, course_id, progress_percentage, lessons_completed, quizzes_completed)
  VALUES (NEW.id, 'orientation_common', 0, '[]'::jsonb, '[]'::jsonb);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-assign course on user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION assign_default_course();

-- Insert a test course assignment (optional - for testing)
-- Uncomment the line below and replace 'your-user-id' with an actual user ID
-- INSERT INTO user_courses (user_id, course_id) VALUES ('your-user-id', 'orientation_common');
