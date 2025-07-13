
-- Create a table for careers
CREATE TABLE public.careers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_path TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Users',
  category TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'blue',
  status TEXT NOT NULL DEFAULT 'active',
  display_order INTEGER NOT NULL DEFAULT 0,
  requirements TEXT,
  salary_range TEXT,
  location TEXT,
  employment_type TEXT NOT NULL DEFAULT 'full-time',
  application_deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES admin_users(id)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin users can view all careers" 
  ON public.careers 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin users can create careers" 
  ON public.careers 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin users can update careers" 
  ON public.careers 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Admin users can delete careers" 
  ON public.careers 
  FOR DELETE 
  USING (true);

-- Insert the Forest Guard Program as initial data
INSERT INTO public.careers (
  title,
  excerpt,
  description,
  image_url,
  link_path,
  icon_name,
  category,
  color,
  requirements,
  salary_range,
  location,
  employment_type,
  application_deadline
) VALUES (
  'Forest Guard Program',
  'Join our elite Forest Guard team to protect and preserve Kano State forests and wildlife.',
  'The Forest Guard Program is seeking dedicated individuals to serve as frontline protectors of our natural resources. Guards will patrol forest areas, prevent illegal activities, conduct wildlife monitoring, and engage with local communities on conservation efforts.',
  '/lovable-uploads/forest-guard-program.jpg',
  '/careers/forest-guard',
  'Shield',
  'Conservation',
  'green',
  'Minimum SSCE certification, Physical fitness, Age 18-35, Basic literacy in English and Hausa',
  '₦45,000 - ₦65,000 monthly',
  'Various forest reserves across Kano State',
  'full-time',
  '2025-02-28'
);
