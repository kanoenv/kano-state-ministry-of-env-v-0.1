
-- Create table for storing PDF documents
CREATE TABLE public.pdf_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  category TEXT DEFAULT 'law',
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by UUID REFERENCES public.admin_users(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for tracking PDF views and reads
CREATE TABLE public.pdf_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES public.pdf_documents(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN ('view', 'download')),
  user_ip TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for PDF documents
ALTER TABLE public.pdf_documents ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view active documents
CREATE POLICY "Anyone can view active PDF documents" 
  ON public.pdf_documents 
  FOR SELECT 
  USING (is_active = true);

-- Admin users can manage documents
CREATE POLICY "Admin users can manage PDF documents" 
  ON public.pdf_documents 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Add RLS policies for analytics
ALTER TABLE public.pdf_analytics ENABLE ROW LEVEL SECURITY;

-- Allow everyone to insert analytics (for tracking)
CREATE POLICY "Anyone can insert PDF analytics" 
  ON public.pdf_analytics 
  FOR INSERT 
  WITH CHECK (true);

-- Admin users can view all analytics
CREATE POLICY "Admin users can view PDF analytics" 
  ON public.pdf_analytics 
  FOR SELECT 
  USING (true);

-- Create view for document stats
CREATE VIEW public.pdf_document_stats AS
SELECT 
  pd.id,
  pd.title,
  pd.file_name,
  pd.category,
  pd.upload_date,
  COALESCE(views.view_count, 0) as view_count,
  COALESCE(downloads.download_count, 0) as download_count,
  COALESCE(views.view_count, 0) + COALESCE(downloads.download_count, 0) as total_interactions
FROM public.pdf_documents pd
LEFT JOIN (
  SELECT document_id, COUNT(*) as view_count
  FROM public.pdf_analytics 
  WHERE action_type = 'view'
  GROUP BY document_id
) views ON pd.id = views.document_id
LEFT JOIN (
  SELECT document_id, COUNT(*) as download_count
  FROM public.pdf_analytics 
  WHERE action_type = 'download'
  GROUP BY document_id
) downloads ON pd.id = downloads.document_id
WHERE pd.is_active = true;
