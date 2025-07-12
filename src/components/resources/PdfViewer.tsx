
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Download, Eye, Calendar, ExternalLink } from 'lucide-react';

type PdfDocument = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string;
  file_size: number | null;
  category: string | null;
  upload_date: string;
  view_count: number;
  download_count: number;
  total_interactions: number;
  type: 'pdf';
};

type ContentResource = {
  id: string;
  title: string;
  description: string | null;
  content: string;
  category: string | null;
  upload_date: string;
  view_count: number;
  download_count: number;
  total_interactions: number;
  type: 'content';
};

type Resource = PdfDocument | ContentResource;

const PdfViewer = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResources = async () => {
    try {
      // Fetch PDF documents
      const { data: pdfData, error: pdfError } = await supabase
        .from('pdf_documents')
        .select(`
          id,
          title,
          description,
          file_url,
          file_name,
          file_size,
          category,
          upload_date
        `)
        .eq('is_active', true)
        .order('upload_date', { ascending: false });

      if (pdfError) throw pdfError;

      // Fetch published content resources
      const { data: contentData, error: contentError } = await supabase
        .from('content')
        .select('id, title, content, category, created_at')
        .eq('type', 'resource')
        .eq('status', 'Published')
        .order('created_at', { ascending: false });

      if (contentError) throw contentError;

      // Get analytics for PDF documents
      const pdfDocumentsWithStats = await Promise.all(
        (pdfData || []).map(async (doc) => {
          const { data: analytics } = await supabase
            .from('pdf_analytics')
            .select('action_type')
            .eq('document_id', doc.id);

          const viewCount = analytics?.filter(a => a.action_type === 'view').length || 0;
          const downloadCount = analytics?.filter(a => a.action_type === 'download').length || 0;

          return {
            ...doc,
            view_count: viewCount,
            download_count: downloadCount,
            total_interactions: viewCount + downloadCount,
            type: 'pdf' as const
          };
        })
      );

      // Format content resources (no analytics tracking for text content yet)
      const contentResources: ContentResource[] = (contentData || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.content.substring(0, 200) + (item.content.length > 200 ? '...' : ''),
        content: item.content,
        category: item.category,
        upload_date: item.created_at,
        view_count: 0,
        download_count: 0,
        total_interactions: 0,
        type: 'content' as const
      }));

      // Combine and sort all resources by date
      const allResources = [...pdfDocumentsWithStats, ...contentResources];
      allResources.sort((a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime());
      
      setResources(allResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackAction = async (documentId: string, actionType: 'view' | 'download') => {
    try {
      const sessionId = sessionStorage.getItem('session_id') || 
        (() => {
          const id = Math.random().toString(36).substring(7);
          sessionStorage.setItem('session_id', id);
          return id;
        })();

      await supabase
        .from('pdf_analytics')
        .insert({
          document_id: documentId,
          action_type: actionType,
          user_ip: null,
          user_agent: navigator.userAgent,
          session_id: sessionId
        });

      // Refresh the resources stats
      fetchResources();
    } catch (error) {
      console.error('Error tracking action:', error);
    }
  };

  const handlePdfView = async (doc: PdfDocument) => {
    await trackAction(doc.id, 'view');
    window.open(doc.file_url, '_blank');
  };

  const handlePdfDownload = async (doc: PdfDocument) => {
    await trackAction(doc.id, 'download');
    const link = document.createElement('a');
    link.href = doc.file_url;
    link.download = doc.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContentView = (resource: ContentResource) => {
    // For content resources, we could open a modal or navigate to a detailed view
    // For now, we'll show an alert with the content
    alert(`Content: ${resource.content}`);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  useEffect(() => {
    fetchResources();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading resources...</div>;
  }

  if (resources.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No resources available yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {resources.map((resource) => (
        <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2 flex items-center gap-2">
                  <FileText className={`h-5 w-5 ${resource.type === 'pdf' ? 'text-red-600' : 'text-blue-600'}`} />
                  {resource.title}
                  {resource.type === 'content' && (
                    <Badge variant="outline" className="ml-2">Content</Badge>
                  )}
                </CardTitle>
                {resource.description && (
                  <CardDescription className="text-base">{resource.description}</CardDescription>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {resource.view_count} views
                </Badge>
                {resource.type === 'pdf' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {resource.download_count} downloads
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Published: {new Date(resource.upload_date).toLocaleDateString()}
                </p>
                {resource.type === 'pdf' && (
                  <p>File size: {formatFileSize((resource as PdfDocument).file_size)}</p>
                )}
                {resource.type === 'content' && (
                  <p>Type: Text Content</p>
                )}
              </div>
              <div className="flex gap-2">
                {resource.type === 'pdf' ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handlePdfView(resource as PdfDocument)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View PDF
                    </Button>
                    <Button
                      onClick={() => handlePdfDownload(resource as PdfDocument)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleContentView(resource as ContentResource)}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Content
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PdfViewer;
