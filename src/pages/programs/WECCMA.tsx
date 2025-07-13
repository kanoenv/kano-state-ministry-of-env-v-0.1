
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Phone, Mail, Facebook, MapPin, Shield, Info, Calendar, Users, Award, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const WECCMA = () => {
  const newsItems = [
    {
      title: "Erosion Control Project Launched in Tudun Yola",
      description: "The Executive Secretary of the Kano State Watersheds, Erosion and Climate Change Management Agency (KN-WECCMA), Dr. Muhammad S. Khalil, under the supervision of the Kano State Commissioner for Environment and Climate Change, Dr. Dahir M. Hashim, has launched an erosion control project in the Tudun Yola area, Bajallabe, Gwale Local Government Area.",
      date: "April 15, 2025",
      image: "/lovable-uploads/456deecb-0446-4812-9dc4-0a588be34b3e.png"
    },
    {
      title: "KN-WECCA, UNICEF Validate State Climate Change Policy",
      description: "WECCMA has partnered with UNICEF to validate the State Climate Change Policy, establishing a framework for climate action across all sectors.",
      link: "https://ait.live/kn-wecca-unicef-validate-state-climate-change-policy/",
      date: "March 22, 2025",
      image: "/lovable-uploads/66fcf58a-31c3-4685-a9ac-ff1b76f4b7cf.png"
    },
    {
      title: "Community Engagement Initiative Launched",
      description: "WECCMA is addressing the critical issue of sand mining that threatens local communities and agricultural lands across the state.",
      date: "February 10, 2025",
      image: "/lovable-uploads/77fdd1e9-11c6-474b-a94a-e5374e89a3c1.png"
    }
  ];

  const initiatives = [
    {
      title: "Gully Rehabilitation",
      description: "Construction and maintenance of erosion-control structures throughout Kano State.",
      icon: <Shield className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Watershed Mapping",
      description: "Real-time monitoring using remote sensing and GIS tools to track changes in watersheds.",
      icon: <MapPin className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Afforestation & Conservation",
      description: "Annual planting of tree seedlings along vulnerable riverbanks to prevent erosion.",
      icon: <Info className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Community Engagement",
      description: "End-of-Month Community Drives: State-wide anti-erosion exercises engaging volunteers.",
      icon: <Users className="h-6 w-6 text-purple-600" />
    }
  ];

  const achievements = [
    {
      title: "500+",
      subtitle: "Hectares Protected",
      description: "Land area secured from erosion through our intervention programs"
    },
    {
      title: "50,000+",
      subtitle: "Trees Planted",
      description: "Native species planted across vulnerable areas in Kano State"
    },
    {
      title: "25+",
      subtitle: "Communities Engaged",
      description: "Local communities actively participating in conservation efforts"
    },
    {
      title: "15+",
      subtitle: "Partners",
      description: "International and local organizations supporting our mission"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[600px]"
          style={{
            backgroundImage: "url('/lovable-uploads/75d03c12-99e4-4a6d-8451-03d5646c0653.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/85 to-purple-800/75"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-fit mb-8"
              asChild
            >
              <Link to="/programs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Programs
              </Link>
            </Button>
            <div className="max-w-4xl">
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Kano State WECCMA
              </h1>
              <p className="text-white/95 text-xl md:text-2xl mb-8 leading-relaxed">
                Watershed, Erosion and Climate Change Management Agency - Building resilient landscapes and protecting communities from erosion and climate impacts across Kano State.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  Our Impact
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 text-lg">
                  Get Involved
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Leadership Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src="/lovable-uploads/66fcf58a-31c3-4685-a9ac-ff1b76f4b7cf.png" 
                  alt="Executive Secretary addressing stakeholders" 
                  className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
                />
              </div>
              <div>
                <div className="mb-8">
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">Leadership</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Executive Leadership</h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Under the leadership of Executive Secretary Dr. Muhammad S. Khalil and Commissioner Dr. Dahir M. Hashim, WECCMA continues to drive innovative solutions for watershed management and climate resilience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <span className="text-gray-700">Strategic policy development and implementation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <span className="text-gray-700">International partnerships and collaboration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <span className="text-gray-700">Community-centered approach to conservation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Field Operations Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Field Operations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                WECCMA's field teams work directly with communities to implement sustainable conservation practices and monitor environmental changes across Kano State.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/lovable-uploads/1e809322-d223-4d0a-8299-fd2393f50dee.png" 
                    alt="Field assessment team" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Field Assessments</h3>
                  <p className="text-gray-600">Regular monitoring and assessment of erosion-prone areas to develop targeted intervention strategies.</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/lovable-uploads/02fba414-8a95-4f25-aeef-791c37a6d6a9.png" 
                    alt="Community engagement" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Community Training</h3>
                  <p className="text-gray-600">Capacity building programs that empower local communities to participate in conservation efforts.</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/lovable-uploads/66edd07a-05b2-4956-8449-3067b47033b3.png" 
                    alt="Research and monitoring" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Research & Monitoring</h3>
                  <p className="text-gray-600">Scientific research and data collection to inform evidence-based conservation strategies.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Project Highlights Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">Project Spotlight</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Infrastructure Development</h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  WECCMA implements critical infrastructure projects including erosion control structures, watershed management facilities, and community-based conservation initiatives.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                    <div className="text-gray-600">Hectares Protected</div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="/lovable-uploads/41435def-66f7-4f5c-b371-82a91840b060.png" 
                  alt="Project inauguration ceremony" 
                  className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Environmental Impact Section */}
        <section className="py-20 bg-purple-900 text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src="/lovable-uploads/456deecb-0446-4812-9dc4-0a588be34b3e.png" 
                  alt="Erosion damage assessment" 
                  className="w-full h-[400px] object-cover rounded-lg shadow-2xl"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6">Addressing Critical Challenges</h2>
                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  WECCMA tackles the urgent environmental challenges facing Kano State, from severe erosion damage to climate change impacts, through innovative and scientifically-backed interventions.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Erosion Control</h3>
                      <p className="text-white/80">Implementing structural and non-structural measures to prevent further land degradation.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Target className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Watershed Management</h3>
                      <p className="text-white/80">Comprehensive approach to managing water resources and protecting watersheds.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Climate Resilience</h3>
                      <p className="text-white/80">Building adaptive capacity to respond to climate change impacts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Engagement Section */}
        <section className="py-20 bg-green-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Community Partnership</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our success depends on strong partnerships with local communities, traditional leaders, and stakeholders across Kano State.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src="/lovable-uploads/e5b8da46-734c-42fe-8140-500b48cd98ed.png" 
                  alt="Community field visit" 
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Field Consultations</h3>
                <p className="text-gray-700 leading-relaxed">
                  Regular consultations with community leaders and local stakeholders to ensure our interventions align with community needs and traditional knowledge systems.
                </p>
              </div>

              <div>
                <img 
                  src="/lovable-uploads/6d24afbd-09aa-4b3f-86d3-c5e6f903ee87.png" 
                  alt="Community meeting" 
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Capacity Building</h3>
                <p className="text-gray-700 leading-relaxed">
                  Training programs and workshops that build local capacity for sustainable environmental management and climate change adaptation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Message Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <img 
                  src="/lovable-uploads/77fdd1e9-11c6-474b-a94a-e5374e89a3c1.png" 
                  alt="Executive leadership team" 
                  className="w-full h-[400px] object-cover rounded-lg shadow-2xl"
                />
              </div>
              
              <blockquote className="text-2xl italic text-gray-700 mb-8 leading-relaxed">
                "At WECCMA, we believe that environmental protection and climate resilience are not just policy objectives, but fundamental requirements for sustainable development and community wellbeing in Kano State."
              </blockquote>
              
              <div className="flex justify-center items-center space-x-4">
                <div className="text-center">
                  <p className="font-bold text-lg text-gray-900">Dr. Muhammad S. Khalil</p>
                  <p className="text-gray-600">Executive Secretary, WECCMA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Initiatives */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                WECCMA provides comprehensive environmental management services across multiple sectors and communities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {initiatives.map((initiative, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-8">
                    <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      {initiative.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{initiative.title}</h3>
                    <p className="text-gray-600">{initiative.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-purple-900 text-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Measurable results from our commitment to environmental protection and climate resilience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-green-400 mb-2">{achievement.title}</div>
                  <div className="text-xl font-semibold mb-3">{achievement.subtitle}</div>
                  <div className="text-white/80">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News & Updates */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest News & Updates</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay informed about WECCMA's latest projects, initiatives, and environmental impact across Kano State.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newsItems.map((item, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-purple-600 font-semibold mb-2">{item.date}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-purple-600 hover:text-purple-800 flex items-center font-medium"
                      >
                        Read more
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-purple-900">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
                <p className="text-xl text-white/90">
                  Contact WECCMA for environmental concerns, partnership opportunities, or to report erosion incidents.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Visit Our Office</h3>
                      <p className="text-white/80">NO 229 OLD WRECCA OFFICE, behind GORON DUTSE HILL, Kofar Kansakali, Kano 700282, Kano</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                      <a href="tel:+2347072660531" className="text-white/80 hover:text-white">+234 0707 266 0531</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-green-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                      <a href="mailto:weccma@environment.kn.gov.ng" className="text-white/80 hover:text-white">weccma@environment.kn.gov.ng</a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Quick Contact</h3>
                  <div className="space-y-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                      Report Environmental Issue
                    </Button>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-purple-900 py-3">
                      Partnership Inquiry
                    </Button>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-purple-900 py-3">
                      Request Information
                    </Button>
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

export default WECCMA;
