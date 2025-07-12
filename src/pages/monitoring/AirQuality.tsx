
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Wind, AlertTriangle, CheckCircle } from 'lucide-react';

const AirQuality = () => {
  const airQualityData = [
    {
      location: "Kano City Center",
      aqi: 85,
      status: "Moderate",
      pm25: 35,
      pm10: 65,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      location: "Industrial Area",
      aqi: 120,
      status: "Unhealthy for Sensitive Groups",
      pm25: 55,
      pm10: 95,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      location: "Residential Zone",
      aqi: 65,
      status: "Good",
      pm25: 25,
      pm10: 45,
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
            backgroundImage: "url('/lovable-uploads/326de5bf-11c7-4839-928c-1aeb3fb9ab3d.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Air Quality Monitoring</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Real-time air quality data and monitoring across Kano State to protect public health and environment.
            </p>
          </div>
        </section>
        
        {/* Air Quality Data */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-kano-primary mb-12 text-center">Current Air Quality Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {airQualityData.map((data, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{data.location}</CardTitle>
                      <div className={`p-2 rounded-full ${data.bgColor}`}>
                        <Gauge className={`w-6 h-6 ${data.color}`} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{data.aqi}</div>
                        <div className={`text-sm font-medium ${data.color}`}>AQI - {data.status}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">PM2.5:</span>
                          <span className="font-semibold ml-2">{data.pm25} μg/m³</span>
                        </div>
                        <div>
                          <span className="text-gray-600">PM10:</span>
                          <span className="font-semibold ml-2">{data.pm10} μg/m³</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* AQI Scale */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Air Quality Index Scale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="font-bold text-green-700">0-50</div>
                    <div className="text-sm text-green-600">Good</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <div className="font-bold text-yellow-700">51-100</div>
                    <div className="text-sm text-yellow-600">Moderate</div>
                  </div>
                  <div className="text-center p-4 bg-orange-100 rounded-lg">
                    <div className="font-bold text-orange-700">101-150</div>
                    <div className="text-sm text-orange-600">Unhealthy for Sensitive</div>
                  </div>
                  <div className="text-center p-4 bg-red-100 rounded-lg">
                    <div className="font-bold text-red-700">151-200</div>
                    <div className="text-sm text-red-600">Unhealthy</div>
                  </div>
                  <div className="text-center p-4 bg-purple-100 rounded-lg">
                    <div className="font-bold text-purple-700">201-300</div>
                    <div className="text-sm text-purple-600">Very Unhealthy</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="font-bold text-white">301+</div>
                    <div className="text-sm text-gray-300">Hazardous</div>
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

export default AirQuality;
