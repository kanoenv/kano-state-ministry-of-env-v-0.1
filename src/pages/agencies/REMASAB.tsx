import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, FileText, Trash2, CheckCircle, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const REMASAB = () => {
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
              Refuse Management and Sanitation Board (REMASAB)
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Learn about REMASAB's efforts to manage waste and improve sanitation across Kano State.
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
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">About REMASAB</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Refuse Management and Sanitation Board (REMASAB) is a dedicated government agency responsible for overseeing waste management and sanitation services throughout Kano State. Established to address the growing challenges of waste disposal and environmental cleanliness, REMASAB plays a crucial role in maintaining public health and promoting a sustainable environment.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Responsibilities</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Collection and disposal of municipal solid waste</li>
                    <li>Street sweeping and public area cleaning</li>
                    <li>Management of landfill sites and waste treatment facilities</li>
                    <li>Enforcement of sanitation regulations and waste management policies</li>
                    <li>Public awareness campaigns on waste reduction and recycling</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Recent Achievements</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <BadgeCheck className="mr-2" size={20} />
                        Increased Waste Collection Efficiency
                      </h4>
                      <p className="text-green-700">
                        Expanded waste collection routes and optimized disposal methods, resulting in a 30% increase in waste collection efficiency across Kano metropolis.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Trash2 className="mr-2" size={20} />
                        Illegal Dumping Reduction
                      </h4>
                      <p className="text-blue-700">
                        Implemented stricter enforcement of sanitation laws, leading to a 40% reduction in illegal waste dumping in unauthorized areas.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                        <CheckCircle className="mr-2" size={20} />
                        Improved Landfill Management
                      </h4>
                      <p className="text-purple-700">
                        Enhanced landfill management practices, including regular waste compaction and leachate control, to minimize environmental pollution and health risks.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Community Engagement</h3>
                  
                  <p className="text-gray-700 mb-6">
                    REMASAB actively engages with local communities through public awareness campaigns, clean-up drives, and educational programs. These initiatives aim to promote responsible waste management practices and encourage community participation in maintaining a clean and healthy environment.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Future Plans</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Establishment of modern waste recycling plants to promote resource recovery and reduce landfill burden.</li>
                    <li>Expansion of public sanitation infrastructure, including the provision of public toilets and waste bins in strategic locations.</li>
                    <li>Strengthening collaboration with private sector partners to enhance waste management service delivery.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Contact Information</h3>
                  
                  <p className="text-gray-700 mb-6">
                    For inquiries, partnerships, or to report sanitation issues, please contact REMASAB through the following channels:
                  </p>
                  
                  <ul className="list-none pl-0 text-gray-700 space-y-2 mb-6">
                    <li className="flex items-center">
                      <MapPin className="mr-2 text-kano-primary" size={16} />
                      Head Office: Hotoro, Kano State
                    </li>
                    <li className="flex items-center">
                      <FileText className="mr-2 text-kano-primary" size={16} />
                      Website: <a href="http://remasab.kn.gov.ng" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">http://remasab.kn.gov.ng</a>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="mr-2 text-kano-primary" size={16} />
                      Working Hours: Monday - Friday, 8:00 AM - 4:00 PM
                    </li>
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
                        <p className="text-gray-600">2004</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Headquarters</p>
                        <p className="text-gray-600">Kano, Kano State</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Employees</p>
                        <p className="text-gray-600">500+</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-kano-primary text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Report Waste Issues</h3>
                  <p className="mb-4">
                    Help us keep Kano clean. Report any waste management issues or illegal dumping in your area.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-kano-primary hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/contact">
                      Report Now
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

export default REMASAB;
