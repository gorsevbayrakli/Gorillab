CREATE TABLE public.trial_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 80),
  phone text NOT NULL CHECK (phone ~ '^\+90[0-9]{10}$'),
  blocker text NOT NULL CHECK (char_length(blocker) <= 100),
  discipline text NOT NULL CHECK (char_length(discipline) <= 60),
  days text NOT NULL CHECK (char_length(days) <= 20),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.trial_requests TO anon, authenticated;
GRANT ALL ON public.trial_requests TO service_role;
ALTER TABLE public.trial_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a trial request" ON public.trial_requests FOR INSERT TO anon, authenticated WITH CHECK (true);