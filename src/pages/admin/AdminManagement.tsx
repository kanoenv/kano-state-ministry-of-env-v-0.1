
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import { Users, UserPlus, Loader2, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/context/AdminAuthContext';

type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'content_admin' | 'reports_admin';
  is_active: boolean;
  created_at: string;
  last_login?: string;
};

const AdminManagement = () => {
  const { toast } = useToast();
  const { adminUser, canCreateAdmins } = useAdminAuth();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'super_admin' | 'content_admin' | 'reports_admin'>('content_admin');
  const [isCreating, setIsCreating] = useState(false);

  // Fetch admin users
  const fetchAdminUsers = async () => {
    if (!canCreateAdmins()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Fetching admin users...');
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, full_name, role, is_active, created_at, last_login')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching admin users:', error);
        throw error;
      }
      
      console.log('Admin users fetched:', data);
      setAdminUsers(data || []);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load admin users',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, [adminUser]);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!newAdminEmail || !newAdminPassword || !newAdminName) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (newAdminPassword.length < 6) {
      toast({
        title: 'Validation Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive'
      });
      return;
    }

    setIsCreating(true);
    
    try {
      console.log('Creating admin user:', { 
        email: newAdminEmail, 
        role: newAdminRole, 
        fullName: newAdminName 
      });
      
      // Check if user already exists first
      const { data: existingUser, error: checkError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', newAdminEmail)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing user:', checkError);
        throw new Error('Failed to check existing user');
      }

      if (existingUser) {
        throw new Error('Admin user with this email already exists');
      }

      // Create admin user using the database function
      const { data, error } = await supabase.rpc('create_admin_user', {
        admin_email: newAdminEmail,
        admin_password: newAdminPassword,
        admin_name: newAdminName,
        admin_role_param: newAdminRole
      });

      console.log('Registration response:', { data, error });

      if (error) {
        console.error('Registration error:', error);
        throw new Error(error.message || 'Failed to create admin account');
      }

      toast({
        title: "Success",
        description: "Admin account created successfully",
      });
      
      // Clear form and close dialog
      setNewAdminEmail('');
      setNewAdminName('');
      setNewAdminPassword('');
      setNewAdminRole('content_admin');
      setIsDialogOpen(false);
      
      // Refresh admin list
      fetchAdminUsers();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to create admin account",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const toggleAdminStatus = async (adminId: string, currentStatus: boolean) => {
    if (adminId === adminUser?.id) {
      toast({
        title: 'Error',
        description: 'You cannot deactivate your own account',
        variant: 'destructive'
      });
      return;
    }

    try {
      console.log('Toggling admin status:', { adminId, currentStatus });
      const { error } = await supabase
        .from('admin_users')
        .update({ is_active: !currentStatus })
        .eq('id', adminId);
        
      if (error) {
        console.error('Error updating admin status:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: `Admin account ${!currentStatus ? 'activated' : 'deactivated'}`,
      });
      
      fetchAdminUsers();
    } catch (error) {
      console.error('Error updating admin status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update admin status',
        variant: 'destructive'
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'content_admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reports_admin':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch(role) {
      case 'super_admin':
        return 'Super Admin';
      case 'content_admin':
        return 'Content Admin';
      case 'reports_admin':
        return 'Reports Admin';
      default:
        return role;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  if (!canCreateAdmins()) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-500">Only Super Admins can manage admin accounts.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users size={28} />
              Admin Management
            </h1>
            <p className="text-gray-600 mt-1">Manage admin users and their permissions</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus size={16} />
                Create Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Admin</DialogTitle>
                <DialogDescription>
                  Create a new admin account with specified role and permissions.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name *</Label>
                  <Input 
                    id="admin-name"
                    type="text"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email *</Label>
                  <Input 
                    id="admin-email"
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    required
                    placeholder="admin@environment.kn.gov.ng"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password *</Label>
                  <Input 
                    id="admin-password"
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-role">Role *</Label>
                  <Select value={newAdminRole} onValueChange={(value: any) => setNewAdminRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="content_admin">Content Admin</SelectItem>
                      <SelectItem value="reports_admin">Reports Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isCreating || !newAdminEmail || !newAdminPassword || !newAdminName}
                    className="flex-1"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Admin"
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Admin Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>
              Manage admin accounts and their access levels ({adminUsers.length} total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-kano-primary" />
              </div>
            ) : adminUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name & Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{admin.full_name || 'No name provided'}</p>
                            <p className="text-sm text-gray-600">{admin.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(admin.role)} variant="outline">
                            {getRoleLabel(admin.role)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={admin.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} 
                            variant="outline"
                          >
                            {admin.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {admin.last_login ? formatDate(admin.last_login) : 'Never'}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {admin.id !== adminUser?.id && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toggleAdminStatus(admin.id, admin.is_active)}
                              >
                                {admin.is_active ? 'Deactivate' : 'Activate'}
                              </Button>
                            )}
                            {admin.id === adminUser?.id && (
                              <span className="text-sm text-gray-500">Current User</span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No admin users found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminManagement;
