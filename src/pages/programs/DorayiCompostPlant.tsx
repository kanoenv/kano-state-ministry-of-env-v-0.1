
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, Recycle, Leaf, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DorayiCompostPlant = () => {
  const beforeAfterImages = [
    {
      before: "/lovable-uploads/98464267-c5ac-40ee-bb9b-6a17c0e0999f.png",
      after: "/lovable-uploads/b7a97ae8-8c88-4590-aefe-dd24d492b37c.png",
      title: "Processing Equipment Transformation",
      description: "From outdated machinery to modern, efficient composting equipment"
    },
    {
      before: "/lovable-uploads/58ae7e56-50ea-446a-ab04-a06555f14e3a.png",
      after: "/lovable-uploads/6ae6011f-782c-4c04-b35e-89c8d2b4248d.png",
      title: "Facility Modernization",
      description: "Complete renovation and upgrade of processing facilities"
    }
  ];

  const ceremonialImages = [
    {
      image: "/lovable-uploads/b7a97ae8-8c88-4590-aefe-dd24d492b37c.png",
      title: "Official Launch Ceremony",
      description: "Hon. Commissioner and dignitaries at the plant inauguration"
    },
    {
      image: "/lovable-uploads/5f9aa08e-1858-4cc3-824f-f739d483484c.png",
      title: "Ceremonial Compost Inspection",
      description: "Quality assessment of the first batch of revitalized compost"
    },
    {
      image: "/lovable-uploads/a3f7646a-8757-4275-bc35-d9f961b022f4.png",
      title: "Stakeholder Engagement",
      description: "Ministry officials and partners reviewing facility operations"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]"
          style={{
            backgroundImage: "url('/lovable-uploads/658b99f0-9adc-4e0b-8bcf-64c1f502de21.png')",
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
              Dorayi Compost Plant Revitalization Program
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              A flagship initiative transforming organic waste into valuable compost manure through the Waste-to-Wealth Initiative.
            </p>
          </div>
        </section>

        {/* Before & After Transformation Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-kano-primary/10 px-6 py-3 rounded-full mb-6">
                <Recycle className="w-5 h-5 text-kano-primary" />
                <span className="text-kano-primary font-semibold">Transformation Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-6">Before & After: A Complete Revival</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Witness the remarkable transformation of the Dorayi Compost Plant from dormancy to a state-of-the-art facility.
              </p>
            </div>

            <div className="space-y-16">
              {beforeAfterImages.map((comparison, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                      <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm mr-3">BEFORE</span>
                        Outdated Infrastructure
                      </h3>
                      <img 
                        src={comparison.before} 
                        alt={`Before - ${comparison.title}`}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                      />
                      <p className="text-red-700 mt-3">
                        Deteriorated equipment and facilities in need of complete overhaul
                      </p>
                    </div>
                  </div>

                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                      <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm mr-3">AFTER</span>
                        Modern Excellence
                      </h3>
                      <img 
                        src={comparison.after} 
                        alt={`After - ${comparison.title}`}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                      />
                      <p className="text-green-700 mt-3">
                        {comparison.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-kano-primary to-kano-secondary p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Transformation Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50</div>
                    <div className="text-sm opacity-90">Bags Daily Production</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-sm opacity-90">Equipment Upgrade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">25+</div>
                    <div className="text-sm opacity-90">Jobs Created</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ceremonial Moments Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-6">Official Launch & Ceremonies</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Celebrating the successful revitalization with key stakeholders and government officials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ceremonialImages.map((item, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">Program Overview</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Dorayi Compost Plant Revitalization Program is a flagship initiative by the Kano State Ministry of Environment and Climate Change, aimed at transforming organic waste into valuable compost manure. This program aligns with the state's Waste-to-Wealth Initiative, focusing on sustainable environmental practices, economic empowerment, and educational development.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Background</h3>
                  
                  <p className="text-gray-700 mb-6">
                    Established to address the growing waste management challenges in Kano State, the Dorayi Compost Plant was envisioned as a solution to convert organic waste into beneficial compost. However, over time, the facility faced neglect due to inadequate maintenance and operational challenges, leading to its eventual dormancy. Recognizing its potential, the Kano State Government, under the leadership of Governor Alhaji Abba Kabir Yusuf, prioritized the plant's rehabilitation as part of the broader Waste-to-Wealth Initiative.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Revitalization Efforts</h3>
                  
                  <p className="text-gray-700 mb-4">The revitalization process encompassed comprehensive renovations, including:</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">Equipment Modernization</h4>
                      <p className="text-green-700">
                        Upgrading processing equipment to modern standards for enhanced efficiency and output quality.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2">Advanced Processing Techniques</h4>
                      <p className="text-blue-700">
                        Implementing efficient waste sorting and composting techniques to optimize production processes.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-800 mb-2">Personnel Training</h4>
                      <p className="text-purple-700">
                        Training personnel in best practices for compost production and facility management.
                      </p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-800 mb-2">Quality Control Systems</h4>
                      <p className="text-orange-700">
                        Establishing quality control measures to ensure product consistency and safety standards.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Current Capacity & Output</h3>
                  
                  <p className="text-gray-700 mb-6">
                    Post-revitalization, the Dorayi Compost Plant boasts the capability to produce 50 bags of 50kg compost manure daily. This output significantly contributes to waste reduction and provides farmers with access to high-quality organic fertilizer, promoting sustainable agriculture across Kano State.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Scientific Analysis of Compost Product</h3>
                  
                  <p className="text-gray-700 mb-4">A comprehensive analysis of the compost produced at the Dorayi Plant reveals:</p>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li><strong>Heavy Metals:</strong> Concentrations are within recommended limits, ensuring safety for agricultural use</li>
                    <li><strong>Micronutrients:</strong> Levels are within permissible ranges, offering a balanced nutritional profile without toxicity risks</li>
                    <li><strong>Macronutrients:</strong> High concentrations of phosphorus, nitrogen, and potassium enhance soil fertility and crop yields</li>
                    <li><strong>pH Level:</strong> At 8.1, the compost is slightly alkaline, which may require management for certain crops and soil types</li>
                  </ul>

                  <p className="text-gray-700 mb-8">
                    These findings affirm the compost's suitability as a valuable soil amendment, promoting sustainable agriculture and environmental health.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Key Features & Benefits</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                      <Leaf className="w-8 h-8 text-green-600 mb-3" />
                      <h4 className="font-semibold text-green-800 mb-2">Educational Hub</h4>
                      <p className="text-green-700 text-sm">
                        The plant serves as a training center, offering practical learning opportunities in compost production for students, researchers, and entrepreneurs.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                      <Recycle className="w-8 h-8 text-blue-600 mb-3" />
                      <h4 className="font-semibold text-blue-800 mb-2">Environmental Impact</h4>
                      <p className="text-blue-700 text-sm">
                        By converting organic waste into compost, the plant reduces landfill use and greenhouse gas emissions, contributing to climate resilience.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                      <Award className="w-8 h-8 text-purple-600 mb-3" />
                      <h4 className="font-semibold text-purple-800 mb-2">Economic Empowerment</h4>
                      <p className="text-purple-700 text-sm">
                        The initiative creates job opportunities and encourages entrepreneurship in the green economy sector.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                      <Target className="w-8 h-8 text-orange-600 mb-3" />
                      <h4 className="font-semibold text-orange-800 mb-2">Strategic Importance</h4>
                      <p className="text-orange-700 text-sm">
                        Enhances soil fertility, reduces chemical fertilizer dependence, and improves public health through better waste management.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Partnership Opportunities</h3>
                  
                  <p className="text-gray-700 mb-4">
                    The Ministry invites private investors, entrepreneurs, and individuals to collaborate in expanding compost production. Support for partners includes:
                  </p>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                    <li>Technical guidance and training programs</li>
                    <li>Assistance in market access and distribution channels</li>
                    <li>Institutional support to ensure quality standards and sustainability</li>
                  </ul>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Program Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Launch Date</p>
                        <p className="text-gray-600">January 2025</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">Dorayi, Kano State</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Implementing Agency</p>
                        <p className="text-gray-600">Ministry of Environment</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Target className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Daily Output</p>
                        <p className="text-gray-600">50 bags (50kg each)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-kano-primary to-kano-secondary text-white p-6 rounded-lg shadow-lg mb-8">
                  <h3 className="text-lg font-semibold mb-4">Partnership Inquiry</h3>
                  <p className="mb-4 text-sm">
                    Interested in collaborating with us to expand compost production and support sustainable agriculture?
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-kano-primary hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/contact">
                      Contact Ministry
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Process Gallery */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Process Gallery</h3>
                  <div className="space-y-4">
                    <div>
                      <img 
                        src="/lovable-uploads/6b5e4d60-1a19-4a98-8f13-5f7aed4cda49.png" 
                        alt="Environmental enhancement activities" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2">Environmental enhancement activities</p>
                    </div>
                    <div>
                      <img 
                        src="/lovable-uploads/2e737d33-f1dc-4248-9cf0-2acf11fcff7b.png" 
                        alt="Modern composting equipment" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2">Modern composting equipment</p>
                    </div>
                  </div>
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

export default DorayiCompostPlant;
