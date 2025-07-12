
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Award, TreePine, Sun, ArrowRight, Building, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgenciesOverview = () => {
  const agencyCategories = [
    {
      title: "Waste Management Solutions",
      description: "Comprehensive waste collection, treatment, and disposal systems to maintain cleanliness and environmental health across Kano State.",
      icon: <Award size={32} />,
      link: "/agencies/waste-management",
      color: "blue",
      stats: "500+ Tons Daily",
      image: "/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png"
    },
    {
      title: "Afforestation & Tree Planting",
      description: "Large-scale tree planting initiatives and forest restoration programs to combat desertification and improve biodiversity.",
      icon: <TreePine size={32} />,
      link: "/agencies/afforestation",
      color: "green",
      stats: "2.5M+ Trees Planted",
      image: "/lovable-uploads/e2810cb9-3811-469c-bc94-431d9f82e1df.png"
    },
    {
      title: "Renewable Energy Development",
      description: "Solar, wind, and other renewable energy projects to provide clean, sustainable power across urban and rural communities.",
      icon: <Sun size={32} />,
      link: "/agencies/renewable-energy",
      color: "yellow",
      stats: "100 MW Capacity",
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
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        button: 'border-yellow-600 text-yellow-600 hover:bg-yellow-600'
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
            backgroundImage: "url('/lovable-uploads/93846bf9-aece-4716-ad44-62e1c7a6cb4b.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Agencies & Projects</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Comprehensive environmental programs and projects designed to protect our natural resources, improve public health, and build a sustainable future for Kano State.
            </p>
          </div>
        </section>
        
        {/* Agency Categories */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-6">Our Key Projects</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transforming Kano State through innovative environmental solutions, sustainable development, and community-centered initiatives.
              </p>
            </div>

            <div className="space-y-16">
              {agencyCategories.map((category, index) => {
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
                            <Building className={`w-5 h-5 ${colorClasses.text}`} />
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
                            Explore Project
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-kano-primary to-kano-secondary hover:from-kano-secondary hover:to-kano-primary text-white px-12 py-4 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-kano-primary/25 transition-all duration-500 transform hover:translate-y-[-3px] group"
              >
                <Link to="/agencies">
                  View All Agencies
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgenciesOverview;
