
import React from 'react';
import { TreePine, Recycle, Users, CheckCircle } from 'lucide-react';

const SuccessStories = () => {
  const stats = [
    {
      number: "3M+",
      label: "Trees Planted",
      icon: TreePine,
      color: "from-emerald-500 to-green-600"
    },
    {
      number: "60K+",
      label: "Tons of Waste Collected Monthly",
      icon: Recycle,
      color: "from-blue-500 to-cyan-600"
    },
    {
      number: "500+",
      label: "Communities Served",
      icon: Users,
      color: "from-purple-500 to-indigo-600"
    },
    {
      number: "100+",
      label: "Environmental Projects Completed",
      icon: CheckCircle,
      color: "from-orange-500 to-red-600"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 text-emerald-200 px-8 py-3 rounded-full text-sm font-semibold border border-emerald-500/30 backdrop-blur-sm">
              Environmental Impact
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent">
              Impact in Action
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Our dedicated team works tirelessly across Kano State to improve the environment, 
            combat climate change, and create a more sustainable future for all residents.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="group relative"
              >
                {/* Enhanced Professional Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 text-center transform hover:scale-105 transition-all duration-700 hover:bg-white/10 border border-white/10 shadow-2xl h-full group-hover:shadow-3xl">
                  {/* Enhanced Icon Container - Made Larger and More Professional */}
                  <div className="relative mb-10">
                    <div className={`w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 border border-white/20 group-hover:scale-110`}>
                      <IconComponent className="w-16 h-16 text-white" strokeWidth={1.5} />
                    </div>
                    {/* Enhanced Glow Effect */}
                    <div className={`absolute inset-0 w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-50 blur-3xl transition-opacity duration-700`}></div>
                  </div>
                  
                  {/* Enhanced Stats */}
                  <div className="space-y-4">
                    <div className="text-5xl md:text-6xl font-bold text-white group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">
                      {stat.number}
                    </div>
                    <div className="text-slate-200 text-lg font-semibold leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
            <p className="text-2xl md:text-3xl text-white/95 max-w-5xl mx-auto leading-relaxed font-light">
              Together, we're building a sustainable legacy for future generations through innovative environmental solutions and community partnerships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
