ALTER TABLE public.trial_requests ADD COLUMN kvkk_consent_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.trial_requests ALTER COLUMN kvkk_consent_at DROP DEFAULT;