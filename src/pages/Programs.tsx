
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Award, Microscope, Leaf, Calendar, User, ArrowRight, Recycle, TreePine, FileText, Wind, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Programs = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping
  const iconMap = {
    Award,
    Microscope,
    Leaf,
    Recycle,
    TreePine,
    FileText,
    Wind,
    Users
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('status', 'active')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        badge: 'bg-kano-primary text-white',
        border: 'border-kano-primary/20',
        text: 'text-kano-primary',
        button: 'border-kano-primary text-kano-primary hover:bg-kano-primary'
      },
      blue: {
        badge: 'bg-blue-600 text-white',
        border: 'border-blue-600/20',
        text: 'text-blue-600',
        button: 'border-blue-600 text-blue-600 hover:bg-blue-600'
      },
      red: {
        badge: 'bg-red-600 text-white',
        border: 'border-red-600/20',
        text: 'text-red-600',
        button: 'border-red-600 text-red-600 hover:bg-red-600'
      },
      purple: {
        badge: 'bg-purple-600 text-white',
        border: 'border-purple-600/20',
        text: 'text-purple-600',
        button: 'border-purple-600 text-purple-600 hover:bg-purple-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-xl">Loading programs...</div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Recent Programs</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Stay updated with our latest environmental programs and initiatives transforming Kano State's environmental landscape.
            </p>
          </div>
        </section>
        
        {/* Programs Blog Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-kano-primary mb-4">Latest Program Updates</h2>
                <p className="text-gray-600 text-lg">
                  Discover our most recent environmental initiatives and their impact on Kano State.
                </p>
              </div>
              
              <div className="space-y-8">
                {programs.map((program) => {
                  const colorClasses = getColorClasses(program.color);
                  const IconComponent = iconMap[program.icon_name as keyof typeof iconMap] || FileText;
                  
                  return (
                    <Card key={program.id} className={`overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 ${colorClasses.border}`}>
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="h-64 md:h-full overflow-hidden relative">
                            <img 
                              src={program.image_url} 
                              alt={program.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                              <div className={`${colorClasses.badge} px-3 py-1 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm`}>
                                <IconComponent size={16} />
                                <span className="text-sm font-medium">{program.category}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{new Date(program.created_at).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User size={16} />
                                <span>Environment Ministry</span>
                              </div>
                            </div>
                            
                            <h3 className={`text-2xl font-bold ${colorClasses.text} mb-3 group-hover:underline transition-all duration-300`}>
                              {program.title}
                            </h3>
                            
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {program.excerpt}
                            </p>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Button 
                              asChild
                              variant="outline"
                              className={`${colorClasses.button} hover:text-white transition-all duration-300 group`}
                            >
                              <Link to={program.link_path}>
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              <div className="text-center mt-12">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-kano-primary to-kano-secondary hover:from-kano-secondary hover:to-kano-primary text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <Link to="/contact">
                    Get Program Updates
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Programs;
