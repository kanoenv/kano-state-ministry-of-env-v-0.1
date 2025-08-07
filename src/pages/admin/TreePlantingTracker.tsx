import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  TreePine, 
  MapPin, 
  Calendar,
  Users,
  Search,
  Filter,
  Eye,
  Download,
  BarChart3,
  TrendingUp,
  Activity,
  Sprout
} from "lucide-react";

interface TreeRecord {
  id: string;
  quantity: number;
  species: string;
  location: string;
  planting_date: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
  photos?: any;
  planter_id?: string;
  organization_id?: string;
  created_at: string;
  updated_at: string;
}

interface Organization {
  id: string;
  name: string;
  email: string;
  region: string;
  seeds_assigned: number;
  seeds_planted: number;
  is_active: boolean;
}

interface TreePlanter {
  id: string;
  name: string;
  email: string;
  trees_planted: number;
  organization_id?: string;
  is_active: boolean;
}

const TreePlantingTrackerContent = () => {
  const { toast } = useToast();
  const [treeRecords, setTreeRecords] = useState<TreeRecord[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [planters, setPlanters] = useState<TreePlanter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [organizationFilter, setOrganizationFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    Promise.all([
      fetchTreeRecords(),
      fetchOrganizations(), 
      fetchPlanters()
    ]).finally(() => setLoading(false));
  }, []);

  const fetchTreeRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('tree_records')
        .select('*')
        .order('planting_date', { ascending: false });

      if (error) throw error;
      setTreeRecords(data || []);
    } catch (error: any) {
      console.error('Error fetching tree records:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tree planting records",
        variant: "destructive"
      });
    }
  };

  const fetchOrganizations = async () => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setOrganizations(data || []);
    } catch (error: any) {
      console.error('Error fetching organizations:', error);
    }
  };

  const fetchPlanters = async () => {
    try {
      const { data, error } = await supabase
        .from('tree_planters')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setPlanters(data || []);
    } catch (error: any) {
      console.error('Error fetching planters:', error);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Date', 'Location', 'Species', 'Quantity', 'Planter', 'Organization', 'Notes'
    ];
    
    const csvData = filteredRecords.map(record => [
      record.planting_date,
      record.location,
      record.species,
      record.quantity,
      getPlanterName(record.planter_id),
      getOrganizationName(record.organization_id),
      record.notes || ''
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tree_planting_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPlanterName = (planterId?: string) => {
    if (!planterId) return 'Unknown';
    const planter = planters.find(p => p.id === planterId);
    return planter?.name || 'Unknown';
  };

  const getOrganizationName = (orgId?: string) => {
    if (!orgId) return 'Individual';
    const org = organizations.find(o => o.id === orgId);
    return org?.name || 'Unknown';
  };

  // Filter records based on search and filters
  const filteredRecords = treeRecords.filter(record => {
    const matchesSearch = !searchTerm || 
      record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPlanterName(record.planter_id).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = locationFilter === 'all' || record.location === locationFilter;
    const matchesOrganization = organizationFilter === 'all' || record.organization_id === organizationFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const recordDate = new Date(record.planting_date);
      const now = new Date();
      switch (dateFilter) {
        case 'today':
          return recordDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return recordDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return recordDate >= monthAgo;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesLocation && matchesOrganization && matchesDate;
  });

  // Calculate statistics
  const stats = {
    totalTrees: treeRecords.reduce((sum, record) => sum + record.quantity, 0),
    totalRecords: treeRecords.length,
    activeOrganizations: organizations.filter(org => org.seeds_planted > 0).length,
    activePlanters: planters.filter(planter => planter.trees_planted > 0).length,
    thisMonth: treeRecords.filter(record => {
      const recordDate = new Date(record.planting_date);
      const now = new Date();
      return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
    }).reduce((sum, record) => sum + record.quantity, 0),
  };

  const uniqueLocations = [...new Set(treeRecords.map(record => record.location))];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tree Planting Tracker</h1>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tree Planting Tracker</h1>
          <p className="text-muted-foreground">
            Monitor and track tree planting activities across Kano State
          </p>
        </div>
        <Button onClick={exportToCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trees Planted</CardTitle>
            <TreePine className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalTrees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All-time total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.thisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Trees planted in {new Date().toLocaleString('default', { month: 'long' })}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.activeOrganizations}</div>
            <p className="text-xs text-muted-foreground">Contributing organizations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planting Records</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.totalRecords}</div>
            <p className="text-xs text-muted-foreground">Total planting sessions</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search location, species, or planter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={organizationFilter} onValueChange={setOrganizationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {organizations.map(org => (
                  <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tree Planting Records */}
      <Card>
        <CardHeader>
          <CardTitle>Planting Records ({filteredRecords.length})</CardTitle>
          <CardDescription>
            Detailed tree planting activity records
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Sprout className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No planting records found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <TreePine className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{record.quantity} trees</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {record.species}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{record.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{new Date(record.planting_date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">Planter:</span> {getPlanterName(record.planter_id)}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Organization:</span> {getOrganizationName(record.organization_id)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        {record.notes && (
                          <div className="text-sm text-muted-foreground">
                            {record.notes.length > 50 ? `${record.notes.substring(0, 50)}...` : record.notes}
                          </div>
                        )}
                        {record.photos && Array.isArray(record.photos) && record.photos.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {record.photos.length} photo(s)
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
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
  );
};

const TreePlantingTracker = () => {
  return (
    <AdminLayout>
      <TreePlantingTrackerContent />
    </AdminLayout>
  );
};

export default TreePlantingTracker;
