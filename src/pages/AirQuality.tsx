
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Gauge, Wind, AlertTriangle, CheckCircle, MapPin, Calendar, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type AirQualityData = {
  id: string;
  location: string;
  aqi: number;
  status: string;
  updated_at: string;
  pm25?: number;
  pm10?: number;
  co?: number;
  no2?: number;
  so2?: number;
  o3?: number;
};

const AirQuality = () => {
  const [airQualityData, setAirQualityData] = useState<AirQualityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAirQualityData();
  }, []);

  const fetchAirQualityData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('air_quality')
        .select('*')
        .eq('status', 'Active')
        .order('aqi', { ascending: false });

      if (error) throw error;
      setAirQualityData(data || []);
    } catch (error) {
      console.error('Error fetching air quality data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAqiCategory = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle };
    if (aqi <= 100) return { label: "Moderate", color: "text-yellow-600", bgColor: "bg-yellow-100", icon: AlertTriangle };
    if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "text-orange-600", bgColor: "bg-orange-100", icon: AlertTriangle };
    if (aqi <= 200) return { label: "Unhealthy", color: "text-red-600", bgColor: "bg-red-100", icon: AlertTriangle };
    if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-600", bgColor: "bg-purple-100", icon: AlertTriangle };
    return { label: "Hazardous", color: "text-rose-600", bgColor: "bg-rose-100", icon: AlertTriangle };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px]"
          style={{
            backgroundImage: "url('/lovable-uploads/0bd074e2-0e0d-43eb-abcd-b6d4643c7016.png')",
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
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-kano-primary mb-4"></div>
                  <p className="text-gray-500">Loading air quality data...</p>
                </div>
              </div>
            ) : airQualityData.length === 0 ? (
              <div className="text-center py-12">
                <Wind className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Air Quality Data Available</h3>
                <p className="text-gray-500">Monitoring stations will appear here when data is available from the admin panel.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {airQualityData.map((data) => {
                    const category = getAqiCategory(data.aqi);
                    const IconComponent = category.icon;
                    
                    return (
                      <Card key={data.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-kano-primary" />
                              {data.location}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${category.bgColor}`}>
                              <IconComponent className={`w-6 h-6 ${category.color}`} />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-gray-900">{data.aqi}</div>
                              <Badge className={`${category.bgColor} ${category.color} border-0`}>
                                AQI - {category.label}
                              </Badge>
                            </div>
                            
                            {/* Pollutant Details */}
                            {(data.pm25 || data.pm10 || data.co || data.no2 || data.so2 || data.o3) && (
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {data.pm25 && (
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">PM2.5:</span>
                                    <span className="font-semibold ml-1">{data.pm25} μg/m³</span>
                                  </div>
                                )}
                                {data.pm10 && (
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">PM10:</span>
                                    <span className="font-semibold ml-1">{data.pm10} μg/m³</span>
                                  </div>
                                )}
                                {data.co && (
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">CO:</span>
                                    <span className="font-semibold ml-1">{data.co} ppm</span>
                                  </div>
                                )}
                                {data.no2 && (
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">NO2:</span>
                                    <span className="font-semibold ml-1">{data.no2} ppb</span>
                                  </div>
                                )}
                                {data.so2 && (
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">SO2:</span>
                                    <span className="font-semibold ml-1">{data.so2} ppb</span>
                                  </div>
                                )}
                                {data.o3 && (
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">O3:</span>
                                    <span className="font-semibold ml-1">{data.o3} ppb</span>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(data.updated_at).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                {data.status}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
            
            {/* AQI Scale */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Air Quality Index Scale
                </CardTitle>
                <CardDescription>
                  Understanding AQI levels and their health implications
                </CardDescription>
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
