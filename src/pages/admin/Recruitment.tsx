
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
  ChevronDown, 
  Search, 
  Filter, 
  Loader2, 
  FilePlus, 
  Eye,
  FileCheck,
  FileX
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

interface Application {
  id: string;
  full_name: string;
  lga_of_origin: string;
  highest_qualification: string;
  phone_number: string;
  email: string;
  reference_number: string;
  status: string;
  created_at: string;
  photo_url?: string | null;
  birth_certificate_url?: string | null;
  education_certificate_url?: string | null;
  lga_letter_url?: string | null;
  gender?: string;
  date_of_birth?: string;
  nationality?: string;
  state_of_origin?: string;
  contact_address?: string;
  examination_number?: string | null;
  graduation_year?: string;
  can_complete_trek?: boolean;
  has_prior_training?: boolean;
  prior_training_details?: string | null;
}

const Recruitment = () => {
  const { isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  
  // Fetch applications
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('recruitment_applications')
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
        app.full_name.toLowerCase().includes(search) ||
        app.reference_number.toLowerCase().includes(search) ||
        app.lga_of_origin.toLowerCase().includes(search) ||
        app.email.toLowerCase().includes(search)
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
  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };
  
  // Update application status
  const handleUpdateStatus = (application: Application) => {
    setSelectedApplication(application);
    setNewStatus(application.status);
    setIsStatusDialogOpen(true);
  };
  
  // Save updated status
  const saveStatusChange = async () => {
    if (!selectedApplication || !newStatus) return;
    
    try {
      const { error } = await supabase
        .from('recruitment_applications')
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
        description: `Application status for ${selectedApplication.full_name} changed to ${newStatus}`,
      });
      
      setIsStatusDialogOpen(false);
      setStatusNote('');
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
    // Define CSV headers
    const headers = [
      'Reference Number',
      'Full Name',
      'Email',
      'Phone',
      'LGA of Origin',
      'Qualification',
      'Status',
      'Application Date'
    ];
    
    // Format application data for CSV
    const csvRows = [
      headers.join(','),
      ...filteredApplications.map(app => [
        app.reference_number,
        `"${app.full_name}"`,
        app.email,
        app.phone_number,
        app.lga_of_origin,
        app.highest_qualification,
        app.status,
        new Date(app.created_at).toLocaleDateString()
      ].join(','))
    ];
    
    // Create and download CSV file
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `forest_guard_applications_${new Date().toISOString().split('T')[0]}.csv`);
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
      case 'shortlisted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'interview':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Forest Guard Recruitment</h1>
      
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Applications Dashboard</CardTitle>
            <CardDescription>
              Manage and review forest guard recruitment applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-blue-700">{applications.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Shortlisted</p>
                <p className="text-3xl font-bold text-green-700">
                  {applications.filter(a => a.status === 'Shortlisted').length}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-700">
                  {applications.filter(a => a.status === 'Pending').length}
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
            Review and manage forest guard applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, reference number or LGA"
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
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
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
                    <TableHead>Reference No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">LGA of Origin</TableHead>
                    <TableHead className="hidden md:table-cell">Qualification</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Applied On</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-mono">
                        {application.reference_number}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.full_name}</div>
                          <div className="text-xs text-gray-500">{application.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {application.lga_of_origin}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {application.highest_qualification}
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
                              <FilePlus className="h-4 w-4" />
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
              <p className="text-gray-500">No applications match your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Application Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Viewing application {selectedApplication?.reference_number}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="grid gap-6 py-4">
              <div className="flex flex-col md:flex-row gap-6">
                {selectedApplication.photo_url && (
                  <div className="md:w-1/3">
                    <img 
                      src={selectedApplication.photo_url} 
                      alt={selectedApplication.full_name}
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
                
                <div className={`${selectedApplication.photo_url ? 'md:w-2/3' : 'w-full'}`}>
                  <h3 className="text-xl font-bold mb-2">{selectedApplication.full_name}</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <Label className="text-gray-500 text-sm">Reference Number</Label>
                      <p className="font-mono">{selectedApplication.reference_number}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Status</Label>
                      <Badge className={`border ${getStatusBadgeColor(selectedApplication.status)}`}>
                        {selectedApplication.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-sm">Applied On</Label>
                      <p>{formatDate(selectedApplication.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-lg mb-3">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Gender</Label>
                    <p>{selectedApplication.gender}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Date of Birth</Label>
                    <p>{selectedApplication.date_of_birth}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Nationality</Label>
                    <p>{selectedApplication.nationality}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">State of Origin</Label>
                    <p>{selectedApplication.state_of_origin}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">LGA of Origin</Label>
                    <p>{selectedApplication.lga_of_origin}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-500 text-sm">Contact Address</Label>
                    <p>{selectedApplication.contact_address}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Phone Number</Label>
                    <p>{selectedApplication.phone_number}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Email</Label>
                    <p>{selectedApplication.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-lg mb-3">Qualifications & Fitness</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Highest Qualification</Label>
                    <p>{selectedApplication.highest_qualification}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Examination Number</Label>
                    <p>{selectedApplication.examination_number || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Graduation Year</Label>
                    <p>{selectedApplication.graduation_year}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Can Complete 5km Trek?</Label>
                    <p>{selectedApplication.can_complete_trek ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Has Prior Training?</Label>
                    <p>{selectedApplication.has_prior_training ? 'Yes' : 'No'}</p>
                  </div>
                  {selectedApplication.has_prior_training && (
                    <div className="md:col-span-2">
                      <Label className="text-gray-500 text-sm">Prior Training Details</Label>
                      <p>{selectedApplication.prior_training_details || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-lg mb-3">Uploaded Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Birth Certificate / ID</Label>
                    {selectedApplication.birth_certificate_url ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-1 w-full"
                        asChild
                      >
                        <a href={selectedApplication.birth_certificate_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          View Document
                        </a>
                      </Button>
                    ) : (
                      <div className="mt-1 p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
                        No document uploaded
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-sm">Education Certificate</Label>
                    {selectedApplication.education_certificate_url ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-1 w-full"
                        asChild
                      >
                        <a href={selectedApplication.education_certificate_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          View Document
                        </a>
                      </Button>
                    ) : (
                      <div className="mt-1 p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
                        No document uploaded
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-sm">LGA Letter</Label>
                    {selectedApplication.lga_letter_url ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-1 w-full"
                        asChild
                      >
                        <a href={selectedApplication.lga_letter_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          View Document
                        </a>
                      </Button>
                    ) : (
                      <div className="mt-1 p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
                        No document uploaded
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-gray-500 text-sm">Applicant Photo</Label>
                    {selectedApplication.photo_url ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-1 w-full"
                        asChild
                      >
                        <a href={selectedApplication.photo_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          View Photo
                        </a>
                      </Button>
                    ) : (
                      <div className="mt-1 p-2 border border-dashed border-gray-300 rounded text-center text-sm text-gray-500">
                        No photo uploaded
                      </div>
                    )}
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
              Change the status for applicant: {selectedApplication?.full_name}
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
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="statusNote">Notes (optional)</Label>
              <Input
                id="statusNote"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Add any notes about this status change"
              />
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

export default Recruitment;
