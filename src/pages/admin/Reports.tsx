
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/components/admin/AdminLayout';
import { FileText, Search, Filter, Eye, CheckCircle, Loader2, RefreshCw, Clock, AlertTriangle, User, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/context/AdminAuthContext';

// Type definition for report
type Report = {
  id: string;
  type: string;
  location: string;
  description: string;
  reporter_name: string;
  reporter_email?: string;
  reporter_phone?: string;
  status: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  resolution_notes?: string;
};

const Reports = () => {
  const { toast } = useToast();
  const { adminUser, isAuthenticated } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Fetch reports function
  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Fetching reports...");
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      console.log("Reports fetched:", data?.length);
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: 'Error',
        description: 'Failed to load reports',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  // Fetch reports on component mount or when auth state changes
  useEffect(() => {
    console.log("Reports component mounted, auth state:", isAuthenticated);
    if (isAuthenticated) {
      fetchReports();
    }
  }, [isAuthenticated, fetchReports]);
  
  // Filter reports based on search query, status filter, and type filter
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporter_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status.toLowerCase().replace(' ', '') === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || report.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Open report details dialog
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setResolutionNotes(report.resolution_notes || '');
    setIsDialogOpen(true);
  };
  
  // Mark report as resolved
  const handleResolveReport = async () => {
    if (!selectedReport || !adminUser) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('reports')
        .update({
          status: 'Resolved',
          resolved_at: new Date().toISOString(),
          resolved_by: adminUser.id,
          resolution_notes: resolutionNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedReport.id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Report has been resolved',
      });
      
      // Refresh reports list
      fetchReports();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error resolving report:', error);
      toast({
        title: 'Error',
        description: 'Failed to resolve report',
        variant: 'destructive'
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Change report status
  const handleChangeStatus = async (reportId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Status Updated',
        description: `Report status changed to ${newStatus}`,
      });
      
      // Refresh reports list
      fetchReports();
    } catch (error) {
      console.error('Error updating report status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update report status',
        variant: 'destructive'
      });
    }
  };
  
  // Get status badge classes based on status
  const getStatusBadgeClasses = (status: string) => {
    switch(status) {
      case 'New':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get priority level based on issue type
  const getPriorityLevel = (type: string) => {
    const highPriority = ['Water Pollution', 'Air Pollution', 'Industrial Pollution'];
    const mediumPriority = ['Illegal Dumping', 'Deforestation', 'Flooding'];
    
    if (highPriority.includes(type)) return 'High';
    if (mediumPriority.includes(type)) return 'Medium';
    return 'Low';
  };

  const getPriorityBadgeClasses = (priority: string) => {
    switch(priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get unique report types for filter
  const reportTypes = Array.from(new Set(reports.map(r => r.type))).sort();
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText size={28} />
              Environmental Reports
            </h1>
            <p className="text-gray-600 mt-1">Manage and respond to citizen-reported environmental issues</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={fetchReports}
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Reports</p>
                  <p className="text-2xl font-bold text-red-600">{reports.filter(r => r.status === 'New').length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{reports.filter(r => r.status === 'In Progress').length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{reports.filter(r => r.status === 'Resolved').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold">{reports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search reports by type, location, description, or reporter..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="underreview">Under Review</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-48">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {reportTypes.map(type => (
                      <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reports List</CardTitle>
            <CardDescription>
              Environmental issues reported by citizens ({filteredReports.length} of {reports.length} reports)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-kano-primary" />
              </div>
            ) : filteredReports.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type & Priority</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => {
                      const priority = getPriorityLevel(report.type);
                      return (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium">{report.type}</p>
                              <Badge className={getPriorityBadgeClasses(priority)} variant="outline">
                                {priority} Priority
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} className="text-gray-500" />
                              <span className="text-sm">{report.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <User size={14} className="text-gray-500" />
                              <span className="text-sm">{report.reporter_name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeClasses(report.status)} variant="outline">
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="text-gray-500" />
                              <span className="text-sm">{new Date(report.created_at).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 flex items-center" 
                                onClick={() => handleViewReport(report)}
                              >
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                              {report.status !== 'Resolved' && (
                                <Select 
                                  value={report.status.toLowerCase().replace(' ', '')}
                                  onValueChange={(value) => {
                                    const statusMap: Record<string, string> = {
                                      'new': 'New',
                                      'inprogress': 'In Progress',
                                      'underreview': 'Under Review',
                                      'resolved': 'Resolved'
                                    };
                                    
                                    handleChangeStatus(report.id, statusMap[value]);
                                  }}
                                >
                                  <SelectTrigger className="h-8 w-32">
                                    <span className="text-xs">Update Status</span>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="inprogress">In Progress</SelectItem>
                                    <SelectItem value="underreview">Under Review</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No reports match your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Report Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText size={20} />
                Environmental Report Details
              </DialogTitle>
              <DialogDescription>
                Review report information and take appropriate action
              </DialogDescription>
            </DialogHeader>
            
            {selectedReport && (
              <div className="space-y-6 py-2">
                {/* Report Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Issue Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Type</h4>
                        <p className="font-medium">{selectedReport.type}</p>
                        <Badge className={getPriorityBadgeClasses(getPriorityLevel(selectedReport.type))} variant="outline">
                          {getPriorityLevel(selectedReport.type)} Priority
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <p className="flex items-center gap-1">
                          <MapPin size={14} />
                          {selectedReport.location}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Status</h4>
                        <Badge className={getStatusBadgeClasses(selectedReport.status)} variant="outline">
                          {selectedReport.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Reporter Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Name</h4>
                        <p className="flex items-center gap-1">
                          <User size={14} />
                          {selectedReport.reporter_name}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Email</h4>
                        <p>{selectedReport.reporter_email || 'Not provided'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                        <p>{selectedReport.reporter_phone || 'Not provided'}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Issue Description */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare size={18} />
                      Issue Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="bg-gray-50 p-4 rounded-md border">{selectedReport.description}</p>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar size={18} />
                      Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Submitted</span>
                        <span className="text-sm text-gray-600">{new Date(selectedReport.created_at).toLocaleString()}</span>
                      </div>
                      {selectedReport.updated_at !== selectedReport.created_at && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Last Updated</span>
                          <span className="text-sm text-gray-600">{new Date(selectedReport.updated_at).toLocaleString()}</span>
                        </div>
                      )}
                      {selectedReport.resolved_at && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Resolved</span>
                          <span className="text-sm text-gray-600">{new Date(selectedReport.resolved_at).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Resolution Notes */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Resolution Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedReport.status === 'Resolved' ? (
                      <p className="bg-green-50 p-4 rounded-md border border-green-200">
                        {selectedReport.resolution_notes || 'No resolution notes provided.'}
                      </p>
                    ) : (
                      <Textarea
                        placeholder="Enter detailed notes about the investigation, actions taken, and resolution..."
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        className="min-h-24"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              
              {selectedReport && selectedReport.status !== 'Resolved' && (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleResolveReport}
                  disabled={isUpdating || !resolutionNotes.trim()}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Resolving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Resolved
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Reports;
