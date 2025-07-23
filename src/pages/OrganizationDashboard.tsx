import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  LogOut, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar,
  Users,
  Target,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

interface Organization {
  id: string;
  organization_name: string;
  contact_email: string;
  status: string;
  approved_at: string | null;
  actor_type: string;
  focus_areas: string[];
  year_established: number | null;
  lga_operations: string[];
  description: string;
  contact_name: string;
  contact_phone: string;
  website_url: string | null;
  logo_url: string | null;
  created_at: string;
}

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        const authData = localStorage.getItem('organizationAuth');
        if (!authData) {
          navigate('/organization-login');
          return;
        }

        const orgAuth = JSON.parse(authData);
        
        // Fetch full organization details
        const { data, error } = await supabase
          .from('climate_actors')
          .select('*')
          .eq('id', orgAuth.id)
          .single();

        if (error) throw error;
        
        setOrganization(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load organization data",
          variant: "destructive"
        });
        navigate('/organization-login');
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('organizationAuth');
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={organization.logo_url || undefined} />
                <AvatarFallback>
                  <Building2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{organization.organization_name}</h1>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(organization.status)}
                  <Badge variant="outline">
                    {organization.actor_type === 'state_actor' ? 'State Actor' : 'Non-State Actor'}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="status">Application Status</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{organization.status}</div>
                  <p className="text-xs text-muted-foreground">
                    {organization.approved_at 
                      ? `Approved on ${new Date(organization.approved_at).toLocaleDateString()}`
                      : 'Application under review'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Focus Areas</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{organization.focus_areas.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active focus areas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Operating LGAs</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{organization.lga_operations.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Local Government Areas
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Organization Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {organization.description}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Focus Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {organization.focus_areas.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Operating Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {organization.lga_operations.map((lga) => (
                      <Badge key={lga} variant="outline">
                        {lga}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Name:</span>
                    <span>{organization.organization_name}</span>
                  </div>
                  
                  {organization.year_established && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Established:</span>
                      <span>{organization.year_established}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Type:</span>
                    <span>{organization.actor_type === 'state_actor' ? 'State Actor' : 'Non-State Actor'}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Contact Person:</span>
                    <span>{organization.contact_name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span>{organization.contact_email}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <span>{organization.contact_phone}</span>
                  </div>

                  {organization.website_url && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Website:</span>
                      <a 
                        href={organization.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {organization.website_url}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>
                  Track the progress of your Climate-Actor Registry application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusBadge(organization.status)}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {organization.status === 'approved' && 'Application Approved'}
                      {organization.status === 'pending' && 'Application Under Review'}
                      {organization.status === 'rejected' && 'Application Rejected'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {organization.status === 'approved' && `Your organization was approved on ${new Date(organization.approved_at!).toLocaleDateString()}.`}
                      {organization.status === 'pending' && 'Our team is reviewing your application. You will be contacted within 5 working days.'}
                      {organization.status === 'rejected' && 'Unfortunately, your application was not approved. Please contact us for more information.'}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Application Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Application Submitted</span>
                      <span className="text-muted-foreground">
                        {new Date(organization.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {organization.approved_at && (
                      <div className="flex justify-between">
                        <span>Application Approved</span>
                        <span className="text-muted-foreground">
                          {new Date(organization.approved_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {organization.status === 'pending' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Our verification team is reviewing your submission</li>
                      <li>• You will receive an email notification once the review is complete</li>
                      <li>• Review typically takes 3-5 working days</li>
                    </ul>
                  </div>
                )}

                {organization.status === 'approved' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Congratulations!</h4>
                    <p className="text-sm text-green-800">
                      Your organization is now listed in the public Kano State Climate-Actor Registry. 
                      You can view your public profile by visiting the registry page.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-3"
                      onClick={() => navigate('/climate-actor-registry')}
                    >
                      View Registry
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
