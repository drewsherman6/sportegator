-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS athlete_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  role TEXT NOT NULL DEFAULT 'scout' CHECK (role IN ('athlete', 'scout', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create athlete_profiles table
CREATE TABLE public.athlete_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0 AND age < 150),
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  sport TEXT NOT NULL,
  position TEXT,
  level TEXT NOT NULL CHECK (level IN ('high_school', 'college', 'academy', 'semi_pro')),
  height TEXT,
  weight TEXT,
  graduation_year INTEGER,
  highlights_url TEXT,
  photo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  contact_email_visible BOOLEAN DEFAULT FALSE,
  contact_phone_visible BOOLEAN DEFAULT FALSE,
  phone TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for fast filtering
CREATE INDEX idx_athlete_city ON athlete_profiles(city);
CREATE INDEX idx_athlete_sport ON athlete_profiles(sport);
CREATE INDEX idx_athlete_level ON athlete_profiles(level);
CREATE INDEX idx_athlete_age ON athlete_profiles(age);
CREATE INDEX idx_athlete_user_id ON athlete_profiles(user_id);
CREATE INDEX idx_athlete_verified ON athlete_profiles(is_verified);

-- Create composite indexes for common queries
CREATE INDEX idx_athlete_city_sport ON athlete_profiles(city, sport);
CREATE INDEX idx_athlete_city_level ON athlete_profiles(city, level);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athlete_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read their own user record"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for athlete_profiles table
CREATE POLICY "Athlete profiles are publicly readable"
  ON public.athlete_profiles FOR SELECT
  USING (true);

CREATE POLICY "Athletes can create their own profile"
  ON public.athlete_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Athletes can update their own profile"
  ON public.athlete_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update is_verified field"
  ON public.athlete_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_athlete_profiles_updated_at BEFORE UPDATE ON public.athlete_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
