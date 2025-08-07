
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Search, 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle,
  LogIn,
  Plus,
  Eye,
  UserPlus,
  Shield,
  BarChart3,
  Handshake,
  Zap,
  Leaf,
  Recycle,
  Droplets,
  Wind,
  Trees,
  DollarSign,
  GraduationCap,
  AlertTriangle,
  Flame,
  Mail,
  Phone
} from "lucide-react";

interface ClimateActor {
  id: string;
  actor_type: string;
  organization_name: string;
  focus_areas: string[];
  year_established: number | null;
  lga_operations: string[];
  description: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  website_url: string | null;
  logo_url: string | null;
  status: string;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  approved_by: string | null;
}

const ClimateActorRegistry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [climateActors, setClimateActors] = useState<ClimateActor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClimateActors();
  }, []);

  const fetchClimateActors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('climate_actors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setClimateActors(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load climate actors",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchClimateActors();
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('climate_actors')
        .select('*')
        .or(`organization_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,contact_email.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setClimateActors(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to search climate actors",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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

  const focusAreaIcons = {
    'Renewable Energy': Zap,
    'Climate-Smart Agriculture': Leaf,
    'Waste Management': Recycle,
    'Water & Sanitation': Droplets,
    'Air-Quality Monitoring': Wind,
    'Biodiversity Conservation': Trees,
    'Green Finance': DollarSign,
    'Climate Education & Advocacy': GraduationCap,
    'Disaster Risk Reduction': AlertTriangle,
    'Clean Cooking Solutions': Flame
  };

  const approvedActors = climateActors.filter(actor => actor.status === 'approved');

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading registry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left gap-6 lg:gap-8">
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/6cf21747-c1c5-4ca9-b762-cc61e2cd3877.png" 
                alt="Kano State Ministry of Environment and Climate Change" 
                className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mx-auto lg:mx-0 rounded-full shadow-xl border-4 border-background/20"
              />
            </div>
            <div className="flex-1 max-w-4xl">
              <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 leading-tight">
                Kano State Climate-Actor Registry
              </h1>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-medium">
                One directory, endless collaboration
              </p>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto text-center space-y-6 md:space-y-8">
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto px-4">
              Welcome to the official online registry of climate-change stakeholders in Kano State. Here you can discover, connect with, and join the diverse network of government agencies, civil-society organisations, research groups, and private-sector innovators working toward a just, resilient, and low-carbon future for our state.
            </p>
            
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4 md:p-6 lg:p-8 shadow-lg mx-4 md:mx-8">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">
                Currently listed: {approvedActors.length} approved actors & counting
              </p>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                (updated weekly by the Ministry of Environment & Climate Change)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 px-4">
              <Button 
                size="lg" 
                className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium rounded-xl hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => {
                  const registrySection = document.getElementById('registry-section');
                  registrySection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Eye className="h-4 w-4 md:h-5 md:w-5" />
                Browse Registry
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium rounded-xl hover:scale-105 transition-all duration-200 border-2 hover:bg-primary/5"
                onClick={() => navigate('/climate-actor-register')}
              >
                <UserPlus className="h-4 w-4 md:h-5 md:w-5" />
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Actions Section */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Actions you can take</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Get started with our climate registry platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">Browse Registered Actors</CardTitle>
                    <CardDescription className="text-base">
                      Search by actor type, focus area, or LGA.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full py-3 text-base font-medium rounded-lg"
                  onClick={() => {
                    const registrySection = document.getElementById('registry-section');
                    registrySection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Browse Registry
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Plus className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">Register Your Organisation</CardTitle>
                    <CardDescription className="text-base">
                      Add your details in minutes and await approval.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full py-3 text-base font-medium rounded-lg" 
                  onClick={() => navigate('/climate-actor-register')}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Register Section */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Why register?</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Unlock the benefits of being part of our climate action network
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="pb-6">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg lg:text-xl">Visibility & Credibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  Appear in an official, publicly accessible directory.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="pb-6">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                  <Handshake className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg lg:text-xl">Collaboration Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  Find partners for projects, grants, and research.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="pb-6">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg lg:text-xl">Policy Influence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  Receive invitations to stakeholder consultations and working groups.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="pb-6">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg lg:text-xl">Data-driven Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  Access aggregated climate-action metrics for Kano State.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Who Can Register Section */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Who can register?</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We welcome diverse climate stakeholders across sectors
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl lg:text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  State Actors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Ministries, Departments & Agencies (MDAs), Local Government Councils, public research institutes
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-xl lg:text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  Non-State Actors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground leading-relaxed">
                  NGOs/CSOs, youth and women's groups, private companies, academic labs, professional associations
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-6 md:mt-8">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6 max-w-4xl mx-auto">
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Minimum criteria:</strong> operate (or plan to operate) within Kano State, have a verifiable contact, and focus on at least one climate- or environment-related area.
              </p>
            </div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-8">Focus areas you can tag</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
            {Object.entries(focusAreaIcons).map(([area, Icon]) => (
              <Card key={area} className="text-center p-3 md:p-4 hover:shadow-md transition-shadow group hover:scale-105 duration-200">
                <Icon className="h-6 w-6 md:h-8 md:w-8 mx-auto text-primary mb-2 group-hover:text-primary/80 transition-colors" />
                <p className="text-xs md:text-sm font-medium leading-tight">{area}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            (select all that apply when registering)
          </p>
        </section>

        {/* How Process Works Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How the process works</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <CardTitle>Submit the form</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Provide basic organisation details, contacts, and focus areas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <CardTitle>Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our team reviews submissions within 5 working days.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <CardTitle>Approval & listing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Approved actors appear publicly; rejected actors receive feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Registry Section */}
        <section id="registry-section" className="mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Registered Organizations
              </h2>
              <p className="text-muted-foreground">
                Browse our directory of climate actors in Kano State
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button 
                onClick={() => navigate('/organization-login')}
                variant="outline"
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <LogIn className="h-4 w-4" />
                Organization Login
              </Button>
              <Button 
                onClick={() => navigate('/climate-actor-register')}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                Register Organization
              </Button>
            </div>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">Search organizations</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by organization name, description, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>
                <Button onClick={handleSearch} className="sm:w-auto w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {approvedActors.length} approved organization{approvedActors.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Organizations Grid */}
          {approvedActors.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No approved organizations found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? "Try adjusting your search terms or browse all organizations."
                    : "Be the first to register your organization!"
                  }
                </p>
                <Button onClick={() => navigate('/climate-actor-register')}>
                  Register Your Organization
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedActors.map((actor) => (
                <Card key={actor.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={actor.logo_url || undefined} />
                        <AvatarFallback>
                          <Building2 className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-6 truncate" title={actor.organization_name}>
                          {actor.organization_name}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />Approved
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {actor.actor_type === 'state_actor' ? 'State Actor' : 'Non-State Actor'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm mb-4 line-clamp-3">
                      {actor.description}
                    </CardDescription>
                    
                    <div className="space-y-2">
                      {actor.lga_operations.length > 0 && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {actor.lga_operations.slice(0, 2).join(', ')}
                            {actor.lga_operations.length > 2 && ` +${actor.lga_operations.length - 2} more`}
                          </span>
                        </div>
                      )}
                      
                      {actor.website_url && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={actor.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline truncate"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}

                      {actor.focus_areas.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {actor.focus_areas.slice(0, 3).map((area, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                          {actor.focus_areas.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{actor.focus_areas.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <span className="text-xs text-muted-foreground">
                        {actor.year_established && `Est. ${actor.year_established}`}
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Users className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Need assistance?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Mail className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary">admin@environment.kn.gov.ng</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Policy Enquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary">climatechange@environment.kn.gov.ng</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Phone className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Phone Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary">+234 803 071 9901</p>
                <p className="text-xs text-muted-foreground">(Mon–Fri, 9 am–4 pm)</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClimateActorRegistry;
