import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, FileText, Globe, Zap, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const SKP = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]"
          style={{
            backgroundImage: "url('/lovable-uploads/d8ae522e-5423-4798-849c-d19bd4a9eed9.png')",
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
              Sustainable Kano Project (SKP)
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              A multi-sectoral initiative aimed at promoting sustainable urban growth, environmental conservation, and socio-economic resilience in Kano State.
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
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">About the Sustainable Kano Project</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Sustainable Kano Project (SKP) is a transformative initiative designed to foster sustainable urban growth, environmental conservation, and socio-economic resilience across Kano State. This multi-sectoral project integrates various strategies to address the complex challenges of urbanization and climate change, ensuring a balanced and prosperous future for the region.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Objectives</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li><strong>Promote Sustainable Urban Development:</strong> Implement urban planning strategies that prioritize green spaces, efficient infrastructure, and mixed-use development to reduce urban sprawl and enhance quality of life.</li>
                    <li><strong>Enhance Environmental Conservation:</strong> Protect and restore natural ecosystems, promote biodiversity, and implement sustainable resource management practices to ensure the long-term health of Kano's environment.</li>
                    <li><strong>Build Socio-Economic Resilience:</strong> Empower local communities through education, skills training, and economic opportunities that promote sustainable livelihoods and reduce vulnerability to environmental and economic shocks.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Core Components</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <Zap className="mr-2" size={20} />
                        Green Infrastructure Development
                      </h4>
                      <p className="text-green-700">
                        Establish green corridors, urban forests, and parks to improve air quality, reduce urban heat island effects, and provide recreational spaces for residents.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Sprout className="mr-2" size={20} />
                        Sustainable Agriculture Practices
                      </h4>
                      <p className="text-blue-700">
                        Promote climate-smart agriculture, efficient irrigation systems, and soil conservation techniques to enhance food security and reduce environmental impact.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                        <Globe className="mr-2" size={20} />
                        Renewable Energy Adoption
                      </h4>
                      <p className="text-purple-700">
                        Encourage the use of solar, wind, and biomass energy systems to reduce reliance on fossil fuels and promote a low-carbon economy.
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                        <FileText className="mr-2" size={20} />
                        Waste Management and Recycling
                      </h4>
                      <p className="text-yellow-700">
                        Implement integrated waste management systems, including recycling programs, waste-to-energy initiatives, and improved waste disposal facilities, to minimize pollution and conserve resources.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Community Engagement</h3>
                  
                  <p className="text-gray-700 mb-6">
                    SKP places a strong emphasis on community involvement, ensuring that local residents are active participants in the planning and implementation of project activities. This includes public consultations, educational programs, and skills training initiatives to empower communities and foster a sense of ownership and responsibility.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Expected Outcomes</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Improved air and water quality</li>
                    <li>Enhanced biodiversity and ecosystem health</li>
                    <li>Increased access to green spaces and recreational facilities</li>
                    <li>Reduced greenhouse gas emissions</li>
                    <li>Greater community resilience to climate change impacts</li>
                    <li>Sustainable economic opportunities and improved livelihoods</li>
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
                        <p className="text-gray-600">2024-2030</p>
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
                        <p className="font-medium text-gray-900">Stakeholders</p>
                        <p className="text-gray-600">Government, Communities, NGOs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Target className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Objectives</p>
                        <p className="text-gray-600">Sustainable Urban Growth, Environmental Conservation</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Support Sustainable Kano</h3>
                  <p className="mb-4">
                    Contribute to a greener and more resilient Kano State by supporting the Sustainable Kano Project.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-emerald-600 hover:bg-gray-100"
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

export default SKP;
