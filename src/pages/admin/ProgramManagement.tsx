
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
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface Program {
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
  created_at: string;
  updated_at: string;
}

const ProgramManagement = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    description: '',
    image_url: '',
    link_path: '',
    icon_name: 'FileText',
    category: '',
    color: 'green',
    status: 'active'
  });
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  const iconOptions = ['Award', 'Recycle', 'TreePine', 'FileText', 'Microscope', 'Leaf', 'Wind', 'Users'];
  const colorOptions = ['green', 'blue', 'red', 'purple', 'yellow', 'indigo'];

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch programs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const programData = {
        ...formData,
        display_order: editingProgram?.display_order || programs.length + 1,
        created_by: adminUser?.id
      };

      if (editingProgram) {
        const { error } = await supabase
          .from('programs')
          .update(programData)
          .eq('id', editingProgram.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Program updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([programData]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Program created successfully"
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
      toast({
        title: "Error",
        description: "Failed to save program",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      excerpt: program.excerpt,
      description: program.description,
      image_url: program.image_url,
      link_path: program.link_path,
      icon_name: program.icon_name,
      category: program.category,
      color: program.color,
      status: program.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Program deleted successfully"
      });
      
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
      toast({
        title: "Error",
        description: "Failed to delete program",
        variant: "destructive"
      });
    }
  };

  const toggleStatus = async (program: Program) => {
    try {
      const newStatus = program.status === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('programs')
        .update({ status: newStatus })
        .eq('id', program.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Program ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`
      });
      
      fetchPrograms();
    } catch (error) {
      console.error('Error updating program status:', error);
      toast({
        title: "Error",
        description: "Failed to update program status",
        variant: "destructive"
      });
    }
  };

  const updateDisplayOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('programs')
        .update({ display_order: newOrder })
        .eq('id', id);

      if (error) throw error;
      fetchPrograms();
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
      icon_name: 'FileText',
      category: '',
      color: 'green',
      status: 'active'
    });
    setEditingProgram(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading programs...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Program Management</h1>
            <p className="text-gray-600">Manage programs that appear on the website</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProgram ? 'Edit Program' : 'Add New Program'}</DialogTitle>
                <DialogDescription>
                  {editingProgram ? 'Update the program details' : 'Create a new program that will appear on the website'}
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
                      placeholder="/programs/..."
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
                    {editingProgram ? 'Update Program' : 'Create Program'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {programs.map((program, index) => (
            <Card key={program.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{program.title}</CardTitle>
                      <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                        {program.status}
                      </Badge>
                      <Badge variant="outline" className={`bg-${program.color}-100 text-${program.color}-700`}>
                        {program.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{program.excerpt}</CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateDisplayOrder(program.id, Math.max(1, program.display_order - 1))}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateDisplayOrder(program.id, program.display_order + 1)}
                        disabled={index === programs.length - 1}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(program)}
                    >
                      {program.status === 'active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(program)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(program.id)}
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
                    src={program.image_url}
                    alt={program.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Order: {program.display_order}</span>
                      <span>Icon: {program.icon_name}</span>
                      <span>Color: {program.color}</span>
                      <span>Link: {program.link_path}</span>
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

export default ProgramManagement;
