
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Building, TreeDeciduous, Shield, Leaf, Sprout, Droplets, Recycle, Wheat, Wind, MapPin, Globe, Factory, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';

const Agencies = () => {
  const keySectors = [
    {
      title: "Waste Management and Urban Cleanliness",
      icon: <Recycle size={20} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Sustainable Agriculture and Soil Health",
      icon: <Wheat size={20} />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Water Resource Management, Erosion and Flood Prevention",
      icon: <Droplets size={20} />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      title: "Sustainable Energy",
      icon: <Wind size={20} />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Urban Planning and Green Development",
      icon: <MapPin size={20} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Climate Resilience",
      icon: <Globe size={20} />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Pollution Control",
      icon: <Factory size={20} />,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Afforestation",
      icon: <TreePine size={20} />,
      color: "text-green-700",
      bgColor: "bg-green-100"
    }
  ];

  const agencies = [
    {
      title: "REMASAB",
      description: "Refuse Management and Sanitation Board (REMASAB) is a government agency responsible for waste management and sanitation in Kano State.",
      icon: <Building size={24} />,
      color: "bg-blue-600",
      image: "/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png",
      link: "/agencies/remasab"
    },
    {
      title: "ACRESAL",
      description: "Agro-Climatic Resilience in Semi-Arid Landscapes (ACRESAL) is a transformative program focused on building climate resilience and sustainable land management practices.",
      icon: <TreeDeciduous size={24} />,
      color: "bg-green-700",
      image: "/lovable-uploads/93846bf9-aece-4716-ad44-62e1c7a6cb4b.png",
      link: "https://kanoacresal.org",
      external: true
    },
    {
      title: "WECCMA",
      description: "Kano State Watershed, Erosion and Climate Change Management Agency (WECCMA) focuses on managing erosion risks, watershed protection, and implementing climate change adaptation strategies.",
      icon: <Shield size={24} />,
      color: "bg-purple-600",
      image: "/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png",
      link: "/agencies/weccma"
    },
    {
      title: "Sustainable Kano Project (SKP)",
      description: "A multi-sectoral initiative aimed at promoting sustainable urban growth, environmental conservation, and socio-economic resilience in Kano State.",
      icon: <Leaf size={24} />,
      color: "bg-emerald-600",
      image: "/lovable-uploads/d8ae522e-5423-4798-849c-d19bd4a9eed9.png",
      link: "/agencies/skp"
    },
    {
      title: "Kano State Afforestation Project (KNAP)",
      description: "Government-led programme dedicated to reforesting degraded lands, enhancing biodiversity, and mitigating climate change impacts through large-scale tree planting.",
      icon: <Sprout size={24} />,
      color: "bg-green-600",
      image: "/lovable-uploads/e2810cb9-3811-469c-bc94-431d9f82e1df.png",
      link: "/agencies/knap"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px]"
          style={{
            backgroundImage: "url('/lovable-uploads/93846bf9-aece-4716-ad44-62e1c7a6cb4b.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Our Agencies</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Discover the various agencies and initiatives implemented by our ministry to protect the environment and address climate change.
            </p>
          </div>
        </section>
        
        {/* Key Sectors Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-4">Key Sectors</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach to environmental protection and sustainable development spans across eight critical sectors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keySectors.map((sector, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group border-l-4 border-kano-primary"
                >
                  <div className={`w-12 h-12 ${sector.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={sector.color}>
                      {sector.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-kano-primary transition-colors duration-300">
                    {sector.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Programs Grid */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Key Agencies and Initiatives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agencies.map((agency, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-2 border-transparent hover:border-kano-primary/30">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={agency.image} 
                      alt={agency.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{agency.title}</h3>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-full ${agency.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                      <div className="text-white">
                        {agency.icon}
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-kano-primary transition-colors duration-300 text-xl font-bold">{agency.title}</CardTitle>
                    <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                      {agency.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full border-kano-primary text-kano-primary hover:bg-kano-primary hover:text-white transition-all duration-500 hover:shadow-lg transform hover:translate-y-[-2px] font-semibold"
                      asChild
                    >
                      {agency.external ? (
                        <a href={agency.link} target="_blank" rel="noopener noreferrer">Learn More</a>
                      ) : (
                        <Link to={agency.link}>Learn More</Link>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agencies;
