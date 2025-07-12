
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Users, FileText, BarChart, Globe, Shield, TreeDeciduous, Building, Wrench, Droplets, MapPin, AlertTriangle, Megaphone, Scale } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Departments = () => {
  const departments = [
    {
      id: "commissioner",
      name: "Office of the Honorable Commissioner",
      shortName: "Commissioner",
      description: "Provides strategic leadership, policy direction, and oversight across all environmental, climate resilience, and sustainability programs in Kano State.",
      mandate: "To provide strategic leadership, policy direction, and oversight across all environmental, climate resilience, and sustainability programs in Kano State.",
      functions: [
        "Policy formulation and inter-ministerial coordination",
        "Strategic partnerships and donor engagement",
        "Legislative oversight and reporting to the Executive Council"
      ],
      contact: {
        title: "Secretary to the Honorable Commissioner",
        location: "Block 5, Audu Bako Secretariat, Kano State",
        email: "commissioner@environment.kn.gov.ng"
      },
      icon: <Building className="h-6 w-6" />,
      color: "bg-blue-600"
    },
    {
      id: "admin",
      name: "Department of Admin & General Services",
      shortName: "Admin Services",
      description: "Manages the Ministry's internal administrative, human resource, and financial systems ensuring seamless support for environmental operations.",
      mandate: "To manage the Ministry's internal administrative, human resource, and financial systems ensuring seamless support for environmental operations.",
      functions: [
        "Personnel recruitment, postings, and capacity building",
        "Procurement, logistics, and inventory management",
        "Payroll administration and financial record keeping"
      ],
      contact: {
        title: "Director of Admin Services",
        email: "adminservices@moecc.kano.gov.ng"
      },
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-600"
    },
    {
      id: "engineering",
      name: "Department of Engineering",
      shortName: "Engineering",
      description: "Designs, implements, and maintains environmental infrastructure aimed at mitigating flood, erosion, and waste-related challenges.",
      mandate: "To design, implement, and maintain environmental infrastructure aimed at mitigating flood, erosion, and waste-related challenges.",
      programs: [
        "GIS-based Drainage Master Plan: Integrating satellite and drone data for city-wide mapping",
        "Erosion Control Projects: 20 active sites across metropolitan Kano",
        "Drainage Construction: Targets high-risk flood zones"
      ],
      contact: {
        title: "Chief Engineer",
        email: "engineering@environment.kn.gov.ng"
      },
      icon: <Wrench className="h-6 w-6" />,
      color: "bg-orange-600"
    },
    {
      id: "climate",
      name: "Department of Climate Change",
      shortName: "Climate Change",
      description: "Coordinates Kano State's climate change mitigation, adaptation, and low-carbon development strategies.",
      mandate: "To coordinate Kano State's climate change mitigation, adaptation, and low-carbon development strategies.",
      programs: [
        "Development of Kano State Climate Change Policy",
        "Promotion of solar and biogas installations in public institutions",
        "Development of climate-smart agriculture frameworks"
      ],
      partnerships: [
        "UN-Habitat", "REDD+", "ACReSAL", "NESP (Nigerian Energy Support Programme)"
      ],
      contact: {
        title: "Director, Climate Change",
        email: "climate@environment.kn.gov.ng"
      },
      icon: <Globe className="h-6 w-6" />,
      color: "bg-green-600"
    },
    {
      id: "forestry",
      name: "Department of Ecology and Forestry",
      shortName: "Forestry",
      description: "Promotes ecosystem conservation, afforestation, and biodiversity restoration in both urban and rural areas.",
      mandate: "To promote ecosystem conservation, afforestation, and biodiversity restoration in both urban and rural areas.",
      projects: [
        "5M+ Seedling Program for afforestation in desert-prone zones",
        "Shelterbelt Restoration across Kano"
      ],
      contact: {
        title: "Director of Forestry",
        email: "forestry@environment.kn.gov.ng"
      },
      icon: <TreeDeciduous className="h-6 w-6" />,
      color: "bg-emerald-600"
    },
    {
      id: "pollution",
      name: "Department of Environmental Pollution",
      shortName: "Pollution Control",
      description: "Monitors, controls, and regulates pollution from industrial, commercial, and domestic sources.",
      mandate: "To monitor, control, and regulate pollution from industrial, commercial, and domestic sources.",
      programs: [
        "Industrial Waste Audit Program: Environmental compliance assessment for 100+ factories",
        "Pilot bioremediation zones for soil recovery",
        "Support for Environmental Mobile Courts to penalize polluters"
      ],
      metrics: [
        "80% increase in industry compliance (2023–2024)",
        "Closure of 22 illegal waste discharge points"
      ],
      contact: {
        title: "Director of Pollution Control",
        email: "pollution@environment.kn.gov.ng"
      },
      icon: <Shield className="h-6 w-6" />,
      color: "bg-red-600"
    },
    {
      id: "planning",
      name: "Department of Physical Planning, Research and Statistics",
      shortName: "Planning & Research",
      description: "Provides data-driven planning and research for environmentally sustainable physical development.",
      mandate: "To provide data-driven planning and research for environmentally sustainable physical development.",
      responsibilities: [
        "Policy and regulatory framework development aligned with SDG 11 (Sustainable Cities)",
        "Conducting environmental impact assessments (EIAs)",
        "Urban green infrastructure mapping"
      ],
      contact: {
        title: "Head of Research and Planning",
        email: "planning@environment.kn.gov.ng"
      },
      icon: <BarChart className="h-6 w-6" />,
      color: "bg-indigo-600"
    },
    {
      id: "special",
      name: "Department of Special Duties",
      shortName: "Special Duties",
      description: "Executes interdepartmental, emergency, and politically sensitive environmental projects.",
      mandate: "To execute interdepartmental, emergency, and politically sensitive environmental projects.",
      functions: [
        "Lead on emergency sanitation drives",
        "Deployment of Community-Led Total Sanitation (CLTS)",
        "Digital Enforcement Tools for inspection and compliance tracking"
      ],
      projects: [
        "State-wide flooding response taskforce",
        "Liaison office for security-related environmental threats"
      ],
      contact: {
        title: "Director, Special Duties",
        email: "specialduties@moecc.kano.gov.ng"
      },
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "bg-amber-600"
    },
    {
      id: "sanitation",
      name: "Department of Environmental Sanitation",
      shortName: "Sanitation",
      description: "Enforces sanitation codes and supports municipal solid waste management infrastructure.",
      mandate: "To enforce sanitation codes and support municipal solid waste management infrastructure.",
      programs: [
        "Organize End-of-the Month Sanitation Exercise",
        "Operation Nazafa",
        "Installation of Modern Mobile Toilets in markets and motor parks",
        "Launch of fee-based waste evacuation system (PPP model)"
      ],
      contact: {
        title: "Sanitation Operations Coordinator",
        email: "sanitation@moecc.kano.gov.ng"
      },
      icon: <Droplets className="h-6 w-6" />,
      color: "bg-cyan-600"
    },
    {
      id: "enlightenment",
      name: "Department of Public Enlightenment",
      shortName: "Public Engagement",
      description: "Leads environmental education, advocacy, and community mobilization campaigns.",
      mandate: "To lead environmental education, advocacy, and community mobilization campaigns.",
      activities: [
        "Hausa-language radio & TV campaigns",
        "Environmental clubs in 300+ secondary schools",
        "Youth environmental volunteer program (e.g., Tsintar Leda)"
      ],
      tools: [
        "Social media engagement via verified handles",
        "Green Champions Initiative (peer educators)"
      ],
      contact: {
        title: "Director, Public Engagement",
        email: "awareness@moecc.kano.gov.ng"
      },
      icon: <Megaphone className="h-6 w-6" />,
      color: "bg-pink-600"
    },
    {
      id: "legal",
      name: "Legal Department",
      shortName: "Legal",
      description: "Provides legal support, policy drafting, and enforcement mechanisms for environmental laws.",
      mandate: "To provide legal support, policy drafting, and enforcement mechanisms for environmental laws.",
      functions: [
        "Drafting of State Environmental Protection Laws",
        "Legal advisory for MOUs, contracts, and enforcement operations",
        "Coordination of Environmental Tribunals and Mobile Courts"
      ],
      contact: {
        title: "Legal Officer",
        email: "legal@environment.kn.gov.ng"
      },
      icon: <Scale className="h-6 w-6" />,
      color: "bg-slate-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]"
          style={{
            backgroundImage: "url('/lovable-uploads/0a733cce-62b5-4251-a9fb-4d7d1fb9845a.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-kano-primary/90 to-blue-900/70"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <div className="max-w-4xl">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Ministry Departments</h1>
              <p className="text-white/95 text-lg md:text-xl mb-8 max-w-3xl leading-relaxed">
                Discover the specialized departments that drive environmental excellence and sustainable development across Kano State through expert leadership and coordinated action.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">{departments.length} Departments</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Expert Leadership</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Coordinated Action</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Department Overview Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-4">Our Department Structure</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Each department brings specialized expertise and coordinated effort to address environmental challenges and advance sustainable development goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <Card key={dept.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-kano-primary cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${dept.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="text-white">
                        {dept.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-kano-primary transition-colors duration-300">
                      {dept.shortName}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {dept.description.slice(0, 100)}...
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Detailed Departments */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-4">Detailed Department Information</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore comprehensive details about each department's mandate, functions, and contact information.
              </p>
            </div>
            
            <Tabs defaultValue="commissioner" className="w-full">
              <div className="mb-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 h-auto bg-gray-100 p-2 rounded-lg">
                  {departments.map((dept) => (
                    <TabsTrigger 
                      key={dept.id} 
                      value={dept.id}
                      className="px-3 py-2 text-xs md:text-sm data-[state=active]:bg-kano-primary data-[state=active]:text-white rounded-md transition-all duration-200 hover:bg-white"
                    >
                      <span className="flex flex-col items-center gap-1">
                        {dept.icon}
                        <span className="hidden sm:inline">{dept.shortName}</span>
                        <span className="sm:hidden">{dept.shortName.split(' ')[0]}</span>
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {departments.map((dept) => (
                <TabsContent key={dept.id} value={dept.id} className="mt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                      <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center`}>
                            <div className="text-white">
                              {dept.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-kano-primary">{dept.name}</h3>
                            <p className="text-gray-600 mt-2">{dept.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      {dept.mandate && (
                        <Card className="border-l-4 border-kano-primary">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-kano-primary flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Department Mandate
                            </h4>
                            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg italic">
                              "{dept.mandate}"
                            </p>
                          </CardContent>
                        </Card>
                      )}
                      
                      {dept.functions && (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-gray-900">Core Functions</h4>
                            <div className="grid gap-3">
                              {dept.functions.map((func, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="w-6 h-6 bg-kano-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">{index + 1}</span>
                                  </div>
                                  <span className="text-gray-700">{func}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {dept.programs && (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-gray-900">Key Programs</h4>
                            <div className="space-y-3">
                              {dept.programs.map((program, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-kano-primary transition-colors">
                                  <div className="w-2 h-2 bg-kano-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{program}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {dept.responsibilities && (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-gray-900">Key Responsibilities</h4>
                            <div className="space-y-3">
                              {dept.responsibilities.map((resp, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{resp}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {dept.activities && (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-gray-900">Activities & Initiatives</h4>
                            <div className="space-y-3">
                              {dept.activities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{activity}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {dept.projects && (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-gray-900">Special Projects</h4>
                            <div className="space-y-3">
                              {dept.projects.map((project, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{project}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {dept.partnerships && (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-gray-900">Strategic Partnerships</h4>
                            <div className="flex flex-wrap gap-2">
                              {dept.partnerships.map((partner, index) => (
                                <span key={index} className="bg-gradient-to-r from-kano-primary to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                                  {partner}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {dept.metrics && (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-gray-900">Impact Metrics</h4>
                            <div className="space-y-3">
                              {dept.metrics.map((metric, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                  <span className="font-medium text-gray-900">{metric}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {dept.tools && (
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-xl mb-4 text-gray-900">Tools & Resources</h4>
                            <div className="space-y-3">
                              {dept.tools.map((tool, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{tool}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                    
                    <div className="lg:col-span-1">
                      <Card className="sticky top-8 border-2 border-gray-100 hover:border-kano-primary transition-colors duration-300">
                        <CardContent className="p-6">
                          <div className="text-center mb-6">
                            <div className={`w-20 h-20 ${dept.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                              <div className="text-white text-2xl">
                                {dept.icon}
                              </div>
                            </div>
                            <h4 className="font-bold text-xl text-gray-900 mb-2">{dept.contact.title}</h4>
                            {dept.contact.location && (
                              <div className="flex items-start gap-2 justify-center mb-4">
                                <MapPin size={16} className="text-kano-primary mt-1 flex-shrink-0" />
                                <span className="text-gray-600 text-sm leading-tight">{dept.contact.location}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center gap-3 mb-2">
                                <Mail size={18} className="text-kano-primary" />
                                <span className="font-medium text-gray-900">Email</span>
                              </div>
                              <a href={`mailto:${dept.contact.email}`} className="text-kano-primary hover:underline text-sm break-all">
                                {dept.contact.email}
                              </a>
                            </div>
                            
                            <div className="bg-gradient-to-r from-kano-primary to-blue-600 text-white p-4 rounded-lg text-center">
                              <p className="text-sm mb-2">Office Hours</p>
                              <p className="font-semibold">Mon - Fri: 8:00 AM - 5:00 PM</p>
                              <p className="text-xs mt-1 opacity-90">Saturday: 9:00 AM - 2:00 PM</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Departments;
