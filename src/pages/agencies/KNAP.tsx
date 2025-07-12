
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trees, Users, Target, Calendar, MapPin, Award, Leaf, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const KNAP = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]"
          style={{
            backgroundImage: "url('/lovable-uploads/e2810cb9-3811-469c-bc94-431d9f82e1df.png')",
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
              Kano State Afforestation Project (KNAP)
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Government-led programme dedicated to reforesting degraded lands, enhancing biodiversity, and mitigating climate change impacts through large-scale tree planting.
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
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">Reforesting Kano for a Sustainable Future</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Kano State Afforestation Project (KNAP) is a comprehensive initiative by the Kano State Government to combat desertification, enhance biodiversity, and mitigate climate change impacts through large-scale tree planting. This ambitious program aims to reforest degraded lands across the state, creating a greener and more sustainable environment for future generations.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Objectives</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Reforest degraded lands across Kano State</li>
                    <li>Enhance biodiversity and ecosystem health</li>
                    <li>Mitigate climate change impacts through carbon sequestration</li>
                    <li>Promote sustainable land management practices</li>
                    <li>Engage local communities in afforestation efforts</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Strategic Approach</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <Leaf className="mr-2" size={20} />
                        Large-Scale Tree Planting
                      </h4>
                      <p className="text-green-700">
                        Planting millions of trees across Kano State, focusing on native species that are well-suited to the local climate and soil conditions.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Droplets className="mr-2" size={20} />
                        Water Conservation
                      </h4>
                      <p className="text-blue-700">
                        Implementing water conservation techniques to ensure the survival and growth of newly planted trees, including rainwater harvesting and efficient irrigation systems.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                        <Users className="mr-2" size={20} />
                        Community Engagement
                      </h4>
                      <p className="text-purple-700">
                        Engaging local communities in afforestation efforts, providing training and resources to ensure the long-term sustainability of the project.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Activities</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Establishment of tree nurseries to provide seedlings for planting</li>
                    <li>Training of local communities in tree planting and maintenance techniques</li>
                    <li>Implementation of water conservation measures</li>
                    <li>Monitoring and evaluation of project progress</li>
                    <li>Public awareness campaigns to promote afforestation</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Expected Outcomes</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Increased forest cover across Kano State</li>
                    <li>Enhanced biodiversity and ecosystem health</li>
                    <li>Mitigation of climate change impacts through carbon sequestration</li>
                    <li>Improved livelihoods for local communities</li>
                    <li>Increased awareness of the importance of afforestation</li>
                  </ul>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Timeline</p>
                        <p className="text-gray-600">Ongoing</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Coverage</p>
                        <p className="text-gray-600">Statewide Implementation</p>
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
                        <p className="font-medium text-gray-900">Target</p>
                        <p className="text-gray-600">Millions of trees planted</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Support Afforestation</h3>
                  <p className="mb-4">
                    Be part of Kano State's green revolution and contribute to a sustainable future.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-green-600 hover:bg-gray-100"
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

export default KNAP;
