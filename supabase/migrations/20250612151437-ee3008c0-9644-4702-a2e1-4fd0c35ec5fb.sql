
-- Enable RLS on reports table if not already enabled
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view all reports
-- This assumes admin users should be able to see all reports
CREATE POLICY "Authenticated users can view all reports" 
ON public.reports 
FOR SELECT 
TO authenticated 
USING (true);

-- Create policy to allow authenticated users to update reports
CREATE POLICY "Authenticated users can update reports" 
ON public.reports 
FOR UPDATE 
TO authenticated 
USING (true);

-- If you want to allow admins to insert reports (though this might not be needed)
CREATE POLICY "Authenticated users can insert reports" 
ON public.reports 
FOR INSERT 
TO authenticated 
WITH CHECK (true);
