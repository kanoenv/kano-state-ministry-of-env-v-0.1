import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, Trash2 } from 'lucide-react';
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
              <Link to="/agencies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Agencies
              </Link>
            </Button>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Kano State Waste Management & Refuse Disposal Initiative 2025
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              A six-month initiative to restore Kano's cleanliness through restructured operations, optimized routes, and upgraded facilities.
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
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">Restoring Kano's Cleanliness</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Kano State Waste Management & Refuse Disposal Initiative 2025 is a focused, six-month rescue operation designed to rapidly improve the cleanliness and sanitation of Kano State. Spearheaded by REMASAB (Refuse Management and Sanitation Board), re-established in 2024 by Governor Yusuf, this initiative aims to overhaul waste management practices across the state.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Objectives</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li><strong>Restructuring Street-Sweeper Operations:</strong> Enhancing the efficiency and coverage of street-sweeping services to maintain cleaner public spaces.</li>
                    <li><strong>Optimizing Waste-Collection Routes:</strong> Implementing data-driven route optimization to ensure timely and effective waste collection.</li>
                    <li><strong>Upgrading Disposal Facilities:</strong> Modernizing waste disposal facilities to improve processing speed and environmental safety.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">REMASAB's Role</h3>
                  
                  <p className="text-gray-700 mb-6">
                    REMASAB, under the leadership of Governor Yusuf, is central to the initiative. The board is tasked with restructuring operations, optimizing resources, and ensuring the initiative meets its ambitious goals within the six-month timeframe.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Initiative Components</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                        <Trash2 className="mr-2" size={20} />
                        Enhanced Waste Collection
                      </h4>
                      <p className="text-yellow-700">
                        Deploying additional waste collection trucks and personnel to clear backlog and maintain regular collection schedules.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <Users className="mr-2" size={20} />
                        Community Engagement
                      </h4>
                      <p className="text-green-700">
                        Engaging local communities through awareness campaigns and providing resources for proper waste disposal practices.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <MapPin className="mr-2" size={20} />
                        Strategic Waste Bins Placement
                      </h4>
                      <p className="text-blue-700">
                        Placing waste bins at strategic locations to prevent littering and facilitate easy waste disposal.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Expected Outcomes</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Significant reduction in illegal waste dumpsites across Kano State.</li>
                    <li>Improved public health and sanitation conditions.</li>
                    <li>Increased efficiency in waste management operations.</li>
                    <li>Greater community participation in maintaining a clean environment.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Call to Action</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The Kano State Waste Management & Refuse Disposal Initiative 2025 is a critical step towards creating a cleaner, healthier, and more sustainable environment for all residents. By focusing on rapid improvements and community involvement, this initiative sets the stage for long-term environmental stewardship in Kano State.
                  </p>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Initiative Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Timeline</p>
                        <p className="text-gray-600">6 Months (2025)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Coverage</p>
                        <p className="text-gray-600">Kano State</p>
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
                        <p className="font-medium text-gray-900">Objective</p>
                        <p className="text-gray-600">Restore Cleanliness</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-earth text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Support Our Environment</h3>
                  <p className="mb-4">
                    Join us in our mission to create a cleaner and healthier Kano State.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-earth hover:bg-gray-100"
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

export default WasteManagement;
