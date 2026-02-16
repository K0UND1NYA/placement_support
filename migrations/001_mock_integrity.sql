-- Create Mock Interview Integrity Logs Table
CREATE TABLE public.mock_interview_integrity_logs (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  mock_interview_attempt_id uuid REFERENCES public.mock_interview_attempts(id) ON DELETE CASCADE,
  event_type text NOT NULL, -- 'tab_switch', 'copy', 'paste', 'window_blur'
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  constraint mock_interview_integrity_logs_pkey PRIMARY KEY (id)
);

ALTER TABLE public.mock_interview_integrity_logs ENABLE ROW LEVEL SECURITY;

-- Students can insert logs for their own attempts
CREATE POLICY "Students can insert own integrity logs" 
  ON public.mock_interview_integrity_logs FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM mock_interview_attempts mia
      WHERE mia.id = mock_interview_integrity_logs.mock_interview_attempt_id
      AND mia.student_id = auth.uid()
    )
  );

-- TPOs can view logs for their college
CREATE POLICY "TPOs can view integrity logs" 
  ON public.mock_interview_integrity_logs FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM mock_interview_attempts mia
      JOIN mock_interviews mi ON mia.mock_interview_id = mi.id
      WHERE mia.id = mock_interview_integrity_logs.mock_interview_attempt_id
      AND mi.college_id = (SELECT college_id FROM users WHERE id = auth.uid())
      AND (SELECT role FROM users WHERE id = auth.uid()) = 'tpo'
    )
  );

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_mi_integrity_logs_attempt_id ON public.mock_interview_integrity_logs (mock_interview_attempt_id);
