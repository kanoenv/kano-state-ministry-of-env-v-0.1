
-- Create a table for home page banners
CREATE TABLE public.home_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  cta_text TEXT NOT NULL,
  cta_link TEXT NOT NULL,
  secondary_cta_text TEXT NOT NULL,
  secondary_cta_link TEXT NOT NULL,
  background_image_url TEXT NOT NULL,
  stats JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES admin_users(id)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.home_banners ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin users can view all home banners" 
  ON public.home_banners 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin users can create home banners" 
  ON public.home_banners 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin users can update home banners" 
  ON public.home_banners 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Admin users can delete home banners" 
  ON public.home_banners 
  FOR DELETE 
  USING (true);

-- Insert default banner data based on current HeroSection content
INSERT INTO public.home_banners (
  title,
  subtitle,
  cta_text,
  cta_link,
  secondary_cta_text,
  secondary_cta_link,
  background_image_url,
  stats,
  display_order,
  is_active
) VALUES 
(
  'Building a Cleaner, Greener, Resilient Kano',
  'Leading environmental protection, community empowerment, and climate adaptation initiatives for a sustainable future in Kano State.',
  'Explore Our Programs',
  '/programs',
  'Report Environmental Issue',
  '/report-issue',
  '/lovable-uploads/cf45aab3-ccbc-4ef5-a201-276198f68571.png',
  '[
    {"value": "500,000+", "label": "Trees Planted", "icon": "Globe"},
    {"value": "250+", "label": "Communities Served", "icon": "Target"},
    {"value": "15", "label": "Active Programs", "icon": "Award"}
  ]'::jsonb,
  1,
  true
),
(
  'Join Kano State''s Forest Guard Program',
  'Protect our forests, preserve our heritage. Opportunities available for qualified Kano Indigenes aged 18–35 to join our conservation efforts.',
  'Apply Today',
  '/careers/forest-guard/apply',
  'Learn More',
  '/careers/forest-guard',
  '/lovable-uploads/93846bf9-aece-4716-ad44-62e1c7a6cb4b.png',
  '[
    {"value": "2024", "label": "Recruitment Open", "icon": "Award"},
    {"value": "18-35", "label": "Age Range", "icon": "Target"},
    {"value": "100%", "label": "Kano Indigenes", "icon": "Globe"}
  ]'::jsonb,
  2,
  true
),
(
  'Comprehensive Erosion Control & Mapping',
  'Advanced GIS mapping and erosion control initiatives across Kano State to develop effective action plans and protect our communities.',
  'View Erosion Map',
  '/programs/weccma',
  'Report Erosion',
  '/report-issue',
  '/lovable-uploads/ef52aa35-5a46-44df-82a7-a54293a8cbbf.png',
  '[
    {"value": "200+", "label": "Areas Mapped", "icon": "Globe"},
    {"value": "50+", "label": "Projects Active", "icon": "Award"},
    {"value": "24/7", "label": "Monitoring", "icon": "Target"}
  ]'::jsonb,
  3,
  true
);
