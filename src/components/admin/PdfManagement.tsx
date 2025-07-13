import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Upload, FileText, Eye, Download, Trash2, Plus } from 'lucide-react';

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
};

const PdfManagement = () => {
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();
  const [documents, setDocuments] = useState<PdfDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'law',
    file: null as File | null
  });

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
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

      if (error) throw error;
      
      // Get analytics for each document
      const documentsWithStats = await Promise.all(
        (data || []).map(async (doc) => {
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
            total_interactions: viewCount + downloadCount
          };
        })
      );
      
      setDocuments(documentsWithStats);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load PDF documents',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!uploadForm.file || !uploadForm.title || !adminUser) return;

    setIsUploading(true);
    try {
      // Upload to Supabase Storage
      const fileExt = uploadForm.file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `pdfs/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('recruitment_documents')
        .upload(filePath, uploadForm.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('recruitment_documents')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('pdf_documents')
        .insert({
          title: uploadForm.title,
          description: uploadForm.description || null,
          file_url: publicUrl,
          file_name: uploadForm.file.name,
          file_size: uploadForm.file.size,
          category: uploadForm.category,
          uploaded_by: adminUser.id
        });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'PDF document uploaded successfully'
      });

      setIsUploadDialogOpen(false);
      setUploadForm({ title: '', description: '', category: 'law', file: null });
      fetchDocuments();
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload PDF document',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pdf_documents')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'PDF document deleted successfully'
      });

      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete document',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">PDF Document Management</h2>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Upload PDF
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">Loading documents...</div>
        ) : documents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No PDF documents uploaded yet</p>
            </CardContent>
          </Card>
        ) : (
          documents.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    {doc.description && (
                      <CardDescription>{doc.description}</CardDescription>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      <Eye className="h-3 w-3 mr-1" />
                      {doc.view_count} views
                    </Badge>
                    <Badge variant="secondary">
                      <Download className="h-3 w-3 mr-1" />
                      {doc.download_count} downloads
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>File: {doc.file_name}</p>
                    <p>Uploaded: {new Date(doc.upload_date).toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload PDF Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                placeholder="Enter document title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                placeholder="Enter document description (optional)"
              />
            </div>
            <div>
              <Label htmlFor="file">PDF File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf"
                onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleFileUpload}
              disabled={!uploadForm.file || !uploadForm.title || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PdfManagement;
