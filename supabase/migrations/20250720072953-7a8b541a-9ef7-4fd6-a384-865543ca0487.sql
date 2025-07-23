-- Create storage bucket for climate actor logos
INSERT INTO storage.buckets (id, name, public) VALUES ('climate_actors', 'climate_actors', true);

-- Create storage policies for climate actor logos
CREATE POLICY "Climate actor logos are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'climate_actors');

CREATE POLICY "Anyone can upload climate actor logos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'climate_actors');

CREATE POLICY "Users can update their own logos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'climate_actors');
