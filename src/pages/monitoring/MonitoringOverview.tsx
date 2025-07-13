
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Gauge, Droplets, Map, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const MonitoringOverview = () => {
  const monitoringCategories = [
    {
      title: "Air Quality Monitoring",
      description: "Real-time monitoring of air pollution levels, particulate matter, and atmospheric conditions across multiple locations in Kano State.",
      icon: <Gauge size={32} />,
      link: "/monitoring/air-quality",
      color: "blue",
      stats: "12 Active Stations",
      image: "/lovable-uploads/326de5bf-11c7-4839-928c-1aeb3fb9ab3d.png"
    },
    {
      title: "Water Quality Assessment",
      description: "Comprehensive monitoring of water bodies including rivers, lakes, and groundwater sources for chemical and biological parameters.",
      icon: <Droplets size={32} />,
      link: "/monitoring/water-quality",
      color: "green",
      stats: "25 Water Sources",
      image: "/lovable-uploads/93846bf9-aece-4716-ad44-62e1c7a6cb4b.png"
    },
    {
      title: "Erosion Risk Mapping",
      description: "Advanced satellite and ground-based monitoring of erosion-prone areas with predictive mapping and risk assessment.",
      icon: <Map size={32} />,
      link: "/monitoring/erosion-maps",
      color: "red",
      stats: "150 km² Monitored",
      image: "/lovable-uploads/0a733cce-62b5-4251-a9fb-4d7d1fb9845a.png"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        button: 'border-blue-600 text-blue-600 hover:bg-blue-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        button: 'border-green-600 text-green-600 hover:bg-green-600'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-600',
        button: 'border-red-600 text-red-600 hover:bg-red-600'
      }
    };
    return colors[color as keyof typeof colors];
  };

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
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Live Data & Monitoring</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Real-time environmental monitoring and data collection across Kano State to support evidence-based decision making and environmental protection.
            </p>
          </div>
        </section>
        
        {/* Monitoring Categories */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-6">Monitoring Systems</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive monitoring network provides real-time data on environmental conditions to protect public health and natural resources.
              </p>
            </div>

            <div className="space-y-16">
              {monitoringCategories.map((category, index) => {
                const colorClasses = getColorClasses(category.color);
                
                return (
                  <div 
                    key={category.title}
                    className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center group`}
                  >
                    <div className="w-full md:w-1/2">
                      <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                        <img 
                          src={category.image} 
                          alt={category.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-6 left-6">
                          <div className={`${colorClasses.bg} px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm`}>
                            <Activity className={`w-5 h-5 ${colorClasses.text}`} />
                            <span className={`font-semibold ${colorClasses.text}`}>{category.stats}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-6 right-6">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-300">
                            <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 space-y-6">
                      <div className="space-y-4">
                        <div className={`w-16 h-16 ${colorClasses.bg} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                          <div className={colorClasses.text}>
                            {category.icon}
                          </div>
                        </div>
                        <h3 className={`text-3xl md:text-4xl font-bold ${colorClasses.text} leading-tight`}>
                          {category.title}
                        </h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          asChild
                          className={`${colorClasses.button} hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] group`}
                          variant="outline"
                        >
                          <Link to={category.link}>
                            View Live Data
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MonitoringOverview;
