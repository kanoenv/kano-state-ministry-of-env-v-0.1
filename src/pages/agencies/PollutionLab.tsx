import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, CheckCircle, BadgeCheck } from 'lucide-react';
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
              <Link to="/agencies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Agencies
              </Link>
            </Button>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Rehabilitation of the Kano State Pollution Control Laboratory
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Upgrading the region's pioneer lab to global standards with ultra‑modern infrastructure and expanded analytical mandate.
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
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">Revitalizing Environmental Monitoring</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Rehabilitation of the Kano State Pollution Control Laboratory marks a significant milestone in the region's commitment to environmental protection and public health. Under the leadership of Hon. Commissioner Hashim, the laboratory has been upgraded to meet global standards, enhancing its capacity for comprehensive environmental analysis and real-time public reporting.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Ultra-Modern Infrastructure</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The rehabilitation project involved the installation of state-of-the-art analytical equipment, including gas chromatography-mass spectrometry (GC-MS), atomic absorption spectroscopy (AAS), and high-performance liquid chromatography (HPLC) systems. These advanced technologies enable the laboratory to accurately detect and quantify a wide range of pollutants in air, water, and soil samples.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Expanded Analytical Mandate</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The upgraded laboratory now has the capability to conduct comprehensive testing for air quality parameters (PM2.5, SO2, NOx), water quality indicators (heavy metals, pesticides, organic pollutants), and soil contaminants (petroleum hydrocarbons, industrial chemicals). This expanded mandate ensures that the laboratory can address a broad spectrum of environmental challenges facing Kano State.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Real-Time Public Reporting</h3>
                  
                  <p className="text-gray-700 mb-6">
                    A key feature of the rehabilitated laboratory is its ability to provide real-time public reporting of environmental data. Through a user-friendly online portal, citizens, researchers, and policymakers can access up-to-date information on air and water quality levels, enabling informed decision-making and promoting environmental transparency.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Achievements</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <BadgeCheck className="mr-2" size={20} />
                        Enhanced Monitoring Capacity
                      </h4>
                      <p className="text-green-700">
                        The laboratory can now analyze over 100 different environmental parameters, providing a comprehensive assessment of pollution levels across Kano State.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <CheckCircle className="mr-2" size={20} />
                        Improved Data Accuracy
                      </h4>
                      <p className="text-blue-700">
                        The new analytical equipment ensures highly accurate and reliable data, enabling evidence-based environmental management and policy formulation.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                        <Users className="mr-2" size={20} />
                        Capacity Building
                      </h4>
                      <p className="text-purple-700">
                        Training programs have been conducted for laboratory staff to ensure they are proficient in operating the new equipment and implementing advanced analytical techniques.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Future Plans</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li><strong>Expansion of Monitoring Network:</strong> Establishing additional air and water quality monitoring stations across Kano State to provide real-time data coverage.</li>
                    <li><strong>Community Engagement Programs:</strong> Launching public awareness campaigns to educate citizens about environmental pollution and promote responsible practices.</li>
                    <li><strong>Research and Development:</strong> Collaborating with universities and research institutions to develop innovative solutions for environmental challenges in the region.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Commitment to Environmental Stewardship</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The Rehabilitation of the Kano State Pollution Control Laboratory underscores the government's unwavering commitment to environmental stewardship and the well-being of its citizens. By providing accurate, timely, and accessible environmental data, the laboratory plays a crucial role in safeguarding public health and promoting sustainable development in Kano State.
                  </p>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Laboratory Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Rehabilitation Date</p>
                        <p className="text-gray-600">Completed in 2024</p>
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
                        <p className="font-medium text-gray-900">Staff</p>
                        <p className="text-gray-600">Trained Professionals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Target className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Parameters</p>
                        <p className="text-gray-600">100+ environmental parameters</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Access Real-Time Data</h3>
                  <p className="mb-4">
                    Stay informed about environmental conditions in Kano State through our online monitoring portal.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-green-600 hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/contact">
                      View Data
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
