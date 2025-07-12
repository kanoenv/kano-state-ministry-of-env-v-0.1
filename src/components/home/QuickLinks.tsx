
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreePine, FileText, Users, AlertTriangle, BarChart3, Droplets, ArrowRight, Shield, Building2, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
  const quickActions = [
    {
      title: "Environmental Intelligence",
      description: "Advanced environmental monitoring and reporting platform with real-time analytics and predictive insights for sustainable development.",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 via-red-25 to-white",
      borderColor: "border-red-200/30",
      buttonColor: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
      href: "/report-issue",
      badge: "Critical"
    },
    {
      title: "Forest Conservation Initiative",
      description: "Comprehensive reforestation program with advanced tracking systems and community engagement for the Five Million Trees Campaign 2025.",
      icon: TreePine,
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 via-emerald-25 to-white",
      borderColor: "border-emerald-200/30",
      buttonColor: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800",
      href: "/programs/five-million-trees",
      badge: "Active"
    },
    {
      title: "Climate Resilience Hub",
      description: "Integrated climate adaptation strategies with community-based solutions and cutting-edge environmental technology platforms.",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-25 to-white",
      borderColor: "border-blue-200/30",
      buttonColor: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      href: "/get-involved",
      badge: "Innovation"
    },
    {
      title: "Environmental Analytics",
      description: "Comprehensive data intelligence platform with machine learning insights, environmental impact assessments, and performance monitoring.",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-25 to-white",
      borderColor: "border-purple-200/30",
      buttonColor: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
      href: "/monitoring",
      badge: "Analytics"
    },
    {
      title: "Air Quality Excellence",
      description: "State-of-the-art air quality monitoring network with IoT sensors, health impact analysis, and real-time public alerts system.",
      icon: Droplets,
      color: "text-cyan-600",
      bgColor: "bg-gradient-to-br from-cyan-50 via-cyan-25 to-white",
      borderColor: "border-cyan-200/30",
      buttonColor: "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800",
      href: "/monitoring/air-quality",
      badge: "Health"
    },
    {
      title: "Regulatory Excellence",
      description: "Comprehensive regulatory framework with digital compliance tools, environmental standards, and policy implementation guidelines.",
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-gradient-to-br from-indigo-50 via-indigo-25 to-white",
      borderColor: "border-indigo-200/30",
      buttonColor: "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800",
      href: "/resources",
      badge: "Policy"
    }
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.015]"></div>
        <div className="absolute top-10 left-1/4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-gradient-to-br from-emerald-500/6 to-blue-500/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-gradient-to-br from-purple-500/4 to-pink-500/4 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] md:w-[400px] md:h-[200px] bg-gradient-to-r from-blue-500/2 to-emerald-500/2 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header Section - Optimized for Desktop/Tablet */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-lg border border-emerald-200/50 text-emerald-700 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Advanced Digital Environmental Solutions</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight px-4 max-w-4xl mx-auto">
            Kano State: Pioneering Climate Governance and Environmental Sustainability in Nigeria
          </h2>
          
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-4 md:mb-6 px-4">
            Kano State is setting the pace in Nigeria with bold and strategic leadership in climate governance and environmental sustainability. Through innovative policies, community engagement, and a commitment to a greener future, the state is driving impactful change protecting natural resources, promoting renewable energy, and ensuring a healthy environment for generations to come.
          </p>
          
          {/* Statistics Bar - Optimized for Desktop/Tablet */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 mt-6 md:mt-8 px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-lg border border-gray-200/50">
              <div className="text-base md:text-lg lg:text-xl font-black text-emerald-600 mb-1">500K+</div>
              <div className="text-gray-600 font-medium text-xs md:text-sm">Trees Planted</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-lg border border-gray-200/50">
              <div className="text-base md:text-lg lg:text-xl font-black text-blue-600 mb-1">250+</div>
              <div className="text-gray-600 font-medium text-xs md:text-sm">Communities</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-lg border border-gray-200/50">
              <div className="text-base md:text-lg lg:text-xl font-black text-purple-600 mb-1">24/7</div>
              <div className="text-gray-600 font-medium text-xs md:text-sm">Monitoring</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card 
                key={index} 
                className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${action.bgColor} backdrop-blur-sm hover:scale-[1.01]`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'fade-in 0.8s ease-out forwards'
                }}
              >
                {/* Visual Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${action.buttonColor.replace('bg-gradient-to-r', '').replace('hover:from-', '').split(' ')[0]} ${action.buttonColor.replace('bg-gradient-to-r', '').replace('hover:from-', '').split(' ')[1]}`}></div>
                
                <CardContent className="p-4 md:p-5 lg:p-6 relative">
                  <div className="flex flex-col items-start text-left">
                    {/* Professional Icon Container - Responsive sizing with larger desktop icons */}
                    <div className="relative mb-3 md:mb-4">
                      <div className={`relative p-2 md:p-3 lg:p-4 rounded-xl ${action.bgColor} border-2 ${action.borderColor} group-hover:scale-105 transition-all duration-400 shadow-lg`}>
                        <IconComponent className={`w-4 h-4 md:w-5 md:h-5 lg:w-16 lg:h-16 ${action.color}`} strokeWidth={1.5} />
                        <div className={`absolute inset-0 rounded-xl ${action.color.replace('text-', 'bg-')}/8 group-hover:${action.color.replace('text-', 'bg-')}/15 transition-colors duration-400`}></div>
                      </div>
                      {/* Refined Badge */}
                      <div className={`absolute -top-1 -right-1 px-2 py-0.5 ${action.buttonColor.split(' ')[0]} text-white text-xs font-bold rounded-full shadow-md`}>
                        {action.badge}
                      </div>
                    </div>
                    
                    {/* Professional Content - Smaller text for Desktop/Tablet */}
                    <h3 className="font-black text-base md:text-lg lg:text-xl text-gray-900 mb-2 md:mb-3 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                      {action.title}
                    </h3>
                    <p className="text-gray-700 text-xs md:text-sm mb-4 md:mb-5 leading-relaxed line-clamp-3 font-medium">
                      {action.description}
                    </p>
                    
                    {/* Professional CTA Button - Smaller for Desktop/Tablet */}
                    <Button 
                      asChild
                      className={`w-full font-bold text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 rounded-lg transition-all duration-400 ${action.buttonColor} text-white border-0 shadow-lg hover:shadow-xl group/btn overflow-hidden relative`}
                    >
                      <Link to={action.href} className="flex items-center justify-center gap-2 relative z-10">
                        <span>Access Platform</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2} />
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Professional Bottom Section - Smaller for Desktop/Tablet */}
        <div className="text-center mt-10 md:mt-12 lg:mt-16">
          <div className="inline-flex items-center gap-3 md:gap-4 text-gray-500 text-sm md:text-base font-medium">
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="px-4 md:px-6 py-2 md:py-3 bg-white/70 backdrop-blur-lg rounded-full border border-gray-200/50 shadow-lg">
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent font-bold text-xs md:text-sm">
                Empowering Kano State's Environmental Excellence
              </span>
            </div>
            <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>
      
      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #00000008 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default QuickLinks;
