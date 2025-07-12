
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Users, Target, Calendar, MapPin, Award, Trees, Waves, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const WECCMA = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]"
          style={{
            backgroundImage: "url('/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 w-fit mb-4"
              asChild
            >
              <Link to="/agencies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Programs
              </Link>
            </Button>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Kano State Watershed, Erosion and Climate Change Management Agency (WECCMA)
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Focusing on managing erosion risks, watershed protection, and implementing climate change adaptation strategies in Kano State.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">About WECCMA</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Kano State Watershed, Erosion and Climate Change Management Agency (WECCMA) is dedicated to protecting Kano State from the adverse effects of erosion, promoting sustainable watershed management, and building resilience against climate change.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Objectives</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Waves className="mr-2" size={20} />
                        Erosion Risk Management
                      </h4>
                      <p className="text-blue-700">
                        Implementing measures to prevent and control soil erosion, gully formation, and land degradation across Kano State.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <Trees className="mr-2" size={20} />
                        Watershed Protection
                      </h4>
                      <p className="text-green-700">
                        Promoting sustainable management of watersheds to ensure water security, biodiversity conservation, and ecosystem health.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                        <ShieldCheck className="mr-2" size={20} />
                        Climate Change Adaptation
                      </h4>
                      <p className="text-purple-700">
                        Developing and implementing strategies to adapt to the impacts of climate change, including drought, flooding, and extreme weather events.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Strategic Initiatives</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li><strong>Erosion Control Projects:</strong> Construction of check dams, retaining walls, and drainage systems to stabilize slopes and prevent gully erosion.</li>
                    <li><strong>Afforestation Programs:</strong> Planting trees and vegetation to restore degraded lands, enhance soil stability, and sequester carbon.</li>
                    <li><strong>Community Sensitization:</strong> Educating local communities on sustainable land management practices and climate change adaptation measures.</li>
                    <li><strong>Early Warning Systems:</strong> Establishing monitoring and alert systems to provide timely warnings about impending floods and droughts.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Community Engagement</h3>
                  
                  <p className="text-gray-700 mb-6">
                    WECCMA actively involves local communities in its projects through participatory planning, training programs, and awareness campaigns. This ensures that interventions are tailored to local needs and promote long-term sustainability.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Partnerships</h3>
                  
                  <p className="text-gray-700 mb-6">
                    WECCMA collaborates with government agencies, research institutions, NGOs, and international organizations to leverage expertise, resources, and best practices in watershed management and climate change adaptation.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Expected Outcomes</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Reduced erosion rates and land degradation</li>
                    <li>Improved water quality and availability</li>
                    <li>Enhanced resilience to climate change impacts</li>
                    <li>Increased community awareness and participation in environmental management</li>
                  </ul>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Agency Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Established</p>
                        <p className="text-gray-600">2010</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">Kano State, Nigeria</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Stakeholders</p>
                        <p className="text-gray-600">Local Communities, Government Agencies</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Target className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Focus</p>
                        <p className="text-gray-600">Erosion, Watershed, Climate Change</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Support WECCMA</h3>
                  <p className="mb-4">
                    Contribute to our mission of protecting Kano State from erosion and climate change impacts.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-purple-600 hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/contact">
                      Get Involved
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WECCMA;
