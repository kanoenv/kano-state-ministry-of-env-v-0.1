
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Zap, Car, Recycle, TreePine, Wrench, Users, Building2, Mail, Phone, Target, Award, CheckCircle } from 'lucide-react';

const SKP = () => {
  const keyComponents = [
    {
      title: "Water & Sanitation",
      description: "Upgrading boreholes, rainwater harvesting structures, and hygiene education campaigns.",
      icon: <Droplets className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Renewable Energy",
      description: "Solar streetlights, photovoltaic mini-grids for schools and clinics.",
      icon: <Zap className="h-8 w-8" />,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Sustainable Mobility",
      description: "Bicycle lanes, pedestrian-friendly streets, and electric bus pilot.",
      icon: <Car className="h-8 w-8" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Waste Management",
      description: "Source-segregation pilots, composting facilities, and public–private collection schemes.",
      icon: <Recycle className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Urban Greening",
      description: "Tree planting drives, pocket parks, and riverbank restoration.",
      icon: <TreePine className="h-8 w-8" />,
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  const projectHighlights = [
    {
      title: "Leadership Tree Planting Ceremony",
      description: "High-level officials participating in environmental restoration initiatives across Kano State.",
      image: "/lovable-uploads/cee4a717-6385-4f65-90ff-da330b7b74c4.png",
      category: "Environmental Leadership"
    },
    {
      title: "Community Reforestation Programs",
      description: "Local volunteers and community members actively participating in tree planting initiatives.",
      image: "/lovable-uploads/3f859462-3dae-4131-a893-43cf86244324.png",
      category: "Community Engagement"
    },
    {
      title: "Solar Street Lighting Project",
      description: "Implementation of energy-efficient solar street lighting systems across major roads in Kano.",
      image: "/lovable-uploads/c3464663-d555-4682-8f93-fa2041b570cd.png",
      category: "Renewable Energy"
    },
    {
      title: "Urban Beautification Initiative",
      description: "Comprehensive street beautification with tree planting and landscaping projects.",
      image: "/lovable-uploads/c6bef3f1-b6d1-42f8-b7a1-8b716e5dbfb9.png",
      category: "Urban Development"
    }
  ];

  const objectives = [
    "Increase access to clean water and sanitation facilities across urban and rural communities",
    "Deploy renewable energy systems in public facilities and residential areas",
    "Promote non-motorized and low-carbon transport networks throughout the state",
    "Implement solid waste minimization and circular economy models",
    "Develop urban green corridors and community gardens for environmental sustainability"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px]"
          style={{
            backgroundImage: "url('/lovable-uploads/efbb6ce5-77c7-4987-ae44-af08c1dd3425.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-green-900/70"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <div className="max-w-4xl">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Sustainable Kano Project
              </h1>
              <p className="text-white/95 text-xl md:text-2xl mb-8 leading-relaxed">
                Fostering inclusive, green, and resilient development across Kano State through innovative environmental solutions and community partnerships.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Multi-Sectoral Initiative</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Climate Resilience</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Community Focused</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Message */}
        <section className="section-padding bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/45f4c9f1-6e5d-4450-abd3-73771d8466d4.png" 
                  alt="Governor of Kano State" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                  <Target className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-kano-primary mb-6">Leadership Commitment</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Under the visionary leadership of His Excellency, the Governor of Kano State, the Sustainable Kano Project represents our unwavering commitment to environmental sustainability and climate resilience.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-emerald-500">
                  <p className="text-gray-700 italic text-lg">
                    "Our vision is to transform Kano State into a model of sustainable development, where environmental protection and economic growth go hand in hand for the benefit of all our citizens."
                  </p>
                  <p className="text-emerald-700 font-semibold mt-4">- Governor of Kano State</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-kano-primary mb-6">About SKP</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                A comprehensive multi-sectoral initiative designed to promote sustainable urban growth, environmental conservation, and socio-economic resilience across Kano State.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-t-4 border-emerald-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    To implement sustainable infrastructure, resource-efficient practices, and climate-adaptive solutions across Kano State.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Our Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Bringing together government agencies, development partners, private sector, and local communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-purple-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Our Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Reducing emissions, improving urban livability, enhancing livelihoods, and strengthening institutional capacity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vision & Objectives */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-kano-primary mb-4">Vision & Strategic Objectives</h2>
              <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-8 rounded-2xl mb-12 shadow-lg">
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">Our Vision</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  A thriving Kano State where sustainable development and inclusive growth transform lives and landscapes, creating a resilient and prosperous future for all citizens.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {objectives.map((objective, index) => (
                <Card key={index} className="bg-white border-l-4 border-emerald-500 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{objective}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Components */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Key Project Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyComponents.map((component, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${component.color} flex items-center justify-center mb-4`}>
                      {component.icon}
                    </div>
                    <CardTitle className="text-xl">{component.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{component.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Project Highlights */}
        <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Project Highlights & Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectHighlights.map((highlight, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={highlight.image} 
                      alt={highlight.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      {highlight.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.title}</h3>
                    <p className="text-gray-600">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Involved */}
        <section className="section-padding bg-emerald-600 text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">Get Involved in SKP</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group hover:bg-white/10 p-6 rounded-lg transition-colors">
                <Wrench className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Join Workshops</h3>
                <p className="opacity-90">Monthly capacity building sessions for residents on sustainable practices and environmental conservation.</p>
              </div>
              <div className="text-center group hover:bg-white/10 p-6 rounded-lg transition-colors">
                <Users className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Volunteer</h3>
                <p className="opacity-90">Participate in tree planting, cleanup drives, and community awareness campaigns.</p>
              </div>
              <div className="text-center group hover:bg-white/10 p-6 rounded-lg transition-colors">
                <Building2 className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Partner</h3>
                <p className="opacity-90">Private sector opportunities for infrastructure contracts and corporate social responsibility engagements.</p>
              </div>
              <div className="text-center group hover:bg-white/10 p-6 rounded-lg transition-colors">
                <Mail className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Feedback</h3>
                <p className="opacity-90">Submit suggestions, report issues, or share success stories from your community.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Contact SKP Secretariat</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl border-t-4 border-emerald-500">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Project Secretariat</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Building2 className="h-5 w-5 text-emerald-600 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900">Address</p>
                            <p className="text-gray-600">Sustainable Kano Project Secretariat<br />Kofar Kansakali, Kano 700282<br />Kano State, Nigeria</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-semibold text-gray-900">Phone</p>
                            <p className="text-gray-600">+234 70394647</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-semibold text-gray-900">Email</p>
                            <p className="text-gray-600">skp@environment.gov.ng</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-emerald-800 mb-4">Office Hours</h3>
                      <div className="space-y-2 text-gray-700">
                        <p><span className="font-semibold">Monday - Friday:</span> 8:00 AM - 5:00 PM</p>
                        <p><span className="font-semibold">Saturday:</span> 9:00 AM - 2:00 PM</p>
                        <p><span className="font-semibold">Sunday:</span> Closed</p>
                      </div>
                      <div className="mt-6 p-4 bg-white rounded border-l-4 border-emerald-500">
                        <p className="text-sm text-gray-600">
                          <strong>Note:</strong> Emergency environmental issues can be reported 24/7 through our hotline and online reporting system.
                        </p>
                      </div>
                    </div>
                  </div>
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

export default SKP;
