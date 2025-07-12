
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Beaker, MapPin, TrendingUp } from 'lucide-react';

const WaterQuality = () => {
  const waterSources = [
    {
      name: "Kano River",
      location: "Central Kano",
      ph: 7.2,
      dissolved_oxygen: 6.8,
      turbidity: 15,
      status: "Good",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      name: "Challawa River",
      location: "Industrial Zone",
      ph: 6.8,
      dissolved_oxygen: 5.2,
      turbidity: 28,
      status: "Moderate",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      name: "Hadejia River",
      location: "Northern Kano",
      ph: 7.5,
      dissolved_oxygen: 7.1,
      turbidity: 12,
      status: "Excellent",
      color: "text-green-600",
      bgColor: "bg-green-100"
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
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Water Quality Monitoring</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Comprehensive water quality assessment and monitoring of rivers, lakes, and water bodies across Kano State.
            </p>
          </div>
        </section>
        
        {/* Water Quality Data */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Water Source Quality Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {waterSources.map((source, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{source.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {source.location}
                        </CardDescription>
                      </div>
                      <div className={`p-2 rounded-full ${source.bgColor}`}>
                        <Droplets className={`w-6 h-6 ${source.color}`} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className={`text-center p-3 rounded-lg ${source.bgColor}`}>
                        <div className={`font-bold text-lg ${source.color}`}>{source.status}</div>
                        <div className="text-sm text-gray-600">Overall Quality</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">pH Level:</span>
                          <span className="font-semibold">{source.ph}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dissolved Oxygen:</span>
                          <span className="font-semibold">{source.dissolved_oxygen} mg/L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Turbidity:</span>
                          <span className="font-semibold">{source.turbidity} NTU</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Water Quality Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5" />
                  Water Quality Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-bold text-blue-700 mb-2">pH Level</h3>
                    <p className="text-sm text-gray-600">Optimal: 6.5 - 8.5</p>
                    <p className="text-xs text-gray-500">Measures acidity/alkalinity</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-bold text-green-700 mb-2">Dissolved Oxygen</h3>
                    <p className="text-sm text-gray-600">Minimum: 5.0 mg/L</p>
                    <p className="text-xs text-gray-500">Essential for aquatic life</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-bold text-yellow-700 mb-2">Turbidity</h3>
                    <p className="text-sm text-gray-600">Standard: &lt; 25 NTU</p>
                    <p className="text-xs text-gray-500">Water clarity measure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaterQuality;
