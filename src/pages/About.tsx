
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Briefcase, Users, Award, Globe, Shield, MapPin, BookOpen, ChevronRight, Settings, BarChart, Leaf, Building2, FlaskConical, ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  // Leadership data with professional images
  const leadership = [
    {
      name: "Dr. Dahiru Muhammad Hashim",
      title: "Honorable Commissioner",
      image: "/lovable-uploads/319212f0-dc1b-435d-9429-51762c07918d.png",
      showImage: true,
      isCommissioner: true,
    },
    {
      name: "Qs. Shazali Garba",
      title: "Ag. Permanent Secretary",
      image: "/lovable-uploads/3b854c9b-94ef-42ad-b72f-fa13645e3aca.png",
      showImage: true,
      isCommissioner: false,
    }
  ];

  // Directors data with professional images
  const directors = [
    {
      name: "Adamu Fate Jigawaire",
      title: "Director, Admin and General Services",
      image: "/lovable-uploads/6f93c916-f8fc-43c1-9ed5-5cc9e624f29f.png",
      showImage: true,
    },
    {
      name: "Dr. Umar Saleh Anka",
      title: "Director, Climate Change",
      image: "/lovable-uploads/7e06bf53-3435-4584-9601-bfddc3535419.png",
      showImage: true,
    },
    {
      name: "Ibrahim Nasir",
      title: "Director, Pollution Control",
      image: "/lovable-uploads/dfcb890c-81e9-41aa-8fab-7fed5a682818.png",
      showImage: true,
    },
    {
      name: "Salman Abdu Adamu",
      title: "Director, Environmental Sanitation",
      image: "/lovable-uploads/a1b820e8-8fff-49d0-bc92-8fcf0120a031.png",
      showImage: true,
    },
    {
      name: "Ahmad Ibrahim Chigari",
      title: "Director, Special Duties",
      image: "/lovable-uploads/0846eb2a-3829-47e3-8a86-6a824fa06c7b.png",
      showImage: true,
    },
    {
      name: "Qs. Shazali Garba",
      title: "Director, Planning, Research and Statistics",
      image: "/lovable-uploads/3b854c9b-94ef-42ad-b72f-fa13645e3aca.png",
      showImage: true,
    },
    {
      name: "Murtala Shehu Umar",
      title: "Director, Public Enlightenment",
      image: "/lovable-uploads/37b827ba-aeb1-455b-a3e4-0c073d03fa10.png",
      showImage: true,
    },
    {
      name: "Arc. Nasiru",
      title: "Director, Engineering",
      image: "",
      showImage: false,
    },
    {
      name: "Alawiyya Baba Musa",
      title: "Coordinator, Pollution Control Laboratory",
      image: "/lovable-uploads/c30451c6-d258-4162-86fb-563454fb8340.png",
      showImage: true,
    },
    {
      name: "Professor AB Nabegu",
      title: "Technical Advisor to the Honorable Commissioner",
      image: "/lovable-uploads/0f2f0833-c845-4a65-b900-0491a7135a49.png",
      showImage: true,
    }
  ];

  const departments = [
    {
      name: "Administration and General Services",
      description: "Responsible for human resource management, administrative coordination, and general support services across all ministry operations.",
      icon: <Settings className="h-8 w-8" />,
      functions: [
        "Human Resource Management",
        "Administrative Coordination",
        "General Support Services",
        "Office Management"
      ]
    },
    {
      name: "Climate Change",
      description: "Leads climate change mitigation and adaptation strategies, policy development, and international climate cooperation initiatives.",
      icon: <Globe className="h-8 w-8" />,
      functions: [
        "Climate Policy Development",
        "Mitigation Strategies",
        "Adaptation Programs",
        "International Cooperation"
      ]
    },
    {
      name: "Pollution Control",
      description: "Monitors and controls environmental pollution, conducts environmental impact assessments, and enforces pollution control regulations.",
      icon: <Shield className="h-8 w-8" />,
      functions: [
        "Pollution Monitoring",
        "Environmental Impact Assessment",
        "Regulatory Enforcement",
        "Industrial Pollution Control"
      ]
    },
    {
      name: "Environmental Sanitation",
      description: "Oversees waste management systems, sanitation programs, and public health environmental initiatives throughout Kano State.",
      icon: <Building2 className="h-8 w-8" />,
      functions: [
        "Waste Management",
        "Sanitation Programs",
        "Public Health Initiatives",
        "Urban Cleanliness"
      ]
    },
    {
      name: "Planning, Research and Statistics",
      description: "Conducts environmental research, collects and analyzes environmental data, and develops strategic plans for the ministry.",
      icon: <BarChart className="h-8 w-8" />,
      functions: [
        "Environmental Research",
        "Data Collection & Analysis",
        "Strategic Planning",
        "Statistical Reporting"
      ]
    },
    {
      name: "Public Enlightenment",
      description: "Develops and implements public awareness campaigns, environmental education programs, and community engagement initiatives.",
      icon: <Users className="h-8 w-8" />,
      functions: [
        "Public Awareness Campaigns",
        "Environmental Education",
        "Community Engagement",
        "Media Relations"
      ]
    },
    {
      name: "Engineering",
      description: "Provides technical engineering support for environmental projects, infrastructure development, and facility management.",
      icon: <Briefcase className="h-8 w-8" />,
      functions: [
        "Project Engineering",
        "Infrastructure Development",
        "Technical Support",
        "Facility Management"
      ]
    },
    {
      name: "Special Duties",
      description: "Handles special assignments, emergency response coordination, and cross-departmental project implementation.",
      icon: <Award className="h-8 w-8" />,
      functions: [
        "Special Assignments",
        "Emergency Response",
        "Cross-departmental Projects",
        "Strategic Initiatives"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Professional Hero Section with Enhanced Background */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage: "url('/lovable-uploads/cf45aab3-ccbc-4ef5-a201-276198f68571.png')",
              filter: 'brightness(0.85) contrast(1.1) saturate(1.1)',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45"></div>
          <div className="container-custom relative h-full flex items-center z-10">
            <div className="max-w-5xl">
              <div className="mb-8">
                <div className="inline-block bg-white/15 backdrop-blur-md rounded-full px-8 py-3 mb-6 border border-white/20">
                  <span className="text-white/95 text-sm font-semibold uppercase tracking-wider">About the Ministry</span>
                </div>
              </div>
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
                Environmental
                <span className="block text-kano-accent bg-gradient-to-r from-kano-accent to-yellow-400 bg-clip-text text-transparent">Excellence</span>
              </h1>
              <p className="text-white/95 text-xl md:text-2xl max-w-4xl leading-relaxed mb-10 font-medium">
                Leading Kano State toward a sustainable future through innovative environmental policies, 
                cutting-edge technology, and unwavering commitment to ecological preservation.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-kano-primary hover:bg-white/95 font-bold px-10 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link to="/contact">Get In Touch</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-kano-primary font-bold px-10 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                >
                  <Link to="/programs">Our Programs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Executive Summary with Professional Image */}
        <section className="py-32 bg-gradient-to-br from-white via-gray-50/50 to-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-kano-primary mb-10 leading-tight">Excellence in Environmental Governance</h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                The Kano State Ministry of Environment and Climate Change stands as a beacon of environmental stewardship, 
                combining decades of experience with cutting-edge approaches to create a sustainable future for our state.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="space-y-10">
                  <div className="border-l-4 border-kano-primary pl-8 py-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Our Heritage</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Established in 1967 alongside Kano State's formation, our ministry has evolved from a traditional 
                      environmental oversight body to a dynamic, forward-thinking organization that addresses contemporary 
                      environmental challenges with innovative solutions.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-kano-secondary pl-8 py-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Modern Leadership</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Under the visionary leadership of His Excellency, Alhaji Abba Kabir Yusuf, and the strategic 
                      direction of our Honorable Commissioner, Dr. Dahiru Muhammad Hashim, we have transformed our 
                      approach to environmental management, embracing technology and community partnerships.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-kano-accent pl-8 py-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Global Recognition</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Our partnerships with international organizations including UNDP, GIZ, and the World Bank 
                      demonstrate our commitment to global best practices and our role as a leader in sustainable 
                      environmental management in Nigeria and beyond.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="bg-gradient-to-br from-kano-primary/15 to-kano-secondary/15 rounded-3xl p-10 border-2 border-kano-primary/20 shadow-xl">
                  <h3 className="text-3xl font-bold text-kano-primary mb-8 text-center">Strategic Impact</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center p-4 bg-white/80 rounded-2xl shadow-lg">
                      <div className="text-4xl font-bold text-kano-primary mb-3">500+</div>
                      <div className="text-sm font-semibold text-gray-600">Dedicated Staff</div>
                    </div>
                    <div className="text-center p-4 bg-white/80 rounded-2xl shadow-lg">
                      <div className="text-4xl font-bold text-kano-primary mb-3">44</div>
                      <div className="text-sm font-semibold text-gray-600">LGA Coverage</div>
                    </div>
                    <div className="text-center p-4 bg-white/80 rounded-2xl shadow-lg">
                      <div className="text-4xl font-bold text-kano-primary mb-3">10+</div>
                      <div className="text-sm font-semibold text-gray-600">Global Partners</div>
                    </div>
                    <div className="text-center p-4 bg-white/80 rounded-2xl shadow-lg">
                      <div className="text-4xl font-bold text-kano-primary mb-3">50+</div>
                      <div className="text-sm font-semibold text-gray-600">Awards & Recognition</div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src="/lovable-uploads/8c00111d-1410-4210-93aa-5877bd4b6ee7.png"
                      alt="Ministry of Environment and Climate Change Headquarters" 
                      className="w-full h-full object-cover filter brightness-110 contrast-115 saturate-110 hover:brightness-115 transition-all duration-500"
                      loading="lazy"
                    />
                  </AspectRatio>
                  <div className="p-8 bg-gradient-to-r from-kano-primary via-kano-secondary to-kano-primary text-white">
                    <p className="text-center font-bold text-xl mb-2">
                      Ministry of Environment and Climate Change Headquarters
                    </p>
                    <p className="text-center text-white/95 text-sm">
                      Leading environmental governance in Kano State with state-of-the-art facilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-kano-primary mb-6">Our Mission & Vision</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Guided by clear objectives and unwavering commitment to environmental excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              {/* Mission */}
              <div className="bg-white rounded-3xl p-12 border-2 border-kano-primary/10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kano-primary to-kano-secondary"></div>
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-kano-primary to-kano-secondary rounded-3xl p-4 mr-6 shadow-lg">
                    <BookOpen className="text-white" size={32} />
                  </div>
                  <h3 className="text-kano-primary text-3xl font-bold">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To manage land, air, and water pollution; conserve habitats and biodiversity; 
                  develop alternative energy sources; promote environmental education; 
                  prevent and control drought, desertification, flood, and erosion; 
                  restore degraded lands; and address climate change issues through innovative, 
                  evidence-based solutions and community partnership.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-3xl p-12 border-2 border-kano-accent/10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kano-accent to-kano-primary"></div>
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-kano-accent to-kano-primary rounded-3xl p-4 mr-6 shadow-lg">
                    <Globe className="text-white" size={32} />
                  </div>
                  <h3 className="text-kano-accent text-3xl font-bold">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To improve the quality of living through healthy environmental development, 
                  transforming Kano into a clean, green, and climate‑resilient state that serves 
                  as a model for sustainable development in Nigeria and across Africa.
                </p>
              </div>
            </div>
            
            {/* Strategic Objectives */}
            <div className="mt-20">
              <h3 className="text-3xl font-bold text-center text-kano-primary mb-16">Strategic Objectives</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-t-4 border-kano-primary group hover:-translate-y-2">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-br from-kano-primary to-kano-secondary rounded-3xl p-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <BookOpen size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="ml-4 font-bold text-xl text-gray-800">Policy Excellence</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">Plan, promote, coordinate, and oversee implementation of cutting-edge environmental policies and programs that set new standards for environmental governance.</p>
                </div>
                
                <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-t-4 border-kano-primary group hover:-translate-y-2">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-br from-kano-primary to-kano-secondary rounded-3xl p-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Award size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="ml-4 font-bold text-xl text-gray-800">Environmental Quality</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">Secure and foster a quality environment conducive to ecosystem health and human well‑being through scientific monitoring and evidence-based interventions.</p>
                </div>
                
                <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-t-4 border-kano-primary group hover:-translate-y-2">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-br from-kano-primary to-kano-secondary rounded-3xl p-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Shield size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="ml-4 font-bold text-xl text-gray-800">Environmental Protection</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">Design and execute comprehensive measures to prevent flooding, erosion, drought, and desertification while building climate resilience across all communities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Professional Leadership Team Section */}
        <section className="py-32 bg-white">
          <div className="container-custom">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-bold text-kano-primary mb-8 leading-tight">Executive Leadership</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Distinguished professionals leading environmental transformation in Kano State with unparalleled expertise and vision
              </p>
            </div>
            
            {/* Senior Leadership - Ultra Professional Display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
              {leadership.map((leader, index) => (
                <Card key={index} className={`overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 border-0 rounded-3xl group bg-gradient-to-br from-white to-gray-50/30 ${leader.isCommissioner ? 'lg:col-span-2 max-w-5xl mx-auto' : ''}`}>
                  <CardContent className="p-0">
                    <div className={`flex ${leader.isCommissioner ? 'flex-col lg:flex-row' : 'flex-col'} h-full`}>
                      {/* Ultra Professional Image Container */}
                      <div className={`relative ${leader.isCommissioner ? 'lg:w-1/2' : 'w-full'} overflow-hidden`}>
                        {leader.showImage && (
                          <div className="relative">
                            <AspectRatio ratio={leader.isCommissioner ? 1 : 4/3}>
                              <img 
                                src={leader.image} 
                                alt={`${leader.name} - ${leader.title}`} 
                                className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${
                                  leader.isCommissioner 
                                    ? "object-center filter brightness-115 contrast-120 saturate-115" 
                                    : "object-center scale-110 filter brightness-120 contrast-125 saturate-110"
                                }`}
                                loading="lazy"
                              />
                            </AspectRatio>
                            {/* Professional Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                            
                            {/* Executive Position Badge */}
                            <div className="absolute top-8 right-8">
                              <div className={`${leader.isCommissioner 
                                ? 'bg-gradient-to-r from-kano-primary via-kano-secondary to-kano-accent' 
                                : 'bg-gradient-to-r from-kano-accent via-kano-primary to-kano-secondary'} 
                                text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border-3 border-white/30 backdrop-blur-sm`}>
                                {leader.isCommissioner ? 'Hon. Commissioner' : 'Ag. Permanent Secretary'}
                              </div>
                            </div>

                            {/* Professional Title at Bottom */}
                            <div className="absolute bottom-8 left-8 right-8">
                              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-2xl">
                                {leader.name}
                              </h3>
                              <p className="text-white/95 text-lg font-semibold drop-shadow-lg">
                                {leader.title}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Executive Content Section */}
                      <div className={`${leader.isCommissioner ? 'lg:w-1/2' : 'w-full'} p-12 bg-gradient-to-br from-white via-gray-50/30 to-white flex flex-col justify-center`}>
                        <div className="space-y-8">
                          {leader.isCommissioner && (
                            <div className="space-y-6">
                              <div className="inline-block bg-gradient-to-r from-kano-primary/10 to-kano-secondary/10 rounded-full px-6 py-2 border border-kano-primary/20">
                                <span className="text-kano-primary font-bold text-sm uppercase tracking-wider">Chief Environmental Officer</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed text-lg">
                                Leading the Ministry of Environment and Climate Change with visionary leadership, 
                                strategic innovation, and unwavering commitment to environmental excellence across Kano State.
                              </p>
                              <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-xl p-4">
                                <Shield className="h-5 w-5 mr-3 text-kano-primary" />
                                <span className="font-semibold">Chief Environmental Officer, Kano State Government</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="pt-6 border-t border-gray-200">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-2 text-kano-primary" />
                              <span>Ministry of Environment and Climate Change, Kano State</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Directors and Key Officials - Professional Grid */}
            <div className="space-y-20">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-kano-primary mb-6">Ministry Directors & Key Officials</h3>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Experienced professionals driving departmental excellence and strategic implementation across all ministry operations
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {directors.map((director, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-700 border-0 rounded-3xl group bg-gradient-to-br from-white via-gray-50/20 to-white hover:-translate-y-3 transform">
                    <CardContent className="p-10">
                      <div className="text-center space-y-8">
                        {/* Ultra Professional Avatar */}
                        {director.showImage ? (
                          <div className="mx-auto relative">
                            <div className="h-32 w-32 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-kano-primary via-kano-secondary to-kano-accent shadow-2xl group-hover:scale-110 transition-transform duration-500 bg-white p-1">
                              <AspectRatio ratio={1}>
                                <img 
                                  src={director.image} 
                                  alt={`${director.name} - ${director.title}`} 
                                  className={`w-full h-full object-cover rounded-full filter brightness-115 contrast-120 saturate-110 ${
                                    director.name === "Qs. Shazali Garba" 
                                      ? "object-center scale-110" 
                                      : "object-top scale-105"
                                  }`}
                                  loading="lazy"
                                />
                              </AspectRatio>
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-kano-primary to-kano-secondary rounded-full p-4 shadow-xl border-3 border-white">
                              <Briefcase className="text-white" size={16} />
                            </div>
                          </div>
                        ) : (
                          <div className="mx-auto relative">
                            <Avatar className="h-32 w-32 mx-auto border-4 border-kano-primary shadow-2xl group-hover:scale-110 transition-transform duration-500">
                              <AvatarFallback className="bg-gradient-to-br from-kano-primary to-kano-secondary text-white text-3xl font-bold">
                                {director.name.split(' ').map(name => name[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-kano-primary to-kano-secondary rounded-full p-4 shadow-xl border-3 border-white">
                              <Briefcase className="text-white" size={16} />
                            </div>
                          </div>
                        )}
                        
                        {/* Professional Details */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-kano-primary transition-colors duration-500">
                            {director.name}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed font-medium">
                            {director.title}
                          </p>
                          <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 rounded-lg py-2 px-3">
                              <Building2 className="h-3 w-3 mr-2" />
                              <span className="font-semibold">Ministry Leadership</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-kano-primary mb-6">Our Departments</h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-4xl mx-auto">
              The Ministry is organized into specialized departments, each playing a crucial role in achieving our environmental goals. 
              Our departmental structure ensures comprehensive coverage of all environmental and climate change aspects affecting Kano State.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {departments.map((department, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-kano-primary to-kano-secondary rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {department.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-kano-primary transition-colors duration-300">
                          {department.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {department.description}
                        </p>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-kano-primary mb-2 uppercase tracking-wide">Key Functions</h4>
                          <ul className="space-y-1">
                            {department.functions.map((func, funcIndex) => (
                              <li key={funcIndex} className="flex items-center text-sm text-gray-600">
                                <ChevronRight className="h-4 w-4 text-kano-primary mr-2 flex-shrink-0" />
                                {func}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call-to-Action to Departments Page */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-kano-primary/5 to-kano-secondary/5 rounded-2xl p-8 border border-kano-primary/10">
                <h3 className="text-2xl font-bold text-kano-primary mb-4">Explore Detailed Department Information</h3>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Get comprehensive details about each department's mandate, functions, programs, and contact information.
                </p>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-kano-primary to-kano-secondary hover:from-kano-primary/90 hover:to-kano-secondary/90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link to="/departments" className="flex items-center gap-2">
                    View All Departments
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Pollution Control Laboratory Section */}
            <div className="mt-16">
              <Card className="bg-gradient-to-r from-kano-primary/5 to-kano-secondary/5 border-2 border-kano-primary/10 rounded-2xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                        <FlaskConical className="h-10 w-10" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Pollution Control Laboratory</h3>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Our state-of-the-art laboratory facility conducts comprehensive environmental testing and analysis, 
                        providing scientific data to support evidence-based policy decisions and regulatory enforcement.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-kano-primary mb-3">Laboratory Services</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center text-gray-600">
                              <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                              Water Quality Testing
                            </li>
                            <li className="flex items-center text-gray-600">
                              <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                              Air Pollution Monitoring
                            </li>
                            <li className="flex items-center text-gray-600">
                              <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                              Soil Contamination Analysis
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-kano-primary mb-3">Technical Capabilities</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center text-gray-600">
                              <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                              Environmental Impact Assessment
                            </li>
                            <li className="flex items-center text-gray-600">
                              <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                              Industrial Emissions Testing
                            </li>
                            <li className="flex items-center text-gray-600">
                              <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                              Research & Development
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Core Values Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center text-kano-primary mb-16">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-red-600 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Shield className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Integrity</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We uphold the highest ethical standards in all our operations and interactions with stakeholders.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-kano-primary group hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-kano-primary to-kano-secondary rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Professionalism</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We maintain the highest standards of competence and efficiency in delivering our mandate.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-green-600 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Community-Focused</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We place the needs and well-being of Kano State communities at the center of our policies and actions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
