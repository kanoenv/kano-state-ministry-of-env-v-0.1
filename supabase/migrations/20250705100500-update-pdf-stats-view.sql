
-- Drop the existing view
DROP VIEW IF EXISTS public.pdf_document_stats;

-- Create updated view with all required fields
CREATE VIEW public.pdf_document_stats AS
SELECT 
  pd.id,
  pd.title,
  pd.description,
  pd.file_url,
  pd.file_name,
  pd.file_size,
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
