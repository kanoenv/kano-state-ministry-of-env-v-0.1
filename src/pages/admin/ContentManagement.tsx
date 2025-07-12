import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { FileText, Plus, Upload, Newspaper, Calendar, Pencil, Trash2, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/context/AdminAuthContext';

type ContentItem = {
  id: string;
  title: string;
  type: string;
  category: string | null;
  status: string;
  content: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  created_by: string | null;
};

type EventDetails = {
  date?: string;
  location?: string;
  [key: string]: any;
};

const ContentManagement = () => {
  const { toast } = useToast();
  const { adminUser, isAuthenticated } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('news');
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [isEditContentOpen, setIsEditContentOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState({
    title: '',
    type: 'news',
    category: '',
    status: 'Draft',
    content: '',
  });
  
  // Fetch content data
  const fetchContentData = async (type = activeTab) => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('content')
        .select('*')
        .order('updated_at', { ascending: false });
        
      // Filter by content type
      if (type === 'news') {
        query = query.eq('type', 'news');
      } else if (type === 'resources') {
        query = query.eq('type', 'resource');
      } else if (type === 'events') {
        query = query.eq('type', 'event');
      }
      
      const { data, error } = await query;
        
      if (error) throw error;
      
      setContentItems(data || []);
    } catch (error) {
      console.error('Error fetching content data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load content data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add new content
  const handleAddContent = async () => {
    try {
      // Validate inputs
      if (!newContent.title.trim() || !newContent.content.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in title and content fields',
          variant: 'destructive'
        });
        return;
      }

      if (!adminUser?.id) {
        toast({
          title: 'Authentication Error',
          description: 'You must be logged in to add content',
          variant: 'destructive'
        });
        return;
      }
      
      // Map form type to database type
      let dbType = 'news';
      let defaultCategory = 'News';
      
      if (newContent.type === 'resources') {
        dbType = 'resource';
        defaultCategory = 'PDF';
      } else if (newContent.type === 'events') {
        dbType = 'event';
        defaultCategory = 'Event';
      }
      
      // Prepare content data
      const contentData = {
        title: newContent.title.trim(),
        type: dbType,
        category: newContent.category.trim() || defaultCategory,
        status: newContent.status,
        content: newContent.content.trim(),
        created_by: adminUser.id,
        published_at: newContent.status === 'Published' ? new Date().toISOString() : null,
      };
      
      console.log('Inserting content data:', contentData);
      
      // Insert new content to database
      const { data, error } = await supabase
        .from('content')
        .insert([contentData])
        .select();
        
      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Content added successfully',
      });
      
      // Refresh data and close dialog
      fetchContentData();
      setIsAddContentOpen(false);
      setNewContent({
        title: '',
        type: 'news',
        category: '',
        status: 'Draft',
        content: '',
      });
    } catch (error) {
      console.error('Error adding content:', error);
      toast({
        title: 'Error',
        description: `Failed to add content: ${error.message || 'Unknown error'}`,
        variant: 'destructive'
      });
    }
  };
  
  // Edit content
  const handleEditContent = async () => {
    if (!currentContent) return;
    
    try {
      // Validate inputs
      if (!currentContent.title.trim() || !currentContent.content.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in title and content fields',
          variant: 'destructive'
        });
        return;
      }
      
      // Prepare content data
      const contentData = {
        title: currentContent.title.trim(),
        category: currentContent.category?.trim() || null,
        status: currentContent.status,
        content: currentContent.content.trim(),
        updated_at: new Date().toISOString(),
        published_at: currentContent.status === 'Published' && !currentContent.published_at 
          ? new Date().toISOString() 
          : currentContent.published_at,
      };
      
      console.log('Updating content data:', contentData);
      
      // Update content in database
      const { error } = await supabase
        .from('content')
        .update(contentData)
        .eq('id', currentContent.id);
        
      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Content updated successfully',
      });
      
      // Refresh data and close dialog
      fetchContentData();
      setIsEditContentOpen(false);
      setCurrentContent(null);
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: 'Error',
        description: `Failed to update content: ${error.message || 'Unknown error'}`,
        variant: 'destructive'
      });
    }
  };
  
  // Delete content
  const handleDeleteContent = async () => {
    if (!currentContent) return;
    
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', currentContent.id);
        
      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Content deleted successfully',
      });
      
      // Refresh data and close dialog
      fetchContentData();
      setIsDeleteDialogOpen(false);
      setCurrentContent(null);
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: 'Error',
        description: `Failed to delete content: ${error.message || 'Unknown error'}`,
        variant: 'destructive'
      });
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    fetchContentData(value);
  };
  
  // Open edit dialog
  const openEditDialog = (item: ContentItem) => {
    setCurrentContent({...item});
    setIsEditContentOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (item: ContentItem) => {
    setCurrentContent({...item});
    setIsDeleteDialogOpen(true);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Set default category based on content type
  const handleContentTypeChange = (type: string) => {
    let defaultCategory = '';
    if (type === 'news') {
      defaultCategory = 'News';
    } else if (type === 'resources') {
      defaultCategory = 'PDF';
    } else if (type === 'events') {
      defaultCategory = 'Event';
    }
    
    setNewContent({
      ...newContent,
      type,
      category: defaultCategory
    });
  };
  
  // Fetch data on component mount and tab change
  useEffect(() => {
    if (isAuthenticated) {
      fetchContentData(activeTab);
    }
  }, [isAuthenticated, activeTab]);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText size={28} />
          Content Management
        </h1>
        
        <Button 
          className="flex items-center gap-2"
          onClick={() => {
            setNewContent({
              title: '',
              type: activeTab === 'resources' ? 'resources' : activeTab,
              category: '',
              status: 'Draft',
              content: '',
            });
            setIsAddContentOpen(true);
          }}
        >
          <Plus size={16} />
          Add New Content
        </Button>
      </div>
      
      <Tabs defaultValue="news" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper size={16} />
            News & Updates
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Upload size={16} />
            Resources
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar size={16} />
            Events
          </TabsTrigger>
        </TabsList>
        
        {/* News Tab */}
        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>News & Updates</CardTitle>
              <CardDescription>
                Manage news articles and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-kano-primary" />
                </div>
              ) : contentItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No news articles found.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setNewContent({
                        title: '',
                        type: 'news',
                        category: 'News',
                        status: 'Draft',
                        content: '',
                      });
                      setIsAddContentOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create Your First News Article
                  </Button>
                </div>
              ) : (
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{item.title}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{item.category || 'Uncategorized'}</td>
                          <td className="px-4 py-4 text-sm">
                            <Badge className={item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">{formatDate(item.updated_at)}</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 flex items-center"
                                onClick={() => openEditDialog(item)}
                              >
                                <Pencil className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 flex items-center text-red-600"
                                onClick={() => openDeleteDialog(item)}
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>
                Manage downloadable resources and documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-kano-primary" />
                </div>
              ) : contentItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No resources found.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setNewContent({
                        title: '',
                        type: 'resources',
                        category: 'PDF',
                        status: 'Draft',
                        content: '',
                      });
                      setIsAddContentOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Resource
                  </Button>
                </div>
              ) : (
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{item.title}</td>
                          <td className="px-4 py-4 text-sm">
                            <Badge className="bg-blue-100 text-blue-800">
                              {item.category || 'PDF'}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">{formatDate(item.created_at)}</td>
                          <td className="px-4 py-4 text-sm">
                            <Badge className={item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 flex items-center"
                                onClick={() => openEditDialog(item)}
                              >
                                <Pencil className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 flex items-center text-red-600"
                                onClick={() => openDeleteDialog(item)}
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Manage events and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-kano-primary" />
                </div>
              ) : contentItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No events found.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setNewContent({
                        title: '',
                        type: 'events',
                        category: 'Event',
                        status: 'Draft',
                        content: '',
                      });
                      setIsAddContentOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Event
                  </Button>
                </div>
              ) : (
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((item) => {
                        let eventDetails: EventDetails = {};
                        try {
                          eventDetails = JSON.parse(item.content || '{}');
                        } catch {
                          eventDetails = {};
                        }
                        return (
                          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">{item.title}</td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {eventDetails.date || formatDate(item.created_at)}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {eventDetails.location || 'Kano State'}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <Badge 
                                className={
                                  new Date(eventDetails.date || item.created_at) > new Date() 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }
                              >
                                {new Date(eventDetails.date || item.created_at) > new Date() ? 'Upcoming' : 'Past'}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 px-2 flex items-center"
                                  onClick={() => openEditDialog(item)}
                                >
                                  <Pencil className="h-3.5 w-3.5 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 px-2 flex items-center text-red-600"
                                  onClick={() => openDeleteDialog(item)}
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Content Dialog */}
      <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
            <DialogDescription>
              Create new content for your website
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="content-type">Content Type</Label>
              <Select 
                value={newContent.type} 
                onValueChange={handleContentTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News & Updates</SelectItem>
                  <SelectItem value="resources">Resource</SelectItem>
                  <SelectItem value="events">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title" 
                placeholder="Enter title"
                value={newContent.title}
                onChange={e => setNewContent({...newContent, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                placeholder="Enter category"
                value={newContent.category}
                onChange={e => setNewContent({...newContent, category: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea 
                id="content" 
                placeholder="Enter content"
                className="min-h-32"
                value={newContent.content}
                onChange={e => setNewContent({...newContent, content: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newContent.status} 
                onValueChange={value => setNewContent({...newContent, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddContentOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddContent}
              disabled={!newContent.title.trim() || !newContent.content.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Content Dialog */}
      <Dialog open={isEditContentOpen} onOpenChange={setIsEditContentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Update content details
            </DialogDescription>
          </DialogHeader>
          
          {currentContent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input 
                  id="edit-title" 
                  placeholder="Enter title"
                  value={currentContent.title}
                  onChange={e => setCurrentContent({...currentContent, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input 
                  id="edit-category" 
                  placeholder="Enter category"
                  value={currentContent.category || ''}
                  onChange={e => setCurrentContent({...currentContent, category: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content *</Label>
                <Textarea 
                  id="edit-content" 
                  placeholder="Enter content"
                  className="min-h-32"
                  value={currentContent.content}
                  onChange={e => setCurrentContent({...currentContent, content: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={currentContent.status} 
                  onValueChange={value => setCurrentContent({...currentContent, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditContentOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditContent}
              disabled={!currentContent?.title.trim() || !currentContent?.content.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Update Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Content</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this content? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentContent && (
            <div className="py-4">
              <p className="font-medium">{currentContent.title}</p>
              <p className="text-sm text-gray-500">{currentContent.type} - {formatDate(currentContent.created_at)}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteContent}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ContentManagement;
