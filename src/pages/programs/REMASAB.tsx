
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin, AlertTriangle, Quote, Users, Truck, Recycle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const REMASAB = () => {
  const quotes = [
    {
      text: "Cleanliness is not just about appearance, it's about public health and community pride.",
      author: "Lameen Mukhtar Hassan, Acting MD of REMASAB"
    },
    {
      text: "Waste management is not a one-time effort but a continuous commitment to our environment and future generations.",
      author: "Ministry of Environment & Climate Change, Kano State"
    },
    {
      text: "Every clean street begins with individual responsibility. Together, we can transform Kano.",
      author: "REMASAB Public Awareness Campaign"
    }
  ];

  const projectImages = [
    {
      src: "/lovable-uploads/b7713052-078b-4bb5-9912-25bacc303d00.png",
      alt: "Governor and officials inspecting REMASAB operations",
      caption: "Governor's inspection of waste management facilities and operations"
    },
    {
      src: "/lovable-uploads/b91fb50d-48a6-4ae9-b569-9c3be8bd229b.png",
      alt: "Leadership visit to waste management site",
      caption: "Executive leadership overseeing environmental initiatives"
    },
    {
      src: "/lovable-uploads/a74295fa-b614-4e40-b4b0-b168f9e343c0.png",
      alt: "Environmental assessment and site inspection",
      caption: "Professional environmental assessment and monitoring"
    },
    {
      src: "/lovable-uploads/02b8cfd9-db91-411d-b0ad-777d4acf51c5.png",
      alt: "Heavy machinery waste clearance operations",
      caption: "Modern equipment for efficient waste clearance"
    },
    {
      src: "/lovable-uploads/80edfd09-f4f6-4961-8d25-bf9f3104ad5d.png",
      alt: "Mobile waste collection services",
      caption: "Innovative mobile waste collection units"
    },
    {
      src: "/lovable-uploads/ef21daaf-1427-4825-ab9c-abd5d4ab8c2c.png",
      alt: "Community street cleaning initiative",
      caption: "Community participation in street cleaning programs"
    }
  ];

  const services = [
    {
      title: "Household Waste Collection",
      description: "Comprehensive door-to-door waste collection services across all metropolitan areas",
      icon: <Truck className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Street Sweeping & Cleaning",
      description: "Daily cleaning of roads, highways, and public spaces to maintain urban hygiene",
      icon: <Users className="h-8 w-8" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Waste Recycling Programs",
      description: "Promoting sustainable practices through waste segregation and recycling initiatives",
      icon: <Recycle className="h-8 w-8" />,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Vector Control Services",
      description: "Professional fumigation and pest control to ensure public health safety",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px]"
          style={{
            backgroundImage: "url('/lovable-uploads/b7713052-078b-4bb5-9912-25bacc303d00.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
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
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">REMASAB</h1>
              <p className="text-white/95 text-xl md:text-2xl mb-8 leading-relaxed">
                Refuse Management and Sanitation Board - Leading sustainable waste management and creating a cleaner, healthier environment for all Kano State residents.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Waste Management</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Public Health</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Environmental Protection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="section-padding bg-gradient-to-r from-blue-50 to-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-kano-primary mb-6">Leadership Excellence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Under dedicated leadership, REMASAB continues to transform waste management and environmental sanitation across Kano State.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative">
                <img 
                  src="/lovable-uploads/e86f2165-8d88-4f80-918c-0a7329fd19c9.png" 
                  alt="Lameen Mukhtar Hassan" 
                  className="w-full h-96 object-cover object-center rounded-2xl shadow-2xl"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-kano-primary mb-6">Executive Leadership</h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-blue-700 mb-3">Lameen Mukhtar Hassan</h4>
                    <p className="text-blue-600 font-medium mb-3">Acting Managing Director</p>
                    <p className="text-gray-700 leading-relaxed">
                      Leading REMASAB's transformation with innovative waste management strategies and community-focused environmental solutions.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <blockquote className="text-gray-700 italic text-lg mb-4">
                      "Our mission extends beyond waste collection—we are building a sustainable future for Kano State through innovative environmental management and community partnership."
                    </blockquote>
                    <p className="text-blue-700 font-semibold">— Acting Managing Director</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-kano-primary mb-6">Honorable Commissioner</h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Honorable Commissioner provides strategic oversight and policy direction, ensuring REMASAB's operations align with the state's environmental objectives.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-lg font-bold text-green-800 mb-2">Strategic Vision</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>Modernizing waste management infrastructure</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>Enhancing community health and safety</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>Promoting environmental sustainability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <img 
                  src="/lovable-uploads/bf77f234-449e-4671-84ad-c3a2def97237.png" 
                  alt="Honorable Commissioner" 
                  className="w-full h-96 object-cover object-center rounded-2xl shadow-2xl"
                  style={{ objectPosition: 'center center' }}
                />
                <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-xl shadow-xl">
                  <Shield className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-kano-primary mb-6">About REMASAB</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                The Refuse Management and Sanitation Board (REMASAB) is the premier parastatal agency of Kano State, 
                dedicated to coordinating, supervising, and enforcing comprehensive solid waste management and public 
                cleansing activities across the metropolitan area.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    To deliver reliable and innovative refuse collection services while enforcing sanitation regulations 
                    and fostering community partnerships for sustainable waste management.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-green-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Recycle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    To achieve and sustain a clean, healthy, and disease-free environment for every community 
                    in Kano State through innovative waste management solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-orange-500 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Our Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Transforming communities through efficient waste management, promoting public health, 
                    and creating sustainable environmental solutions across Kano State.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-kano-primary mb-4">Core Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                REMASAB provides comprehensive waste management and sanitation services to ensure a clean and healthy environment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-4`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Operations Gallery */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-kano-primary mb-4">REMASAB in Action</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Witness our commitment to environmental excellence through comprehensive waste management operations across Kano State.
              </p>
            </div>
            
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {projectImages.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <div className="overflow-hidden rounded-xl shadow-lg">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-64 object-cover transition-transform hover:scale-105 duration-500"
                          />
                          <div className="bg-blue-600 text-white p-4">
                            <p className="font-medium text-sm">{image.caption}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* History & Timeline */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-kano-primary mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A timeline of REMASAB's evolution and commitment to environmental excellence in Kano State.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      1988 - Establishment
                    </div>
                    <p className="text-gray-700">Founded under the Kano State Environmental Sanitation Law to coordinate waste management across the metropolis.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      2022 - Restructuring
                    </div>
                    <p className="text-gray-700">Temporarily decommissioned as part of governmental restructuring and efficiency optimization.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      2024 - Revival
                    </div>
                    <p className="text-gray-700">Re-established by Governor Abba Kabir Yusuf to revitalize and modernize waste management services.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Quotes */}
        <section className="section-padding bg-blue-600 text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leadership Insights</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Inspiring words from our leadership team driving environmental transformation in Kano State.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {quotes.map((quote, index) => (
                    <CarouselItem key={index}>
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                        <CardContent className="p-8 text-center">
                          <Quote className="h-12 w-12 text-white/60 mx-auto mb-6" />
                          <blockquote className="text-xl italic text-white mb-6 leading-relaxed">
                            "{quote.text}"
                          </blockquote>
                          <p className="text-white/90 font-semibold">— {quote.author}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-white border-white/20" />
                <CarouselNext className="text-white border-white/20" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Contact & Engagement */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-kano-primary mb-4">Contact & Get Involved</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Partner with us in creating a cleaner, healthier environment for all Kano State residents.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-6 text-kano-primary">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="text-blue-600 mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold mb-1">Office Address</p>
                            <p className="text-gray-700">REMASAB Headquarters<br />Club Road, by KAROTA Office<br />Kano State, Nigeria</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="text-blue-600 mr-4 flex-shrink-0" />
                          <div>
                            <p className="font-semibold mb-1">Phone</p>
                            <p className="text-gray-700">+234 701 353 6117</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="text-blue-600 mr-4 flex-shrink-0" />
                          <div>
                            <p className="font-semibold mb-1">Email</p>
                            <p className="text-gray-700">remasab@environment.kn.gov.ng</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-6 text-kano-primary">How to Engage</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">Report sanitation issues and illegal dumping</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">Request waste collection services</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">Participate in community cleaning initiatives</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">Partner in environmental sustainability programs</p>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                          Report Environmental Issue
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 italic">
                        Citizens can report sanitation concerns, request special services, or provide feedback through 
                        our official channels. Together, we build a cleaner, healthier Kano State.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default REMASAB;
