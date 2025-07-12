
-- Enable RLS and create policies for five_million_trees_applications table
ALTER TABLE public.five_million_trees_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all tree applications" 
ON public.five_million_trees_applications 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can update tree applications" 
ON public.five_million_trees_applications 
FOR UPDATE 
TO authenticated 
USING (true);

-- Enable RLS and create policies for recruitment_applications table
ALTER TABLE public.recruitment_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all recruitment applications" 
ON public.recruitment_applications 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can update recruitment applications" 
ON public.recruitment_applications 
FOR UPDATE 
TO authenticated 
USING (true);

-- Enable RLS and create policies for air_quality table
ALTER TABLE public.air_quality ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all air quality data" 
ON public.air_quality 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage air quality data" 
ON public.air_quality 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Enable RLS and create policies for content table
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all content" 
ON public.content 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage content" 
ON public.content 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Enable RLS and create policies for programs table
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all programs" 
ON public.programs 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage programs" 
ON public.programs 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Enable RLS and create policies for careers table
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all careers" 
ON public.careers 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage careers" 
ON public.careers 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Enable RLS and create policies for home_banners table
ALTER TABLE public.home_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all banners" 
ON public.home_banners 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can manage banners" 
ON public.home_banners 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);
