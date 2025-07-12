
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Users, Shield, UserCheck, Briefcase } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface Career {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  image_url: string;
  link_path: string;
  icon_name: string;
  category: string;
  color: string;
  status: string;
  display_order: number;
  requirements: string;
  salary_range: string;
  location: string;
  employment_type: string;
  application_deadline: string;
  created_at: string;
  updated_at: string;
}

const CareerManagement = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    description: '',
    image_url: '',
    link_path: '',
    icon_name: 'Users',
    category: '',
    color: 'blue',
    status: 'active',
    requirements: '',
    salary_range: '',
    location: '',
    employment_type: 'full-time',
    application_deadline: ''
  });
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  const iconOptions = ['Users', 'Shield', 'UserCheck', 'Briefcase', 'Award', 'TreePine'];
  const colorOptions = ['blue', 'green', 'red', 'purple', 'yellow', 'indigo'];
  const employmentTypes = ['full-time', 'part-time', 'contract', 'temporary'];

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCareers(data || []);
    } catch (error) {
      console.error('Error fetching careers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch careers",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const careerData = {
        ...formData,
        display_order: editingCareer?.display_order || careers.length + 1,
        created_by: adminUser?.id,
        application_deadline: formData.application_deadline || null
      };

      if (editingCareer) {
        const { error } = await supabase
          .from('careers')
          .update(careerData)
          .eq('id', editingCareer.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Career updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('careers')
          .insert([careerData]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Career created successfully"
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchCareers();
    } catch (error) {
      console.error('Error saving career:', error);
      toast({
        title: "Error",
        description: "Failed to save career",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (career: Career) => {
    setEditingCareer(career);
    setFormData({
      title: career.title,
      excerpt: career.excerpt,
      description: career.description,
      image_url: career.image_url,
      link_path: career.link_path,
      icon_name: career.icon_name,
      category: career.category,
      color: career.color,
      status: career.status,
      requirements: career.requirements || '',
      salary_range: career.salary_range || '',
      location: career.location || '',
      employment_type: career.employment_type,
      application_deadline: career.application_deadline || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career?')) return;

    try {
      const { error } = await supabase
        .from('careers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Career deleted successfully"
      });
      
      fetchCareers();
    } catch (error) {
      console.error('Error deleting career:', error);
      toast({
        title: "Error",
        description: "Failed to delete career",
        variant: "destructive"
      });
    }
  };

  const toggleStatus = async (career: Career) => {
    try {
      const newStatus = career.status === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('careers')
        .update({ status: newStatus })
        .eq('id', career.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Career ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`
      });
      
      fetchCareers();
    } catch (error) {
      console.error('Error updating career status:', error);
      toast({
        title: "Error",
        description: "Failed to update career status",
        variant: "destructive"
      });
    }
  };

  const updateDisplayOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('careers')
        .update({ display_order: newOrder })
        .eq('id', id);

      if (error) throw error;
      fetchCareers();
    } catch (error) {
      console.error('Error updating display order:', error);
      toast({
        title: "Error",
        description: "Failed to update display order",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      description: '',
      image_url: '',
      link_path: '',
      icon_name: 'Users',
      category: '',
      color: 'blue',
      status: 'active',
      requirements: '',
      salary_range: '',
      location: '',
      employment_type: 'full-time',
      application_deadline: ''
    });
    setEditingCareer(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading careers...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Career Management</h1>
            <p className="text-gray-600">Manage career opportunities and job openings</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Career
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCareer ? 'Edit Career' : 'Add New Career'}</DialogTitle>
                <DialogDescription>
                  {editingCareer ? 'Update the career details' : 'Create a new career opportunity'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={2}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="salary_range">Salary Range</Label>
                    <Input
                      id="salary_range"
                      value={formData.salary_range}
                      onChange={(e) => handleInputChange('salary_range', e.target.value)}
                      placeholder="e.g., ₦45,000 - ₦65,000 monthly"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="employment_type">Employment Type</Label>
                    <Select value={formData.employment_type} onValueChange={(value) => handleInputChange('employment_type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type.replace('-', ' ')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="application_deadline">Application Deadline</Label>
                    <Input
                      id="application_deadline"
                      type="date"
                      value={formData.application_deadline}
                      onChange={(e) => handleInputChange('application_deadline', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => handleInputChange('image_url', e.target.value)}
                      placeholder="/lovable-uploads/..."
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="link_path">Link Path</Label>
                    <Input
                      id="link_path"
                      value={formData.link_path}
                      onChange={(e) => handleInputChange('link_path', e.target.value)}
                      placeholder="/careers/..."
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="icon_name">Icon</Label>
                    <Select value={formData.icon_name} onValueChange={(value) => handleInputChange('icon_name', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(icon => (
                          <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select value={formData.color} onValueChange={(value) => handleInputChange('color', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map(color => (
                          <SelectItem key={color} value={color}>{color}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCareer ? 'Update Career' : 'Create Career'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {careers.map((career, index) => (
            <Card key={career.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{career.title}</CardTitle>
                      <Badge variant={career.status === 'active' ? 'default' : 'secondary'}>
                        {career.status}
                      </Badge>
                      <Badge variant="outline" className={`bg-${career.color}-100 text-${career.color}-700`}>
                        {career.category}
                      </Badge>
                      <Badge variant="outline">
                        {career.employment_type}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{career.excerpt}</CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateDisplayOrder(career.id, Math.max(1, career.display_order - 1))}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateDisplayOrder(career.id, career.display_order + 1)}
                        disabled={index === careers.length - 1}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(career)}
                    >
                      {career.status === 'active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(career)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(career.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src={career.image_url}
                    alt={career.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                      <span>Order: {career.display_order}</span>
                      <span>Icon: {career.icon_name}</span>
                      <span>Salary: {career.salary_range}</span>
                      <span>Location: {career.location}</span>
                      <span>Deadline: {career.application_deadline || 'No deadline'}</span>
                      <span>Link: {career.link_path}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CareerManagement;
