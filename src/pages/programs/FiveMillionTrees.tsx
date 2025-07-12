
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, Users, MapPin, Calendar, Target, CheckCircle, ArrowRight, Download, Phone, Mail, MapPin as Location } from 'lucide-react';

const FiveMillionTrees = () => {
  const timeline = [
    { week: "1", activity: "Launch announcement; online and media call for applications." },
    { week: "2–3", activity: "Review applications; select and notify participating organizations." },
    { week: "3–4", activity: "Conduct regional training workshops on planting techniques and Tracking Tool usage." },
    { week: "5–24", activity: "Seedling distribution visits; coordinated mass-planting events; data entry into Tracking Tool." },
    { week: "8, 12, 16, 20", activity: "Quarterly \"Tree-Health\" checks: survival verification, remedial interventions as needed." },
    { week: "25", activity: "Final audit of planted trees; report on survival rates; award certificates of recognition to high-performing organizations." }
  ];

  const requirements = [
    {
      title: "Apply for Inclusion",
      description: "Complete and submit the official application form with organizational details and previous experience."
    },
    {
      title: "Undergo Training", 
      description: "Attend training sessions on best practices, seedling handling, and digital tracking tool usage."
    },
    {
      title: "Receive Seedlings & Tools",
      description: "Get free seedlings and user credentials for the digital Tracking Tool based on your commitment."
    },
    {
      title: "Maintain & Protect Trees",
      description: "Ensure at least 90% survival rate through regular watering, mulching, and protection."
    },
    {
      title: "Community Mobilization",
      description: "Hold sensitization sessions and recruit volunteers for tree care and awareness."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/31f553f5-a3ce-4b9e-82a2-737652ecd4db.png')] bg-cover bg-center opacity-10"></div>
          <div className="relative container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-green-100 text-green-800 border-green-200 mb-6 px-4 py-2 text-lg">
                <TreePine className="w-5 h-5 mr-2" />
                2025 Campaign
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Five Million Trees Planting Campaign
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Join Kano State's ambitious initiative to plant 5,000,000 trees in 2025. 
                Together, we'll create a greener, cooler, and healthier environment for current and future generations.
              </p>
              <div className="flex justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/programs/five-million-trees/apply">
                    Apply Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Overview */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Campaign Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-xl mb-6">
                  The Government of Kano State, under the leadership of Alhaji Abba Kabir Yusuf, has launched an 
                  ambitious Five Million Trees (5,000,000) Planting Campaign for 2025. All necessary preparations 
                  have been completed to ensure the success of this initiative.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 my-12">
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Climate Impact</h3>
                    <p className="text-sm">Mitigate climate change by reducing temperatures and improving air quality</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Land Restoration</h3>
                    <p className="text-sm">Restore degraded land and prevent soil erosion across Kano State</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Community Engagement</h3>
                    <p className="text-sm">Unite organizations and individuals in environmental stewardship</p>
                  </div>
                </div>

                <p className="text-lg italic text-center mb-8 text-green-700 font-medium">
                  Dukkan shirya-shirye sunkammala domin aiwatar da babbar ƙudirin Gwamnatin Jihar Kano 
                  ƙarƙashin jagorancin Alhaji Abba Kabir Yusuf na shuka bishiyoyi guda miliyan 5 a wannan shekara.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Campaign in Action</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative h-64 overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/31f553f5-a3ce-4b9e-82a2-737652ecd4db.png" 
                  alt="Tree planting preparation site" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Site Preparation</h3>
                  <p className="text-sm opacity-90">Preparing irrigation and planting areas</p>
                </div>
              </div>
              <div className="relative h-64 overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/03d7b9ea-8a63-49e1-8386-468b8ca821b2.png" 
                  alt="Officials discussing tree planting strategy" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Strategic Planning</h3>
                  <p className="text-sm opacity-90">Officials planning implementation</p>
                </div>
              </div>
              <div className="relative h-64 overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/33a126d5-483a-477a-ae1b-6e48ba20721e.png" 
                  alt="Community leaders planting trees" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Community Engagement</h3>
                  <p className="text-sm opacity-90">Leaders actively participating</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Requirements */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Partnership & Participation Requirements</h2>
              <div className="space-y-6">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{requirement.title}</h3>
                      <p className="text-gray-700">{requirement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-16 bg-green-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Implementation Timeline</h2>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <Card key={index} className="border-l-4 border-l-green-600">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 font-semibold">
                          Week {item.week}
                        </Badge>
                        <p className="text-gray-700 flex-1">{item.activity}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expected Outcomes */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Expected Outcomes</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Five Million Trees Planted</h3>
                      <p className="text-gray-700">Each tree geo-tagged, species-identified, and tracked until establishment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Increased Green Cover</h3>
                      <p className="text-gray-700">Significant reduction in bare land, better soil retention, and improved micro-climate regulation.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Community Engagement</h3>
                      <p className="text-gray-700">200+ organizations participating, 10,000+ volunteers mobilized.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Sustainable Framework</h3>
                      <p className="text-gray-700">A replicable model of digital tracking and local accountability for future campaigns.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Join the Movement</h2>
              <p className="text-xl mb-4 font-medium">
                Mu ƙarfafa gwiwar kowa da kowa domin shuka bishiyoyi!
              </p>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">
                The success of this campaign depends on your organization's commitment. Whether you are a corporate entity, 
                NGO, school, religious body, or neighborhood association, your involvement can make a lasting difference.
              </p>
              <div className="flex justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
                >
                  <Link to="/programs/five-million-trees/apply">
                    Apply Today
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

export default FiveMillionTrees;
