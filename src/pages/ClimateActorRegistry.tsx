import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Users, Building, TreePine, Droplets, Wind, 
  Recycle, GraduationCap, Shield, Phone, Mail, User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ClimateActorRegistry = () => {
  const focusAreas = [
    { name: 'Renewable Energy', icon: Wind },
    { name: 'Climate-Smart Agriculture', icon: TreePine },
    { name: 'Waste Management', icon: Recycle },
    { name: 'Water & Sanitation', icon: Droplets },
    { name: 'Air-Quality Monitoring', icon: Wind },
    { name: 'Biodiversity Conservation', icon: TreePine },
    { name: 'Green Finance', icon: Building },
    { name: 'Climate Education & Advocacy', icon: GraduationCap },
    { name: 'Disaster Risk Reduction', icon: Shield },
    { name: 'Clean Cooking Solutions', icon: Wind },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Kano State Climate-Actor Registry
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                One directory, endless collaboration
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Welcome to the official online registry of climate-change stakeholders in Kano State. 
                Here you can discover, connect with, and join the diverse network of government agencies, 
                civil-society organisations, research groups, and private-sector innovators working toward 
                a just, resilient, and low-carbon future for our state.
              </p>
              <div className="bg-card rounded-lg p-6 shadow-lg border">
                <p className="text-2xl font-bold text-primary mb-2">
                  Currently listed: 24 approved actors & counting
                </p>
                <p className="text-sm text-muted-foreground">
                  (updated weekly by the Ministry of Environment & Climate Change)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Actions you can take</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="mr-3 h-6 w-6 text-primary" />
                    Browse Registered Actors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Search by actor type, focus area, or LGA.
                  </p>
                  <Button variant="outline" className="w-full">
                    Browse Registry
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-3 h-6 w-6 text-primary" />
                    Register Your Organisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Add your details in minutes and await approval.
                  </p>
                  <Link to="/climate-actor-register">
                    <Button className="w-full">
                      Register Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Register Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Why register?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Visibility & Credibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Appear in an official, publicly accessible directory.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Collaboration Opportunities</h3>
                  <p className="text-sm text-muted-foreground">
                    Find partners for projects, grants, and research.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Policy Influence</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive invitations to stakeholder consultations and working groups.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Data-driven Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Access aggregated climate-action metrics for Kano State.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Who Can Register Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Who can register?</h2>
            <div className="max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-card rounded-lg shadow-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 font-semibold">Actor Type</th>
                      <th className="text-left p-4 font-semibold">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-primary">State Actors</td>
                      <td className="p-4 text-muted-foreground">
                        Ministries, Departments & Agencies (MDAs), Local Government Councils, public research institutes
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-primary">Non-State Actors</td>
                      <td className="p-4 text-muted-foreground">
                        NGOs/CSOs, youth and women's groups, private companies, academic labs, professional associations
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Minimum criteria:</strong> operate (or plan to operate) within Kano State, 
                  have a verifiable contact, and focus on at least one climate- or environment-related area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Focus areas you can tag</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {focusAreas.map((area, index) => (
                <Badge key={index} variant="secondary" className="p-3 flex items-center space-x-2 text-sm">
                  <area.icon className="h-4 w-4" />
                  <span>{area.name}</span>
                </Badge>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6">
              (select all that apply when registering)
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">How the process works</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Submit the form</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide basic organisation details, contacts, and focus areas.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team reviews submissions within 5 working days.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Approval & listing</h3>
                  <p className="text-sm text-muted-foreground">
                    Approved actors appear publicly; rejected actors receive feedback.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sample Actor Spotlight */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Sample actor spotlight</h2>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl">GreenGrowth Initiative (NGO)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Climate-Smart Agriculture</Badge>
                    <Badge variant="outline">Women's Climate Leadership</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Operating since 2018, GreenGrowth trains smallholder farmers in regenerative practices 
                    across four LGAs and runs an annual girls-in-climate fellowship.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 text-sm">
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      greengrowth.ngo@example.com
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      +234 801 234 5678
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Need Assistance Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Need assistance?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Technical Support</h3>
                  <a href="mailto:admin@environment.kn.gov.ng" className="text-primary hover:underline">
                    admin@environment.kn.gov.ng
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <GraduationCap className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Policy Enquiries</h3>
                  <a href="mailto:climatechange@environment.kn.gov.ng" className="text-primary hover:underline">
                    climatechange@environment.kn.gov.ng
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <a href="tel:+2348030719901" className="text-primary hover:underline">
                    +234 803 071 9901
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    (Mon–Fri, 9 am–4 pm)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ClimateActorRegistry;
