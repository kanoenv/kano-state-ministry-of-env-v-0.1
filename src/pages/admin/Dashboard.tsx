
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Users, 
  FileText, 
  TreePine, 
  AlertTriangle, 
  TrendingUp,
  Download,
  Building2,
  UserCheck,
  Clock,
  XCircle,
  LayoutDashboard
} from "lucide-react";

interface DashboardStats {
  totalReports: number;
  totalTreeApplications: number;
  totalClimateActors: number;
  pendingClimateActors: number;
  approvedClimateActors: number;
  rejectedClimateActors: number;
  totalPdfDocuments: number;
  totalCareers: number;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    totalTreeApplications: 0,
    totalClimateActors: 0,
    pendingClimateActors: 0,
    approvedClimateActors: 0,
    rejectedClimateActors: 0,
    totalPdfDocuments: 0,
    totalCareers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // Load all stats in parallel
      const [
        reportsResponse,
        treeApplicationsResponse,
        climateActorsResponse,
        pdfDocumentsResponse,
        careersResponse
      ] = await Promise.all([
        supabase.from('reports').select('id', { count: 'exact' }),
        supabase.from('five_million_trees_applications').select('id', { count: 'exact' }),
        supabase.from('climate_actors').select('id, status', { count: 'exact' }),
        supabase.from('pdf_documents').select('id', { count: 'exact' }),
        supabase.from('careers').select('id', { count: 'exact' })
      ]);

      // Process climate actors by status
      const climateActors = climateActorsResponse.data || [];
      const pendingCount = climateActors.filter(actor => actor.status === 'pending').length;
      const approvedCount = climateActors.filter(actor => actor.status === 'approved').length;
      const rejectedCount = climateActors.filter(actor => actor.status === 'rejected').length;

      setStats({
        totalReports: reportsResponse.count || 0,
        totalTreeApplications: treeApplicationsResponse.count || 0,
        totalClimateActors: climateActorsResponse.count || 0,
        pendingClimateActors: pendingCount,
        approvedClimateActors: approvedCount,
        rejectedClimateActors: rejectedCount,
        totalPdfDocuments: pdfDocumentsResponse.count || 0,
        totalCareers: careersResponse.count || 0,
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportAllData = async () => {
    try {
      // Fetch all data
      const [
        climateActorsData,
        reportsData,
        treeApplicationsData,
        pdfDocumentsData,
        careersData
      ] = await Promise.all([
        supabase.from('climate_actors').select('*'),
        supabase.from('reports').select('*'),
        supabase.from('five_million_trees_applications').select('*'),
        supabase.from('pdf_documents').select('*'),
        supabase.from('careers').select('*')
      ]);

      // Create workbook with multiple sheets
      const createCSV = (data: any[], filename: string) => {
        if (!data || data.length === 0) return;
        
        const headers = Object.keys(data[0]);
        const csvContent = [
          headers.join(','),
          ...data.map(row => 
            headers.map(header => {
              const value = row[header];
              if (Array.isArray(value)) {
                return `"${value.join('; ')}"`;
              }
              return `"${value || ''}"`;
            }).join(',')
          )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      // Export each dataset
      if (climateActorsData.data) createCSV(climateActorsData.data, 'climate-actors');
      if (reportsData.data) createCSV(reportsData.data, 'reports');
      if (treeApplicationsData.data) createCSV(treeApplicationsData.data, 'tree-applications');
      if (pdfDocumentsData.data) createCSV(pdfDocumentsData.data, 'pdf-documents');
      if (careersData.data) createCSV(careersData.data, 'careers');

      toast({
        title: "Export Successful",
        description: "All data has been exported to CSV files",
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export data",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
              <LayoutDashboard className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Comprehensive system overview and analytics
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="text-right text-sm text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p>System Status: <span className="text-success font-medium">Online</span></p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="shadow-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button onClick={exportAllData} className="flex items-center gap-2 shadow-sm">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Environmental Reports</p>
                <p className="text-3xl font-bold text-destructive">{stats.totalReports}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Issues tracked & resolved
                </p>
              </div>
              <div className="p-4 bg-destructive/10 rounded-xl group-hover:bg-destructive/20 transition-colors">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Tree Applications</p>
                <p className="text-3xl font-bold text-success">{stats.totalTreeApplications}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TreePine className="h-3 w-3" />
                  5M Trees initiative
                </p>
              </div>
              <div className="p-4 bg-success/10 rounded-xl group-hover:bg-success/20 transition-colors">
                <TreePine className="h-8 w-8 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Climate Organizations</p>
                <p className="text-3xl font-bold text-primary">{stats.totalClimateActors}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  Registered partners
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-info/5 to-info/10 border-info/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Career Opportunities</p>
                <p className="text-3xl font-bold text-info">{stats.totalCareers}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Open positions
                </p>
              </div>
              <div className="p-4 bg-info/10 rounded-xl group-hover:bg-info/20 transition-colors">
                <Users className="h-8 w-8 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-warning">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingClimateActors}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Organizations awaiting approval
            </p>
            <div className="mt-3">
              <Button variant="outline" size="sm" className="text-warning border-warning">
                Review Applications
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
              <UserCheck className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.approvedClimateActors}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Verified organizations in registry
            </p>
            <div className="mt-3">
              <Button variant="outline" size="sm" className="text-success border-success">
                View Registry
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Rejected Applications</CardTitle>
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.rejectedClimateActors}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Applications not meeting criteria
            </p>
            <div className="mt-3">
              <Button variant="outline" size="sm" className="text-destructive border-destructive">
                Review Rejections
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content & System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Document Library</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalPdfDocuments}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Laws, regulations & guidelines
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                Manage Docs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">System Status</CardTitle>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Operational</div>
            <p className="text-sm text-muted-foreground mt-1">
              All services running smoothly
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database</span>
                <span className="text-success">✓ Healthy</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>API</span>
                <span className="text-success">✓ Online</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
              <TrendingUp className="h-5 w-5 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">Live</div>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time platform activity
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>New tree application</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-info rounded-full animate-pulse"></div>
                <span>Climate actor registered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
