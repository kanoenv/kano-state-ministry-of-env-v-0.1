
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TreePine, Users, MapPin, TrendingUp, Building2, Mail, ExternalLink, Target, Award, CheckCircle, Leaf, Sprout } from 'lucide-react';

const KNAP = () => {
  const coreFunctions = [
    {
      title: "Land Reclamation",
      description: "Identify and rehabilitate degraded sites for reforestation and sustainable land management.",
      icon: <MapPin className="h-8 w-8" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Nursery Operations",
      description: "Manage central and mobile nurseries to produce diverse indigenous species for widespread distribution.",
      icon: <TreePine className="h-8 w-8" />,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Capacity Building",
      description: "Train government staff, NGOs, and volunteers in agroforestry and modern nursery techniques.",
      icon: <Users className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Partnership & Funding",
      description: "Mobilize resources from development partners, donor agencies, and private sector stakeholders.",
      icon: <Building2 className="h-8 w-8" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Monitoring & Evaluation",
      description: "Utilize GIS mapping, drone surveys, and field assessments to track seedling survival and canopy cover expansion.",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const achievements = [
    {
      title: "Nursery Infrastructure Enhancement",
      description: "Successfully upgraded two main nurseries, increasing seedling production capacity by 50% and improving quality standards.",
      icon: <Sprout className="h-6 w-6" />
    },
    {
      title: "Three Million Trees Campaign (3MTP)",
      description: "Implemented large-scale tree planting initiative across urban and rural areas throughout Kano State in 2024.",
      icon: <TreePine className="h-6 w-6" />
    },
    {
      title: "Community Training Programs",
      description: "Trained over 650 volunteers and forest guards in advanced nursery management and sustainable planting techniques.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Digital Mapping Initiative",
      description: "Completed comprehensive baseline surveys of 200 hectares using cutting-edge drone and satellite imagery technology.",
      icon: <MapPin className="h-6 w-6" />
    }
  ];

  const partners = [
    {
      title: "ACReSAL Partnership",
      description: "Technical and financial collaboration on agro-climatic resilience and sustainable land management initiatives."
    },
    {
      title: "UNICEF Collaboration",
      description: "Joint implementation of school greening programs and hygiene-linked tree planting initiatives across educational institutions."
    },
    {
      title: "Academic & NGO Network",
      description: "Strategic partnerships with local NGOs and universities for conservation agriculture research and community outreach programs."
    },
    {
      title: "International Development Partners",
      description: "Co-financing and technical support through national forestry and climate adaptation programmes from donor agencies."
    }
  ];

  const objectives = [
    "Combat desertification and soil erosion through strategic reforestation and afforestation programs",
    "Enhance biodiversity conservation and ecosystem restoration across degraded landscapes",
    "Strengthen community resilience to climate change impacts through sustainable forestry practices",
    "Develop local capacity for long-term forest management and environmental stewardship",
    "Create economic opportunities through sustainable forest-based enterprises and green jobs"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px]"
          style={{
            backgroundImage: "url('/lovable-uploads/f7a8f34e-680d-47e5-a14e-fca7cebf4747.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/70"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <div className="max-w-4xl">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Kano State Afforestation Project
              </h1>
              <p className="text-white/95 text-xl md:text-2xl mb-8 leading-relaxed">
                Restoring green cover and building climate resilience across Kano State through innovative forestry solutions and community partnerships.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Environmental Restoration</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Climate Resilience</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Community Empowerment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="section-padding bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-kano-primary mb-6">Leadership Commitment</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Under the visionary leadership of His Excellency, Governor Abba Kabir Yusuf, KNAP represents our unwavering commitment to environmental sustainability and climate resilience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative">
                <img 
                  src="/lovable-uploads/8addbe91-f37c-4245-8bec-d02d21f33477.png" 
                  alt="Governor Abba Kabir Yusuf" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-xl shadow-xl">
                  <Leaf className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-kano-primary mb-6">Governor's Vision</h3>
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    His Excellency, Governor Abba Kabir Yusuf, has positioned environmental restoration as a cornerstone of sustainable development in Kano State.
                  </p>
                  <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <p className="text-gray-700 italic text-lg mb-4">
                      "Our commitment to reforestation is not just about planting trees; it's about securing our future, protecting our environment, and ensuring sustainable prosperity for generations to come."
                    </p>
                    <p className="text-green-700 font-semibold">- Governor Abba Kabir Yusuf</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-kano-primary mb-6">Executive Leadership</h3>
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The state's executive leadership demonstrates hands-on commitment to environmental initiatives, actively participating in tree planting ceremonies and policy implementation.
                  </p>
                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-emerald-800 mb-3">Leadership Principles</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span>Leading by example in environmental stewardship</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span>Ensuring transparent and accountable project management</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span>Fostering community participation and ownership</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <img 
                  src="/lovable-uploads/1780744c-c901-40c2-b8b7-fe3c3c1f5186.png" 
                  alt="Executive Leadership" 
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                  <Target className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-kano-primary mb-6">About KNAP</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                The Kano State Afforestation Project (KNAP) is a comprehensive government-led initiative under the Ministry of Environment, dedicated to restoring degraded landscapes and building climate resilience through innovative forestry solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-t-4 border-green-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    To restore degraded landscapes, enhance biodiversity, and build community resilience through sustainable forestry practices and innovative environmental solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-emerald-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    A green, climate-resilient Kano State where every community benefits from healthy forests, sustainable ecosystems, and enhanced environmental services.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Our Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Transforming landscapes, empowering communities, and creating sustainable solutions for environmental challenges across Kano State.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Strategic Objectives */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-kano-primary mb-4">Strategic Objectives</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach addresses environmental challenges through targeted interventions and sustainable solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {objectives.map((objective, index) => (
                <Card key={index} className="bg-white border-l-4 border-green-500 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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

        {/* Core Functions */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Core Functions & Mandate</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              KNAP is empowered by state legislation to implement comprehensive forestry solutions across multiple operational areas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFunctions.map((func, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${func.color} flex items-center justify-center mb-4`}>
                      {func.icon}
                    </div>
                    <CardTitle className="text-xl">{func.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{func.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Project Timeline */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Project Evolution</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      1988 - Establishment
                    </div>
                    <p className="text-gray-700">KNAP was established as a pioneering initiative to combat desertification and environmental degradation in northern Nigeria.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      1990s-2000s - Growth
                    </div>
                    <p className="text-gray-700">Achieved significant milestones with over five million trees planted and comprehensive training programs for forest guards and communities.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      2010s - Consolidation
                    </div>
                    <p className="text-gray-700">Period of strategic review and infrastructure development to enhance operational efficiency and project sustainability.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-emerald-500">
                  <CardContent className="p-6">
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      2023-Present - Revival
                    </div>
                    <p className="text-gray-700">Comprehensive revitalization under Governor Yusuf's administration with the ambitious Three Million Trees Campaign and modernized operations.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Major Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                        <p className="text-gray-700">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnerships */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Strategic Partnerships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partners.map((partner, index) => (
                <Card key={index} className="border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{partner.title}</h3>
                    <p className="text-gray-700">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Participation */}
        <section className="section-padding bg-green-600 text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact & Get Involved</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-6">Project Office</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Building2 className="h-5 w-5 mt-1" />
                          <div>
                            <p className="font-semibold">Address</p>
                            <p className="opacity-90">KNAP Office, Farm Center<br />Kano State, Nigeria</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5" />
                          <div>
                            <p className="font-semibold">Email</p>
                            <p className="opacity-90">knap@environment.kn.gov.ng</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-6">How to Participate</h3>
                      <div className="space-y-3">
                        <p className="opacity-90">• Report degraded sites requiring restoration</p>
                        <p className="opacity-90">• Request seedlings for community projects</p>
                        <p className="opacity-90">• Volunteer for tree planting campaigns</p>
                        <p className="opacity-90">• Partner with us for environmental initiatives</p>
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

export default KNAP;
