-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: sections
CREATE TABLE IF NOT EXISTS public.sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    token UUID NOT NULL DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: students
CREATE TABLE IF NOT EXISTS public.students (
    student_id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    section_id UUID REFERENCES public.sections(id) ON DELETE CASCADE,
    has_voted BOOLEAN DEFAULT FALSE,
    voted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: candidates
CREATE TABLE IF NOT EXISTS public.candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    position TEXT NOT NULL,
    vote_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime for students
ALTER PUBLICATION supabase_realtime ADD TABLE students;

-- Enable RLS
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Simple Policies (Adjust as needed for production)
CREATE POLICY "Allow public read for sections" ON public.sections FOR SELECT USING (true);
CREATE POLICY "Allow public read for students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public read for candidates" ON public.candidates FOR SELECT USING (true);
CREATE POLICY "Allow public update for student voting" ON public.students FOR UPDATE USING (true);

-- RPC Function for atomic vote increment
CREATE OR REPLACE FUNCTION increment_vote(candidate_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.candidates
  SET vote_count = vote_count + 1
  WHERE id = candidate_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
