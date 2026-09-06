-- =========================================================
-- WeatherGPT Phase 1: Profiles Database & Row Level Security
-- Paste this script into your Supabase Dashboard SQL Editor
-- =========================================================

-- 1. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'citizen',
  preferred_language TEXT NOT NULL DEFAULT 'en',
  latitude DOUBLE PRECISION NOT NULL DEFAULT 19.076,
  longitude DOUBLE PRECISION NOT NULL DEFAULT 72.8777,
  city TEXT NOT NULL DEFAULT 'Mumbai',
  district TEXT NOT NULL DEFAULT 'Mumbai City',
  state TEXT NOT NULL DEFAULT 'Maharashtra',
  country TEXT NOT NULL DEFAULT 'India',
  location_source TEXT NOT NULL DEFAULT 'gps',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies: Users can only read and update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 4. Enable Realtime & Indexes
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON public.profiles(user_id);
