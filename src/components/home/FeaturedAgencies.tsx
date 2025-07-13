
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Microscope, Leaf, Recycle, TreePine, FileText, Wind, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const FeaturedAgencies = () => {
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
        .order('display_order', { ascending: true })
        .limit(4);

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
        title: 'text-kano-primary',
        button: 'border-kano-primary text-kano-primary hover:bg-kano-primary',
        gradient: 'from-kano-primary/20 to-transparent'
      },
      blue: {
        badge: 'bg-blue-600 text-white',
        title: 'text-blue-600',
        button: 'border-blue-600 text-blue-600 hover:bg-blue-600',
        gradient: 'from-blue-600/20 to-transparent'
      },
      red: {
        badge: 'bg-red-600 text-white',
        title: 'text-red-600',
        button: 'border-red-600 text-red-600 hover:bg-red-600',
        gradient: 'from-red-600/20 to-transparent'
      },
      purple: {
        badge: 'bg-purple-600 text-white',
        title: 'text-purple-600',
        button: 'border-purple-600 text-purple-600 hover:bg-purple-600',
        gradient: 'from-purple-600/20 to-transparent'
      }
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="text-xl">Loading programs...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-red-600/10 px-6 py-3 rounded-full mb-6">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            <span className="text-red-600 font-semibold">Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recent <span className="text-red-600">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our key programs that are transforming Kano State's environmental landscape and building resilience against climate change.
          </p>
        </div>

        <div className="space-y-20">
          {programs.map((program, index) => {
            const colorClasses = getColorClasses(program.color);
            const IconComponent = iconMap[program.icon_name as keyof typeof iconMap] || FileText;
            
            return (
              <div 
                key={program.id}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center group`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                    <img 
                      src={program.image_url} 
                      alt={program.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${colorClasses.gradient} to-black/70`}></div>
                    <div className="absolute top-6 left-6">
                      <div className={`${colorClasses.badge} px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm`}>
                        <IconComponent className="w-4 h-4" />
                        <span className="font-semibold">Recent Program</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-300">
                        <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="space-y-4">
                    <h3 className={`text-3xl md:text-4xl font-bold ${colorClasses.title} leading-tight`}>
                      {program.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      asChild
                      className={`${colorClasses.button} hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] group`}
                      variant="outline"
                    >
                      <Link to={program.link_path}>
                        View Program
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-600 via-kano-primary to-kano-secondary hover:from-red-700 hover:via-kano-primary/90 hover:to-kano-secondary/90 text-white px-12 py-4 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-red-600/25 transition-all duration-500 transform hover:translate-y-[-3px] group"
          >
            <Link to="/programs">
              See All Programs
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgencies;
