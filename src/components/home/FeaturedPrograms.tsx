import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Microscope, Leaf, Recycle, TreePine, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedPrograms = () => {
  const programs = [
    {
      id: 1,
      title: "Dorayi Compost Plant Revitalization Program",
      description: "A flagship initiative transforming organic waste into valuable compost manure through comprehensive facility upgrades, modern equipment installation, and personnel training. The revitalized plant now produces 50 bags of high-quality compost daily, supporting sustainable agriculture and the Waste-to-Wealth Initiative.",
      image: "/lovable-uploads/658b99f0-9adc-4e0b-8bcf-64c1f502de21.png",
      link: "/programs/dorayi-compost-plant",
      icon: Recycle,
      color: "green"
    },
    {
      id: 2,
      title: "Urban Greening and Beautification Initiative",
      description: "A key component of Kano State's broader Urban Renewal Project, enhancing the urban landscape through extensive tree-planting campaigns along major roads and public spaces. The initiative focuses on reducing urban heat, improving air quality, and fostering community participation in environmental conservation.",
      image: "/lovable-uploads/e682412b-e198-465f-a9f3-ed4e20c558a2.png",
      link: "/programs/urban-greening",
      icon: TreePine,
      color: "green"
    },
    {
      id: 3,
      title: "Eight-Week Sensitization Campaign on Environmental Pollution Laws",
      description: "A comprehensive campaign led by Dr. Dahir M. Hashim to ensure understanding and compliance with the Kano State Environmental Pollution Control Law 2022 and Pollution and Waste Control Regulations 2025 across all sectors of society.",
      image: "/lovable-uploads/322085b1-4abc-46f4-a683-ab4d172c5796.png",
      link: "/programs/sensitization-campaign",
      icon: FileText,
      color: "purple"
    },
    {
      id: 4,
      title: "Kano State Waste Management & Refuse Disposal Initiative 2025",
      description: "A six‑month rescue initiative to restore Kano's cleanliness. REMASAB—reestablished by Governor Yusuf in 2024—will restructure street‑sweeper operations, optimize waste‑collection routes, and upgrade disposal facilities for faster, more efficient service.",
      image: "/lovable-uploads/b2ec0667-1d0a-437a-9129-b3ccdd2291d4.png",
      link: "/programs/waste-management",
      icon: Award,
      color: "blue"
    },
    {
      id: 5,
      title: "Rehabilitation of the Kano State Pollution Control Laboratory",
      description: "Hon. Commissioner Hashim has upgraded the region's pioneer lab to global standards, installing ultra‑modern infrastructure and expanding its analytical mandate to include air, water, and soil testing with real-time public reporting.",
      image: "/lovable-uploads/326de5bf-11c7-4839-928c-1aeb3fb9ab3d.png",
      link: "/programs/pollution-lab",
      icon: Microscope,
      color: "red"
    },
    {
      id: 6,
      title: "Climate Change Policy Implementation Action Plan",
      description: "In partnership with Partnership for Agile Governance & Climate Engagement (PACE/UK‑DFID), the Ministry immediately launched a detailed Action Plan to turn policy into practice—covering renewable energy, community adaptation, and emissions monitoring.",
      image: "/lovable-uploads/0a733cce-62b5-4251-a9fb-4d7d1fb9845a.png",
      link: "/programs/climate-action-plan",
      icon: Leaf,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string, index: number) => {
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
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-kano-primary/10 px-6 py-3 rounded-full mb-6">
            <Award className="w-5 h-5 text-kano-primary" />
            <span className="text-kano-primary font-semibold">Our Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our key initiatives that are transforming Kano State's environmental landscape and building resilience against climate change.
          </p>
        </div>

        <div className="space-y-20">
          {programs.map((program, index) => {
            const colorClasses = getColorClasses(program.color, index);
            const IconComponent = program.icon;
            
            return (
              <div 
                key={program.id}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center group`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${colorClasses.gradient} to-black/70`}></div>
                    <div className="absolute top-6 left-6">
                      <div className={`${colorClasses.badge} px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm`}>
                        <IconComponent size={18} />
                        <span className="font-semibold">Program {program.id}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
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
                      <Link to={program.link}>
                        View Program
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
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
            className="bg-gradient-to-r from-kano-primary to-kano-secondary hover:from-kano-secondary hover:to-kano-primary text-white px-12 py-4 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-kano-primary/25 transition-all duration-500 transform hover:translate-y-[-3px] group"
          >
            <Link to="/programs">
              See All Programs
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
