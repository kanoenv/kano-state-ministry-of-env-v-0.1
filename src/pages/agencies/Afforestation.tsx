
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreePine, Leaf, Users, Target } from 'lucide-react';

const Afforestation = () => {
  const achievements = [
    {
      title: "Trees Planted",
      value: "2.5M+",
      description: "Across Kano State in 2024",
      icon: <TreePine className="w-8 h-8" />
    },
    {
      title: "Land Restored",
      value: "15,000",
      description: "Hectares of degraded land",
      icon: <Leaf className="w-8 h-8" />
    },
    {
      title: "Communities",
      value: "250+",
      description: "Participating communities",
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Survival Rate",
      value: "85%",
      description: "Tree survival success rate",
      icon: <Target className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]"
          style={{
            backgroundImage: "url('/lovable-uploads/e2810cb9-3811-469c-bc94-431d9f82e1df.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Afforestation Program</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Transforming Kano State through massive tree planting initiatives, restoring degraded lands, and building climate resilience.
            </p>
          </div>
        </section>
        
        {/* Program Overview */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold text-kano-primary mb-6">Program Overview</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Kano State Afforestation Program is one of the most ambitious environmental restoration initiatives in Northern Nigeria. Launched to combat desertification, improve air quality, and restore biodiversity.
                </p>
                <p className="text-lg text-gray-700">
                  Our comprehensive approach includes community engagement, scientific species selection, and long-term maintenance to ensure sustainable forest development across the state.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <div className="text-kano-primary mb-4 flex justify-center">
                        {achievement.icon}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                      <div className="text-lg font-semibold text-kano-primary mb-1">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Key Initiatives */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="w-6 h-6 text-green-600" />
                    Urban Forestry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Creating green corridors and urban forests within Kano metropolis to improve air quality and provide recreational spaces for residents.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-green-600" />
                    Rural Restoration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Restoring degraded farmlands and establishing community woodlots to support rural livelihoods and prevent further land degradation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    Community Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Empowering local communities through training, seedling distribution, and incentive programs to ensure sustainable forest management.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Impact Story */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-kano-primary mb-8">Transforming Communities</h2>
              <blockquote className="text-xl text-gray-700 italic mb-6">
                "The afforestation program has brought new life to our community. We now have cleaner air, better soil, and new sources of income from non-timber forest products."
              </blockquote>
              <cite className="text-lg font-semibold text-kano-primary">- Mallam Ibrahim, Community Leader, Bichi LGA</cite>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Afforestation;
