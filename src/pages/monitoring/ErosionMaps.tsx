
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, AlertTriangle, TrendingDown, MapPin } from 'lucide-react';

const ErosionMaps = () => {
  const erosionSites = [
    {
      location: "Challawa Gorge",
      riskLevel: "High",
      area: "2.5 km²",
      severity: "Active erosion",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      location: "Kano River Bank",
      riskLevel: "Medium",
      area: "1.8 km²",
      severity: "Moderate erosion",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      location: "Northern Plateau",
      riskLevel: "Low",
      area: "0.8 km²",
      severity: "Minimal erosion",
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
            backgroundImage: "url('/lovable-uploads/0a733cce-62b5-4251-a9fb-4d7d1fb9845a.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Erosion Risk Maps</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Interactive mapping and monitoring of erosion-prone areas across Kano State for prevention and mitigation.
            </p>
          </div>
        </section>
        
        {/* Erosion Monitoring */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Erosion Risk Assessment</h2>
            
            {/* Interactive Map Placeholder */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Interactive Erosion Risk Map
                </CardTitle>
                <CardDescription>
                  Click on markers to view detailed erosion data for specific locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive map will be loaded here</p>
                    <p className="text-sm text-gray-500">Showing erosion risk zones across Kano State</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Erosion Sites */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {erosionSites.map((site, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{site.location}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Affected Area: {site.area}
                        </CardDescription>
                      </div>
                      <div className={`p-2 rounded-full ${site.bgColor}`}>
                        <AlertTriangle className={`w-6 h-6 ${site.color}`} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className={`text-center p-3 rounded-lg ${site.bgColor}`}>
                        <div className={`font-bold text-lg ${site.color}`}>{site.riskLevel} Risk</div>
                        <div className="text-sm text-gray-600">{site.severity}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Regular monitoring and assessment ongoing. Mitigation measures being implemented based on risk level.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Risk Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Erosion Risk Classification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <h3 className="font-bold text-red-700 mb-2">High Risk</h3>
                    <p className="text-sm text-gray-600">Immediate intervention required</p>
                    <p className="text-xs text-gray-500">Active erosion with significant impact</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-bold text-yellow-700 mb-2">Medium Risk</h3>
                    <p className="text-sm text-gray-600">Monitoring and prevention measures</p>
                    <p className="text-xs text-gray-500">Potential for increased erosion</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-bold text-green-700 mb-2">Low Risk</h3>
                    <p className="text-sm text-gray-600">Routine monitoring sufficient</p>
                    <p className="text-xs text-gray-500">Stable conditions with minimal erosion</p>
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

export default ErosionMaps;
