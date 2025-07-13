
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Wind, Zap, Home, Factory, Lightbulb } from 'lucide-react';

const RenewableEnergy = () => {
  const energyProjects = [
    {
      title: "Solar Power Initiative",
      description: "Installation of solar panels across government buildings and rural communities",
      capacity: "50 MW",
      beneficiaries: "25,000 households",
      icon: <Sun className="w-8 h-8" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Wind Energy Program",
      description: "Harnessing wind power in strategic locations across the state",
      capacity: "30 MW",
      beneficiaries: "15,000 households",
      icon: <Wind className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Mini-Grid Development",
      description: "Decentralized energy systems for remote communities",
      capacity: "20 MW",
      beneficiaries: "10,000 households",
      icon: <Zap className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const benefits = [
    {
      title: "Clean Energy Access",
      description: "Providing reliable, clean electricity to underserved communities",
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      title: "Economic Growth",
      description: "Creating jobs and supporting local businesses with affordable energy",
      icon: <Factory className="w-6 h-6" />
    },
    {
      title: "Rural Development",
      description: "Improving quality of life and opportunities in rural areas",
      icon: <Home className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]"
          style={{
            backgroundImage: "url('/lovable-uploads/0a733cce-62b5-4251-a9fb-4d7d1fb9845a.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Renewable Energy Program</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Powering Kano State's future with sustainable, clean energy solutions that reduce carbon emissions and promote economic development.
            </p>
          </div>
        </section>
        
        {/* Program Statistics */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-kano-primary mb-6">Renewable Energy Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-kano-primary mb-2">100 MW</div>
                  <div className="text-gray-600">Total Capacity</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-kano-primary mb-2">50,000+</div>
                  <div className="text-gray-600">Households Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-kano-primary mb-2">75%</div>
                  <div className="text-gray-600">CO₂ Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-kano-primary mb-2">500+</div>
                  <div className="text-gray-600">Jobs Created</div>
                </div>
              </div>
            </div>
            
            {/* Energy Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {energyProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <div className={`p-3 rounded-full ${project.bgColor}`}>
                        <div className={project.color}>
                          {project.icon}
                        </div>
                      </div>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-kano-primary">{project.capacity}</div>
                          <div className="text-sm text-gray-600">Capacity</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-kano-primary">{project.beneficiaries}</div>
                          <div className="text-sm text-gray-600">Beneficiaries</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-kano-primary/10 rounded-full">
                        <div className="text-kano-primary">
                          {benefit.icon}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Vision Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-kano-primary mb-8">Our Energy Vision</h2>
              <p className="text-xl text-gray-700 mb-6">
                By 2030, Kano State will be powered by 80% renewable energy, making us a leader in sustainable development across Nigeria and West Africa.
              </p>
              <p className="text-lg text-gray-700">
                Our renewable energy program is not just about generating clean power—it's about creating a sustainable future for our children, supporting local economic development, and positioning Kano State as a model for environmental stewardship.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RenewableEnergy;
