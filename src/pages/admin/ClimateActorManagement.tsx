import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye,
  MessageSquare,
  Mail,
  Phone,
  Building2,
  Calendar,
  MapPin,
  Target,
  Trash2,
  Download
} from "lucide-react";

interface ClimateActor {
  id: string;
  organization_name: string;
  actor_type: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: string;
  created_at: string;
  approved_at: string | null;
  focus_areas: string[];
  lga_operations: string[];
  description: string;
  website_url: string | null;
  year_established: number | null;
  rejection_reason: string | null;
}

const ClimateActorManagementContent = () => {
  const { toast } = useToast();
  const [actors, setActors] = useState<ClimateActor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActor, setSelectedActor] = useState<ClimateActor | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadActors();
  }, []);

  const loadActors = async () => {
    try {
      const { data, error } = await supabase
        .from('climate_actors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading actors:', error);
        throw error;
      }
      
      console.log('Loaded actors:', data);
      setActors(data || []);
    } catch (error: any) {
      console.error('Error in loadActors:', error);
      toast({
        title: "Error",
        description: "Failed to load climate actors",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (actorId: string) => {
    setActionLoading(true);
    try {
      console.log('Approving actor:', actorId);
      
      const { error } = await supabase
        .from('climate_actors')
        .update({ 
          status: 'approved',
          approved_at: new Date().toISOString(),
          rejection_reason: null
        })
        .eq('id', actorId);

      if (error) {
        console.error('Error approving actor:', error);
        throw error;
      }

      toast({
        title: "Actor Approved",
        description: "Organization has been approved and added to the registry",
      });

      await loadActors();
    } catch (error: any) {
      console.error('Error in handleApprove:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve actor",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (actorId: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }

    setActionLoading(true);
    try {
      console.log('Rejecting actor:', actorId, 'with reason:', rejectionReason);
      
      const { error } = await supabase
        .from('climate_actors')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectionReason,
          approved_at: null
        })
        .eq('id', actorId);

      if (error) {
        console.error('Error rejecting actor:', error);
        throw error;
      }

      toast({
        title: "Actor Rejected",
        description: "Organization application has been rejected",
      });

      setRejectionReason('');
      await loadActors();
    } catch (error: any) {
      console.error('Error in handleReject:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reject actor",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (actorId: string) => {
    setActionLoading(true);
    try {
      console.log('Deleting actor:', actorId);
      
      const { error } = await supabase
        .from('climate_actors')
        .delete()
        .eq('id', actorId);

      if (error) {
        console.error('Error deleting actor:', error);
        throw error;
      }

      toast({
        title: "Organization Deleted",
        description: "Organization has been permanently removed",
      });

      await loadActors();
    } catch (error: any) {
      console.error('Error in handleDelete:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete organization",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Organization Name',
      'Actor Type',
      'Contact Name',
      'Contact Email',
      'Contact Phone',
      'Status',
      'Focus Areas',
      'LGA Operations',
      'Year Established',
      'Created At',
      'Approved At'
    ];

    const csvData = actors.map(actor => [
      actor.organization_name,
      actor.actor_type,
      actor.contact_name,
      actor.contact_email,
      actor.contact_phone,
      actor.status,
      actor.focus_areas.join('; '),
      actor.lga_operations.join('; '),
      actor.year_established || '',
      new Date(actor.created_at).toLocaleDateString(),
      actor.approved_at ? new Date(actor.approved_at).toLocaleDateString() : ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `climate-actors-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "Climate actors data has been exported to CSV",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredActors = actors.filter(actor => {
    if (filter === 'all') return true;
    return actor.status === filter;
  });

  const stats = {
    total: actors.length,
    pending: actors.filter(a => a.status === 'pending').length,
    approved: actors.filter(a => a.status === 'approved').length,
    rejected: actors.filter(a => a.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Climate-Actor Management</h1>
          <p className="text-muted-foreground">
            Review and manage climate-actor registry applications
          </p>
        </div>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          {filteredActors.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">No applications found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredActors.map((actor) => (
                <Card key={actor.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          {actor.organization_name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {actor.actor_type === 'state_actor' ? 'State Actor' : 'Non-State Actor'} • 
                          Applied on {new Date(actor.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(actor.status)}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedActor(actor)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{actor.organization_name}</DialogTitle>
                              <DialogDescription>
                                Application Details
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedActor && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="font-medium">Contact Person</Label>
                                    <div className="flex items-center gap-2">
                                      <Users className="h-4 w-4 text-muted-foreground" />
                                      <span>{selectedActor.contact_name}</span>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="font-medium">Email</Label>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <span>{selectedActor.contact_email}</span>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="font-medium">Phone</Label>
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <span>{selectedActor.contact_phone}</span>
                                    </div>
                                  </div>

                                  {selectedActor.year_established && (
                                    <div className="space-y-2">
                                      <Label className="font-medium">Year Established</Label>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{selectedActor.year_established}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <Label className="font-medium">Description</Label>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedActor.description}
                                  </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="font-medium">Focus Areas</Label>
                                    <div className="flex flex-wrap gap-1">
                                      {selectedActor.focus_areas.map((area) => (
                                        <Badge key={area} variant="secondary" className="text-xs">
                                          {area}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="font-medium">Operating LGAs</Label>
                                    <div className="flex flex-wrap gap-1">
                                      {selectedActor.lga_operations.map((lga) => (
                                        <Badge key={lga} variant="outline" className="text-xs">
                                          {lga}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {selectedActor.status === 'pending' && (
                                  <div className="flex gap-4 pt-4 border-t">
                                    <Button 
                                      onClick={() => handleApprove(selectedActor.id)}
                                      disabled={actionLoading}
                                      className="flex-1"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      {actionLoading ? 'Processing...' : 'Approve Application'}
                                    </Button>
                                    
                                    <div className="flex-1 space-y-2">
                                      <Textarea
                                        placeholder="Reason for rejection..."
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        className="resize-none"
                                      />
                                      <Button 
                                        variant="destructive"
                                        onClick={() => handleReject(selectedActor.id)}
                                        disabled={actionLoading || !rejectionReason.trim()}
                                        className="w-full"
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        {actionLoading ? 'Processing...' : 'Reject Application'}
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                <div className="flex justify-end pt-4 border-t">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Organization
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete the organization
                                          "{selectedActor.organization_name}" and all associated data.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDelete(selectedActor.id)}
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>

                                {selectedActor.rejection_reason && (
                                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <Label className="font-medium text-red-900">Rejection Reason:</Label>
                                    <p className="text-sm text-red-800 mt-1">{selectedActor.rejection_reason}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the organization
                                "{actor.organization_name}" and all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(actor.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{actor.contact_email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>{actor.focus_areas.length} focus areas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{actor.lga_operations.length} LGAs</span>
                      </div>
                    </div>

                    {actor.status === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm"
                          onClick={() => handleApprove(actor.id)}
                          disabled={actionLoading}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {actionLoading ? 'Processing...' : 'Approve'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ClimateActorManagement = () => {
  return (
    <AdminLayout>
      <ClimateActorManagementContent />
    </AdminLayout>
  );
};

export default ClimateActorManagement;
