-- Eclinical Guideline Database Schema
-- Run this in your Neon SQL Editor to set up the database

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT DEFAULT '',
  institution TEXT DEFAULT '',
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Whitelist table
CREATE TABLE IF NOT EXISTS whitelist (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  added_by UUID REFERENCES users(id) ON DELETE SET NULL,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pathway sessions table
CREATE TABLE IF NOT EXISTS pathway_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  disease_id TEXT NOT NULL,
  disease_name TEXT NOT NULL,
  patient_code TEXT DEFAULT '',
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  current_node_id TEXT,
  checklist JSONB DEFAULT '{}',
  decisions JSONB DEFAULT '[]',
  variations JSONB DEFAULT '[]',
  notes JSONB DEFAULT '{}',
  pathway_history JSONB DEFAULT '[]',
  -- Nurse-Doctor Collaboration Fields
  consultation_status TEXT DEFAULT 'none' CHECK (consultation_status IN ('none', 'waiting_doctor', 'doctor_responded')),
  nurse_note TEXT DEFAULT '',
  reported_at TIMESTAMPTZ,
  doctor_orders JSONB DEFAULT NULL,
  doctor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_pathway_sessions_user_id ON pathway_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_pathway_sessions_status ON pathway_sessions(status);
CREATE INDEX IF NOT EXISTS idx_whitelist_email ON whitelist(email);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================================
-- MIGRATION: Run this if table already exists
-- ============================================================
-- ALTER TABLE pathway_sessions ADD COLUMN IF NOT EXISTS consultation_status TEXT DEFAULT 'none' CHECK (consultation_status IN ('none', 'waiting_doctor', 'doctor_responded'));
-- ALTER TABLE pathway_sessions ADD COLUMN IF NOT EXISTS nurse_note TEXT DEFAULT '';
-- ALTER TABLE pathway_sessions ADD COLUMN IF NOT EXISTS reported_at TIMESTAMPTZ;
-- ALTER TABLE pathway_sessions ADD COLUMN IF NOT EXISTS doctor_orders JSONB DEFAULT NULL;
-- ALTER TABLE pathway_sessions ADD COLUMN IF NOT EXISTS doctor_id UUID REFERENCES users(id) ON DELETE SET NULL;
