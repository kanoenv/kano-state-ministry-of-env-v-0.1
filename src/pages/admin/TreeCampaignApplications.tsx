
import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Search, 
  Filter, 
  Loader2, 
  Eye,
  FileCheck,
  FileX,
  TreePine
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TreeApplication {
  id: string;
  organization_name: string;
  organization_type: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  planting_sites: number;
  seedlings_requested: number;
  locations: string;
  volunteers: number;
  status: string;
  created_at: string;
  address: string;
  date_established: string;
  other_type?: string;
  contact_position: string;
  previous_experience?: string;
  survival_rate_commitment: string;
  training_commitment: boolean;
  tracking_tool_commitment: boolean;
  coordinator_commitment: boolean;
  representative_name: string;
  representative_position: string;
  submission_date: string;
}

const TreeCampaignApplications = () => {
  const { isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<TreeApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<TreeApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<TreeApplication | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  
  // Fetch applications
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('five_million_trees_applications')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setApplications(data || []);
      setFilteredApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        variant: 'destructive',
        title: 'Error loading applications',
        description: 'Could not load application data',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter applications based on search term and status filter
  useEffect(() => {
    if (!applications.length) return;
    
    let filtered = [...applications];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.organization_name.toLowerCase().includes(search) ||
        app.contact_name.toLowerCase().includes(search) ||
        app.contact_email.toLowerCase().includes(search) ||
        app.locations.toLowerCase().includes(search)
      );
    }
    
    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);
  
  // Initial data fetch
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);
  
  // View application details
  const handleViewDetails = (application: TreeApplication) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };
  
  // Update application status
  const handleUpdateStatus = (application: TreeApplication) => {
    setSelectedApplication(application);
    setNewStatus(application.status);
    setIsStatusDialogOpen(true);
  };
  
  // Save updated status
  const saveStatusChange = async () => {
    if (!selectedApplication || !newStatus) return;
    
    try {
      const { error } = await supabase
        .from('five_million_trees_applications')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedApplication.id);
        
      if (error) throw error;
      
      // Update local state
      const updatedApplications = applications.map(app => 
        app.id === selectedApplication.id ? { ...app, status: newStatus } : app
      );
      
      setApplications(updatedApplications);
      setFilteredApplications(
        filteredApplications.map(app => 
          app.id === selectedApplication.id ? { ...app, status: newStatus } : app
        )
      );
      
      toast({
        title: 'Status Updated',
        description: `Application status for ${selectedApplication.organization_name} changed to ${newStatus}`,
      });
      
      setIsStatusDialogOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update application status',
      });
    }
  };
  
  // Download application data as CSV
  const downloadCSV = () => {
    const headers = [
      'Organization Name',
      'Contact Name',
      'Email',
      'Phone',
      'Organization Type',
      'Planting Sites',
      'Seedlings Requested',
      'Volunteers',
      'Locations',
      'Status',
      'Application Date'
    ];
    
    const csvRows = [
      headers.join(','),
      ...filteredApplications.map(app => [
        `"${app.organization_name}"`,
        `"${app.contact_name}"`,
        app.contact_email,
        app.contact_phone,
        app.organization_type,
        app.planting_sites,
        app.seedlings_requested,
        app.volunteers,
        `"${app.locations}"`,
        app.status,
        new Date(app.created_at).toLocaleDateString()
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `five_million_trees_applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };
  
  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString().substring(0, 5);
  };
  
  // Get badge color based on application status
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'under review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <AdminLayout>
      <div className="flex items-center gap-3 mb-6">
        <TreePine className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold">Five Million Trees Campaign Applications</h1>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Applications Dashboard</CardTitle>
            <CardDescription>
              Manage and review Five Million Trees Campaign applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-blue-700">{applications.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-700">
                  {applications.filter(a => a.status === 'Approved').length}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-700">
                  {applications.filter(a => a.status === 'Pending').length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Seedlings</p>
                <p className="text-3xl font-bold text-purple-700">
                  {applications.reduce((sum, app) => sum + app.seedlings_requested, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Application List</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-green-600 text-green-700 hover:bg-green-50"
              onClick={downloadCSV}
            >
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </Button>
          </CardTitle>
          <CardDescription>
            Review and manage campaign applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by organization name, contact name, email or location"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Applications Table */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredApplications.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Organization</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead className="hidden md:table-cell">Seedlings</TableHead>
                    <TableHead className="hidden md:table-cell">Volunteers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Applied On</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.organization_name}</div>
                          <div className="text-xs text-gray-500">{application.organization_type}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.contact_name}</div>
                          <div className="text-xs text-gray-500">{application.contact_email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {application.seedlings_requested.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {application.volunteers}
                      </TableCell>
                      <TableCell>
                        <Badge className={`border ${getStatusBadgeColor(application.status)}`}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(application.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(application)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateStatus(application)}
                          >
                            {application.status === 'Approved' ? (
                              <FileCheck className="h-4 w-4 text-green-600" />
                            ) : application.status === 'Rejected' ? (
                              <FileX className="h-4 w-4 text-red-600" />
                            ) : (
                              <FileCheck className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-16 border rounded-md bg-gray-50">
              <TreePine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications match your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Application Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Viewing application from {selectedApplication?.organization_name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Organization Information</h3>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-gray-500 text-sm">Organization Name</Label>
                      <p className="font-medium">{selectedApplication.organization_name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Type</Label>
                      <p>{selectedApplication.organization_type}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Date Established</Label>
                      <p>{selectedApplication.date_established}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Address</Label>
                      <p>{selectedApplication.address}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-gray-500 text-sm">Contact Person</Label>
                      <p className="font-medium">{selectedApplication.contact_name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Position</Label>
                      <p>{selectedApplication.contact_position}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Phone</Label>
                      <p>{selectedApplication.contact_phone}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Email</Label>
                      <p>{selectedApplication.contact_email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3">Planting Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Planting Sites</Label>
                    <p className="font-medium">{selectedApplication.planting_sites}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Seedlings Requested</Label>
                    <p className="font-medium">{selectedApplication.seedlings_requested.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Volunteers</Label>
                    <p className="font-medium">{selectedApplication.volunteers}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Survival Rate Commitment</Label>
                    <p className="font-medium">{selectedApplication.survival_rate_commitment}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-500 text-sm">Locations</Label>
                    <p>{selectedApplication.locations}</p>
                  </div>
                  {selectedApplication.previous_experience && (
                    <div className="md:col-span-2">
                      <Label className="text-gray-500 text-sm">Previous Experience</Label>
                      <p>{selectedApplication.previous_experience}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3">Commitments</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${selectedApplication.training_commitment ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Training Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${selectedApplication.tracking_tool_commitment ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Digital Tracking Tool</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${selectedApplication.coordinator_commitment ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Tree-Care Coordinator</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3">Declaration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Representative Name</Label>
                    <p className="font-medium">{selectedApplication.representative_name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Position</Label>
                    <p>{selectedApplication.representative_position}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Submission Date</Label>
                    <p>{selectedApplication.submission_date}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Current Status</Label>
                    <Badge className={`border ${getStatusBadgeColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => handleUpdateStatus(selectedApplication!)}
              disabled={!selectedApplication}
            >
              Update Status
            </Button>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>
              Change the status for: {selectedApplication?.organization_name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveStatusChange}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TreeCampaignApplications;
