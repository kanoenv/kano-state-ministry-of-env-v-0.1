-- Create climate actors table
CREATE TABLE public.climate_actors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_type TEXT NOT NULL CHECK (actor_type IN ('state_actor', 'non_state_actor')),
  organization_name TEXT NOT NULL,
  focus_areas TEXT[] NOT NULL,
  year_established INTEGER,
  lga_operations TEXT[] NOT NULL,
  description TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL UNIQUE,
  contact_phone TEXT NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  password_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES admin_users(id)
);

-- Enable RLS
ALTER TABLE public.climate_actors ENABLE ROW LEVEL SECURITY;

-- RLS policies for climate actors
CREATE POLICY "Anyone can insert climate actors"
ON public.climate_actors
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all climate actors"
ON public.climate_actors
FOR SELECT
USING (true);

CREATE POLICY "Admins can update climate actors"
ON public.climate_actors
FOR UPDATE
USING (true);

CREATE POLICY "Organizations can view their own profile"
ON public.climate_actors
FOR SELECT
USING (contact_email = current_setting('app.current_user_email', true));

CREATE POLICY "Organizations can update their own profile"
ON public.climate_actors
FOR UPDATE
USING (contact_email = current_setting('app.current_user_email', true));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_climate_actors_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_climate_actors_updated_at
BEFORE UPDATE ON public.climate_actors
FOR EACH ROW
EXECUTE FUNCTION public.update_climate_actors_updated_at();

-- Create function to verify organization login
CREATE OR REPLACE FUNCTION public.verify_organization_login(org_email text, org_password text)
RETURNS TABLE(id uuid, organization_name text, contact_email text, status text, approved_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ca.id,
        ca.organization_name,
        ca.contact_email,
        ca.status,
        ca.approved_at
    FROM public.climate_actors ca
    WHERE ca.contact_email = org_email
        AND ca.password_hash = crypt(org_password, ca.password_hash)
        AND ca.status = 'approved';
END;
$$;
