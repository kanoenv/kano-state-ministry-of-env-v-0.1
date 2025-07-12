
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Target, TreePine, Leaf, Award, ArrowRight, Eye, Users2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const UrbanGreening = () => {
  const objectiveCards = [
    {
      icon: TreePine,
      title: "Reduce Urban Heat & Air Pollution",
      description: "Increasing green cover throughout the city to mitigate environmental challenges and improve air quality.",
      color: "green"
    },
    {
      icon: Eye,
      title: "Enhance Aesthetic Appeal",
      description: "Beautifying Kano's urban areas through strategic landscaping and greenery placement.",
      color: "blue"
    },
    {
      icon: Leaf,
      title: "Promote Biodiversity",
      description: "Creating ecological balance within the city through diverse plant species and habitats.",
      color: "purple"
    },
    {
      icon: Users2,
      title: "Foster Community Participation",
      description: "Engaging residents in environmental conservation efforts and sustainable practices.",
      color: "orange"
    }
  ];

  const progressImages = [
    {
      image: "/lovable-uploads/6f0759d7-9729-41e7-933a-11571dec4b3d.png",
      title: "Tree-Lined Streets Initiative",
      description: "Strategic placement of trees along major roads creating natural corridors"
    },
    {
      image: "/lovable-uploads/bb1adb22-4fb2-4fa1-9519-bc3b41a7cf0f.png",
      title: "Urban Beautification Project",
      description: "Installing organized planters and green spaces in commercial areas"
    },
    {
      image: "/lovable-uploads/5f7f9866-dd8b-4c25-b33e-a1f608d2b042.png",
      title: "Sustainable Urban Development",
      description: "Comprehensive greening of city centers and major intersections"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        badge: 'bg-green-600 text-white',
        border: 'border-green-600/20',
        bg: 'bg-green-50',
        text: 'text-green-600'
      },
      blue: {
        badge: 'bg-blue-600 text-white',
        border: 'border-blue-600/20',
        bg: 'bg-blue-50',
        text: 'text-blue-600'
      },
      purple: {
        badge: 'bg-purple-600 text-white',
        border: 'border-purple-600/20',
        bg: 'bg-purple-50',
        text: 'text-purple-600'
      },
      orange: {
        badge: 'bg-orange-600 text-white',
        border: 'border-orange-600/20',
        bg: 'bg-orange-50',
        text: 'text-orange-600'
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
            backgroundImage: "url('/lovable-uploads/e682412b-e198-465f-a9f3-ed4e20c558a2.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container-custom relative h-full flex flex-col justify-center">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 w-fit mb-4"
              asChild
            >
              <Link to="/programs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Programs
              </Link>
            </Button>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Urban Greening and Beautification Initiative
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              A key component of Kano State's broader Urban Renewal Project, enhancing the urban landscape through extensive tree-planting campaigns.
            </p>
          </div>
        </section>

        {/* Program Objectives Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-kano-primary/10 px-6 py-3 rounded-full mb-6">
                <TreePine className="w-5 h-5 text-kano-primary" />
                <span className="text-kano-primary font-semibold">Program Objectives</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-6">Transforming Kano's Urban Landscape</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our comprehensive approach to urban greening focuses on environmental sustainability, aesthetic enhancement, and community engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {objectiveCards.map((objective, index) => {
                const colorClasses = getColorClasses(objective.color);
                const IconComponent = objective.icon;
                
                return (
                  <div key={index} className={`${colorClasses.bg} p-8 rounded-2xl border-2 ${colorClasses.border} hover:shadow-lg transition-all duration-300`}>
                    <div className={`${colorClasses.badge} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className={`text-xl font-bold ${colorClasses.text} mb-4`}>
                      {objective.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Transformation Showcase Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-6">Urban Transformation Achieved</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Witness the remarkable transformation of Kano's major thoroughfares through our comprehensive greening initiatives.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center justify-center">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-lg mr-4">AFTER</span>
                  Comprehensive Urban Greening
                </h3>
                <img 
                  src="/lovable-uploads/e682412b-e198-465f-a9f3-ed4e20c558a2.png" 
                  alt="Lodge Road Transformation - Comprehensive Urban Greening"
                  className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                />
                <p className="text-green-700 text-lg">
                  From bare medians to beautifully landscaped thoroughfares with palm trees and organized planters - a complete transformation of Lodge Road showcasing modern urban greening excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Gallery Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-kano-primary mb-6">Implementation Progress</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Showcasing the ongoing transformation across Kano's major roads and public spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {progressImages.map((item, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-kano-primary mb-6">Program Overview</h2>
                  
                  <p className="text-gray-700 mb-6">
                    The Urban Greening and Beautification Initiative is a key component of Kano State's broader Urban Renewal Project, spearheaded by the Ministry of Environment and Climate Change. This comprehensive program focuses on enhancing the urban landscape through extensive tree-planting campaigns along major roads and public spaces, aiming to mitigate environmental challenges and improve the quality of life for residents.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Recent Developments</h3>
                  
                  <p className="text-gray-700 mb-6">
                    The initiative commenced with tree-planting activities along Lodge Road and Race Course, marking the beginning of a city-wide campaign to green all major thoroughfares. These efforts are part of the state's commitment to sustainable urban development and environmental stewardship, transforming Kano into a model green city.
                  </p>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Community Engagement</h3>
                  
                  <p className="text-gray-700 mb-4">
                    The success of the Urban Greening and Beautification Initiative relies heavily on active community involvement. The Ministry recognizes that sustainable urban greening requires the participation and commitment of all residents.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2">Community Responsibilities</h4>
                      <ul className="list-disc pl-6 text-blue-700 space-y-2">
                        <li>Refrain from releasing livestock in urban areas to protect planted vegetation</li>
                        <li>Report any acts of vandalism or destruction of public greenery to the authorities</li>
                        <li>Participate in tree-planting and maintenance activities organized by the Ministry</li>
                        <li>Support local green initiatives and environmental conservation efforts</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-kano-dark mb-4">Environmental Impact</h3>
                  
                  <p className="text-gray-700 mb-6">
                    This initiative represents a significant step toward creating a more sustainable and livable urban environment. By strategically placing trees and green infrastructure along major roads, the program addresses multiple environmental challenges while enhancing the city's aesthetic appeal and promoting community well-being.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                      <TreePine className="w-8 h-8 text-green-600 mb-3" />
                      <h4 className="font-semibold text-green-800 mb-2">Air Quality Improvement</h4>
                      <p className="text-green-700 text-sm">
                        Trees naturally filter air pollutants and produce oxygen, significantly improving urban air quality.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                      <Eye className="w-8 h-8 text-blue-600 mb-3" />
                      <h4 className="font-semibold text-blue-800 mb-2">Urban Heat Reduction</h4>
                      <p className="text-blue-700 text-sm">
                        Strategic tree placement provides natural cooling, reducing urban heat island effects.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                      <Leaf className="w-8 h-8 text-purple-600 mb-3" />
                      <h4 className="font-semibold text-purple-800 mb-2">Biodiversity Enhancement</h4>
                      <p className="text-purple-700 text-sm">
                        Creating habitats for urban wildlife and promoting ecological balance within the city.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                      <Users2 className="w-8 h-8 text-orange-600 mb-3" />
                      <h4 className="font-semibold text-orange-800 mb-2">Community Well-being</h4>
                      <p className="text-orange-700 text-sm">
                        Green spaces promote mental health, social interaction, and overall quality of life.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Program Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Launch Phase</p>
                        <p className="text-gray-600">Ongoing Initiative</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Current Focus</p>
                        <p className="text-gray-600">Lodge Road & Race Course</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Implementing Agency</p>
                        <p className="text-gray-600">Ministry of Environment</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Target className="text-kano-primary mr-3" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Scope</p>
                        <p className="text-gray-600">City-wide Campaign</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-kano-primary to-kano-secondary text-white p-6 rounded-lg shadow-lg mb-8">
                  <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
                  <p className="mb-4 text-sm">
                    Join our community efforts to green Kano State and participate in upcoming tree-planting activities.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-kano-primary hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/contact">
                      Contact Ministry
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Impact Stats */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-kano-dark mb-4">Expected Impact</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kano-primary">5°C</div>
                      <div className="text-sm text-gray-600">Temperature Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kano-primary">30%</div>
                      <div className="text-sm text-gray-600">Air Quality Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kano-primary">100+</div>
                      <div className="text-sm text-gray-600">Species Supported</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UrbanGreening;
