
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, Microscope, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PollutionLab = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]"
          style={{
            backgroundImage: "url('/lovable-uploads/326de5bf-11c7-4839-928c-1aeb3fb9ab3d.png')",
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
              Rehabilitation of the Kano State Pollution Control Laboratory
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Upgrading the region's pioneer laboratory to global standards with cutting-edge infrastructure and expanded analytical capabilities.
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
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">Laboratory Transformation</h2>
                  
                  <p className="text-gray-700 mb-6">
                    Under the leadership of Hon. Commissioner Hashim, the Kano State Pollution Control Laboratory has undergone a remarkable transformation. This pioneering facility, originally established as the region's first environmental testing laboratory, has been upgraded to meet international standards and expanded its analytical mandate to serve the growing environmental monitoring needs of Kano State.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Ultra-Modern Infrastructure</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The rehabilitation project involved a complete overhaul of the laboratory's infrastructure, incorporating state-of-the-art equipment and technology that enables comprehensive environmental analysis. The facility now stands as a model for environmental laboratories across Nigeria and the West African region.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Expanded Analytical Capabilities</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Microscope className="mr-2" size={20} />
                        Air Quality Testing
                      </h4>
                      <p className="text-blue-700">
                        Advanced monitoring of air pollutants including particulate matter (PM2.5, PM10), nitrogen oxides, sulfur dioxide, carbon monoxide, and volatile organic compounds with real-time data processing capabilities.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">Water Quality Analysis</h4>
                      <p className="text-green-700">
                        Comprehensive testing of surface water, groundwater, and wastewater for physical, chemical, and biological parameters including heavy metals, pesticides, bacteria, and other contaminants.
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-800 mb-2">Soil Contamination Assessment</h4>
                      <p className="text-yellow-700">
                        Detailed soil analysis for agricultural and industrial contaminants, heavy metals, pH levels, nutrient content, and organic pollutants to support sustainable land use planning.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Real-Time Public Reporting</h3>
                  
                  <p className="text-gray-700 mb-6">
                    One of the most significant features of the upgraded laboratory is its capacity for real-time public reporting. Environmental data collected through continuous monitoring stations across Kano State is processed and made available to the public through digital platforms, ensuring transparency and enabling informed decision-making by residents and businesses.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Research and Development</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The laboratory serves as a hub for environmental research and development activities, collaborating with academic institutions, international organizations, and research bodies to advance environmental science and develop innovative solutions to local environmental challenges.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Capacity Building</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Training programs for laboratory technicians and environmental professionals</li>
                    <li>Workshops on environmental monitoring techniques and best practices</li>
                    <li>Collaboration with universities for student internship programs</li>
                    <li>International certification and quality assurance programs</li>
                    <li>Knowledge sharing with other African environmental laboratories</li>
                  </ul>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Laboratory Specifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Upgrade Completed</p>
                        <p className="text-gray-600">2024</p>
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
                        <p className="font-medium text-gray-900">Overseen by</p>
                        <p className="text-gray-600">Hon. Commissioner Hashim</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <BarChart3 className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Testing Capacity</p>
                        <p className="text-gray-600">24/7 monitoring & analysis</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Laboratory Services</h3>
                  <p className="mb-4">
                    Access comprehensive environmental testing and monitoring services for your organization or community.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-red-600 hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/contact">
                      Request Testing
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

export default PollutionLab;
