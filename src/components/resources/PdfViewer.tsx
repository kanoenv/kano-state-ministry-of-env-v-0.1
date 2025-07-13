
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Download, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type LocalPdfDocument = {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_name: string;
  file_size: string;
  category: string;
  upload_date: string;
  view_count: number;
  download_count: number;
  total_interactions: number;
  type: 'local_pdf';
};

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

type Resource = PdfDocument | ContentResource | LocalPdfDocument;

const PdfViewer = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadCounts, setDownloadCounts] = useState<{[key: string]: number}>({});
  const isMobile = useIsMobile();

  const localPdfDocuments: LocalPdfDocument[] = [
    {
      id: 'local-1',
      title: 'Environmental Regulations - Hausa Translation',
      description: 'Complete environmental protection regulations translated into Hausa language for enhanced accessibility. This document provides comprehensive guidelines on environmental conservation, pollution control measures, and sustainable development practices specifically designed for local communities in Kano State.',
      file_url: '/lovable-uploads/REGULATIONS - HAUSA 2.pdf',
      file_name: 'REGULATIONS - HAUSA 2.pdf',
      file_size: '2.8 MB',
      category: 'Environmental Regulations (Hausa)',
      upload_date: '2024-01-30',
      view_count: 0,
      download_count: 0,
      total_interactions: 0,
      type: 'local_pdf'
    },
    {
      id: 'local-2',
      title: 'Environmental Pollution Control Law 2022',
      description: 'Comprehensive legal framework governing environmental pollution control measures in Kano State. This law establishes stringent standards for industrial emissions, waste management protocols, enforcement mechanisms, and penalties for environmental violations to ensure sustainable environmental protection.',
      file_url: '/lovable-uploads/ENVIRONMENTAL POLLUTION CONTROL LAW, 2022.pdf',
      file_name: 'ENVIRONMENTAL POLLUTION CONTROL LAW, 2022.pdf',
      file_size: '3.2 MB',
      category: 'Environmental Law',
      upload_date: '2024-01-20',
      view_count: 0,
      download_count: 0,
      total_interactions: 0,
      type: 'local_pdf'
    },
    {
      id: 'local-3',
      title: 'Environmental Pollution and Waste Control Regulations 2025',
      description: 'Updated comprehensive regulations for environmental pollution prevention and waste management control. This document outlines modern standards for industrial waste disposal, recycling requirements, environmental impact assessments, and sustainable waste management practices for businesses and communities.',
      file_url: '/lovable-uploads/ENVIRONMENTAL POLLUTION AND WASTE CONTROL REGULATIONS, 2025.pdf',
      file_name: 'ENVIRONMENTAL POLLUTION AND WASTE CONTROL REGULATIONS, 2025.pdf',
      file_size: '4.1 MB',
      category: 'Waste Management Regulations',
      upload_date: '2024-01-25',
      view_count: 0,
      download_count: 0,
      total_interactions: 0,
      type: 'local_pdf'
    },
    {
      id: 'local-4',
      title: 'Environmental Protection and Community Development Law 2022',
      description: 'Foundational environmental protection law establishing comprehensive framework for community development and environmental conservation in Kano State. This legislation integrates environmental protection with sustainable community development, outlining standards for green infrastructure and eco-friendly development practices.',
      file_url: '/lovable-uploads/DOKAR KULA DA GURƁATAR MUHALLI TA JIHAR KANO TA SHEKARAR 2022.pdf',
      file_name: 'DOKAR KULA DA GURƁATAR MUHALLI TA JIHAR KANO TA SHEKARAR 2022.pdf',
      file_size: '2.5 MB',
      category: 'Environmental Protection Law',
      upload_date: '2024-01-15',
      view_count: 0,
      download_count: 0,
      total_interactions: 0,
      type: 'local_pdf'
    }
  ];

  const fetchResources = async () => {
    try {
      // Load download counts from localStorage for local PDFs
      const storedCounts = JSON.parse(localStorage.getItem('pdfDownloadCounts') || '{}');
      setDownloadCounts(storedCounts);

      // Update local PDFs with stored counts
      const updatedLocalPdfs = localPdfDocuments.map(doc => ({
        ...doc,
        download_count: storedCounts[doc.id] || 0,
        total_interactions: storedCounts[doc.id] || 0
      }));

      // Sort by date (most recent first)
      updatedLocalPdfs.sort((a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime());
      
      setResources(updatedLocalPdfs);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackLocalPdfDownload = (documentId: string) => {
    const currentCounts = JSON.parse(localStorage.getItem('pdfDownloadCounts') || '{}');
    currentCounts[documentId] = (currentCounts[documentId] || 0) + 1;
    localStorage.setItem('pdfDownloadCounts', JSON.stringify(currentCounts));
    setDownloadCounts(currentCounts);
    
    // Update the resources state to reflect the new count immediately
    setResources(prevResources => 
      prevResources.map(resource => 
        resource.id === documentId && resource.type === 'local_pdf'
          ? { ...resource, download_count: currentCounts[documentId], total_interactions: currentCounts[documentId] }
          : resource
      )
    );
  };

  const handleLocalPdfDownload = (doc: LocalPdfDocument) => {
    console.log('Starting download for:', doc.file_name);
    console.log('File URL:', doc.file_url);
    
    // Track the download first
    trackLocalPdfDownload(doc.id);
    
    // Create and trigger download
    const link = document.createElement('a');
    link.href = doc.file_url;
    link.download = doc.file_name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Download triggered for:', doc.file_name);
  };

  const formatFileSize = (bytes: number | null | string) => {
    if (typeof bytes === 'string') return bytes;
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  useEffect(() => {
    fetchResources();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">Loading resources...</div>
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="text-center py-8">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No resources available yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {resources.map((resource) => (
        <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardHeader className="pb-3">
            <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-between items-start'}`}>
              <div className="flex-1">
                <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} mb-2 flex items-center gap-2 leading-tight`}>
                  <FileText className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-red-600 flex-shrink-0`} />
                  <span className="break-words">{resource.title}</span>
                </CardTitle>
                {resource.description && (
                  <CardDescription className={`${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                    {resource.description}
                  </CardDescription>
                )}
              </div>
              <div className={`flex ${isMobile ? 'flex-row justify-start' : 'flex-col'} gap-2 flex-shrink-0`}>
                <Badge variant="secondary" className="text-xs">Official Document</Badge>
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  <Download className="h-3 w-3" />
                  {resource.download_count} downloads
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'justify-between items-end'}`}>
              <div className={`text-sm text-gray-600 space-y-1 ${isMobile ? 'order-2' : ''}`}>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">Published: {new Date(resource.upload_date).toLocaleDateString()}</span>
                </p>
                <p className="break-words">
                  File size: {formatFileSize((resource as LocalPdfDocument).file_size)}
                </p>
                {resource.category && (
                  <p className="break-words">Category: {resource.category}</p>
                )}
              </div>
              <div className={`flex gap-2 ${isMobile ? 'order-1 w-full' : 'flex-shrink-0'}`}>
                <Button
                  onClick={() => handleLocalPdfDownload(resource as LocalPdfDocument)}
                  className={`flex items-center gap-2 ${isMobile ? 'w-full justify-center' : ''}`}
                  size={isMobile ? "default" : "default"}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PdfViewer;
