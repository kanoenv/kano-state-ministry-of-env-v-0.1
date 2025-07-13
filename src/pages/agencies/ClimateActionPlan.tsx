import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, Globe, Zap, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClimateActionPlan = () => {
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
              Climate Change Policy Implementation Action Plan
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Turning climate policy into practice through renewable energy, community adaptation, and emissions monitoring in partnership with PACE/UK-DFID.
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
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">From Policy to Practice</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Climate Change Policy Implementation Action Plan represents a groundbreaking initiative by the Kano State Ministry of Environment and Climate Change to translate comprehensive climate policies into actionable, measurable interventions. Developed in partnership with the Partnership for Agile Governance & Climate Engagement (PACE/UK-DFID), this detailed action plan serves as the roadmap for Kano State's climate resilience and sustainability efforts.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Partnership with PACE/UK-DFID</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The collaboration with PACE, supported by the UK Department for International Development (UK-DFID), brings international expertise and best practices to Kano State's climate action efforts. This partnership ensures that the action plan aligns with global climate standards while addressing the unique environmental challenges facing the region.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Implementation Areas</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <Zap className="mr-2" size={20} />
                        Renewable Energy Development
                      </h4>
                      <p className="text-green-700">
                        Strategic deployment of solar, wind, and biomass energy systems across rural and urban areas to reduce carbon emissions and enhance energy security. The plan includes specific targets for renewable energy capacity building and grid integration.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Sprout className="mr-2" size={20} />
                        Community Adaptation Programs
                      </h4>
                      <p className="text-blue-700">
                        Comprehensive community-based adaptation initiatives including climate-smart agriculture, water conservation, drought-resistant crop varieties, and ecosystem restoration projects designed to build local resilience.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                        <Globe className="mr-2" size={20} />
                        Emissions Monitoring & Reporting
                      </h4>
                      <p className="text-purple-700">
                        Implementation of sophisticated monitoring systems to track greenhouse gas emissions across sectors, establish baseline measurements, and provide regular progress reports on emission reduction targets.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Climate-Smart Agriculture</h3>
                  
                  <p className="text-gray-700 mb-6">
                    A major component of the action plan focuses on transforming agricultural practices to enhance productivity while reducing environmental impact. This includes promoting drought-resistant crops, efficient irrigation systems, soil conservation techniques, and sustainable livestock management practices.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Urban Climate Resilience</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The plan addresses urban climate challenges through green infrastructure development, sustainable transportation systems, energy-efficient buildings, and urban forest expansion. These interventions aim to reduce urban heat island effects and improve air quality in major cities.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Implementation Timeline</h3>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li><strong>Phase 1 (2024-2025):</strong> Policy framework establishment and baseline assessments</li>
                    <li><strong>Phase 2 (2025-2027):</strong> Pilot project implementation and capacity building</li>
                    <li><strong>Phase 3 (2027-2030):</strong> Full-scale deployment and monitoring</li>
                    <li><strong>Ongoing:</strong> Community engagement and stakeholder coordination</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Expected Impact</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The Climate Change Policy Implementation Action Plan is projected to reduce state-wide greenhouse gas emissions by 30% by 2030, improve climate resilience for over 2 million residents, and create thousands of green jobs across renewable energy, sustainable agriculture, and environmental management sectors.
                  </p>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Action Plan Details</h3>
                  
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
                        <p className="text-gray-600">Statewide Implementation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Partners</p>
                        <p className="text-gray-600">PACE/UK-DFID</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Target className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Target</p>
                        <p className="text-gray-600">30% emission reduction by 2030</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Join the Climate Action</h3>
                  <p className="mb-4">
                    Be part of Kano State's climate resilience journey and contribute to sustainable development.
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

export default ClimateActionPlan;
