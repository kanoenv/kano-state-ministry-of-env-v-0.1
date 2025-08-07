import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Search, 
  Download, 
  Eye, 
  Filter,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface RecruitmentApplication {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  status: string;
  date_of_birth: string;
  gender: string;
  state_of_origin: string;
  lga_of_origin: string;
  contact_address: string;
  nationality: string;
  highest_qualification: string;
  graduation_year: string;
  examination_number?: string;
  has_prior_training: boolean;
  can_complete_trek: boolean;
  prior_training_details?: string;
  reference_number: string;
  created_at: string;
  photo_url?: string;
  birth_certificate_url?: string;
  education_certificate_url?: string;
  lga_letter_url?: string;
}

const ForestGuardApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<RecruitmentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredApplications, setFilteredApplications] = useState<RecruitmentApplication[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('recruitment_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch forest guard applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone_number.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status.toLowerCase() === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('recruitment_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        )
      );

      toast({
        title: "Status Updated",
        description: `Application status updated to ${newStatus}`,
      });
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Reference Number', 'Full Name', 'Email', 'Phone', 'Status', 'Date of Birth',
      'Gender', 'State of Origin', 'LGA of Origin', 'Qualification', 'Created At'
    ];
    
    const csvData = filteredApplications.map(app => [
      app.reference_number,
      app.full_name,
      app.email,
      app.phone_number,
      app.status,
      app.date_of_birth,
      app.gender,
      app.state_of_origin,
      app.lga_of_origin,
      app.highest_qualification,
      new Date(app.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `forest_guard_applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><AlertCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Forest Guard Applications</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status.toLowerCase() === 'pending').length,
    approved: applications.filter(app => app.status.toLowerCase() === 'approved').length,
    rejected: applications.filter(app => app.status.toLowerCase() === 'rejected').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Forest Guard Applications</h1>
          <p className="text-muted-foreground">
            Manage and review all forest guard recruitment applications
          </p>
        </div>
        <Button onClick={exportToCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Successfully approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Not approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone, or reference number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          <CardDescription>
            Review and manage forest guard applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No applications found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{application.full_name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ref: {application.reference_number}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{application.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{application.phone_number}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{application.lga_of_origin}, {application.state_of_origin}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{application.highest_qualification}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{new Date(application.created_at).toLocaleDateString()}</span>
                        </div>
                        <div>
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Select
                        value={application.status}
                        onValueChange={(value) => updateApplicationStatus(application.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/admin/recruitment?id=${application.id}`} className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </AdminLayout>
  );
};

export default ForestGuardApplications;
