
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const WasteManagement = () => {
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
              <Link to="/programs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Programs
              </Link>
            </Button>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Kano State Waste Management & Refuse Disposal Initiative 2025
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              A six-month rescue initiative to restore Kano's cleanliness through REMASAB restructuring and modernization.
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
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">Program Overview</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Kano State Waste Management & Refuse Disposal Initiative 2025 represents a comprehensive approach to addressing the state's waste management challenges. This six-month rescue initiative has been designed to restore Kano's reputation as one of Nigeria's cleanest states through systematic restructuring and modernization of waste management operations.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">REMASAB Transformation</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The Refuse Management and Sanitation Board (REMASAB), reestablished by Governor Yusuf in 2024, serves as the cornerstone of this initiative. The board has undergone significant restructuring to enhance its operational capacity and effectiveness in waste management across the state.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Components</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">Street-Sweeper Operations Restructuring</h4>
                      <p className="text-green-700">
                        Complete overhaul of street cleaning operations with improved schedules, equipment, and personnel management to ensure consistent cleanliness across all local government areas.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2">Waste Collection Route Optimization</h4>
                      <p className="text-blue-700">
                        Implementation of smart routing systems and GPS tracking to optimize collection routes, reduce fuel consumption, and ensure timely waste pickup from residential and commercial areas.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2">Disposal Facility Upgrades</h4>
                      <p className="text-purple-700">
                        Modernization of existing disposal facilities with new equipment and technology to enable faster, more efficient, and environmentally sound waste processing and disposal.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Expected Outcomes</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Significant reduction in street litter and accumulated waste</li>
                    <li>Improved public health and sanitation standards</li>
                    <li>Enhanced environmental quality across urban and rural areas</li>
                    <li>Increased efficiency in waste collection and disposal operations</li>
                    <li>Job creation opportunities in the sanitation sector</li>
                    <li>Strengthened community engagement in waste management practices</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Community Engagement</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The initiative emphasizes strong community participation through awareness campaigns, educational programs, and incentive schemes for proper waste disposal. Local communities are encouraged to take ownership of their environment while supporting government efforts.
                  </p>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Program Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Duration</p>
                        <p className="text-gray-600">6 months (2025)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Coverage</p>
                        <p className="text-gray-600">All 44 LGAs in Kano State</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Implementing Agency</p>
                        <p className="text-gray-600">REMASAB</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Target className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Target</p>
                        <p className="text-gray-600">100% waste collection efficiency</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-kano-primary text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
                  <p className="mb-4">
                    Join the initiative to make Kano cleaner and more sustainable for future generations.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-kano-primary hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/contact">
                      Contact Us
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

export default WasteManagement;
