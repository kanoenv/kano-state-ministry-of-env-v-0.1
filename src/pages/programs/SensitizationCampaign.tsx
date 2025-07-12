import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, FileText, Gavel, Crown, School, CheckCircle, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const SensitizationCampaign = () => {
  const milestones = [
    {
      id: 1,
      title: "Head of Service Endorsement",
      description: "Official endorsement secured with full support pledged from the State Civil Service to promote compliance across all ministries and agencies.",
      icon: CheckCircle,
      status: "completed"
    },
    {
      id: 2,
      title: "Local Government & Chieftaincy Affairs Collaboration",
      description: "Met with the Honourable Commissioner for Local Government and Chieftaincy Affairs to present the 2022 Law and 2025 Regulations with commitment to introduce these instruments to all forty-four Local Government Chairmen.",
      icon: Users,
      status: "completed"
    },
    {
      id: 3,
      title: "Mobile Court Partnership",
      description: "In collaboration with the Attorney General and Commissioner for Justice, establishing a mobile court system for rapid adjudication of environmental offences.",
      icon: Gavel,
      status: "in-progress"
    },
    {
      id: 4,
      title: "Visit to the Emir of Kano",
      description: "Dr. Dahir M. Hashim and team met with Khalifa Muhammad Sanusi II, PhD, CON, who pledged support for mobilizing international partnerships and investment for waste-to-energy initiatives.",
      icon: Crown,
      status: "completed"
    }
  ];

  const outreachActivities = [
    {
      title: "Traditional and Local Leaders",
      description: "Engage First- and Second-Class Emirs, district heads, and Local Government Chairmen in focused briefings.",
      icon: Crown
    },
    {
      title: "Enforcement Agencies",
      description: "Train officers on evidence collection, reporting protocols, and referral procedures to the mobile courts.",
      icon: Gavel
    },
    {
      title: "Community Associations & Market Leaders",
      description: "Host town-hall sessions in key wards and markets to explain waste segregation, recycling options, and public-health benefits.",
      icon: Users
    },
    {
      title: "Media & Civil Society",
      description: "Distribute press packs, conduct radio interviews, and share infographics to amplify key messages.",
      icon: FileText
    },
    {
      title: "Schools & Youth Groups",
      description: "Launch environmental club activities, clean-up drives, and essay competitions to foster ownership among younger generations.",
      icon: School
    }
  ];

  const campaignImages = [
    {
      src: "/lovable-uploads/322085b1-4abc-46f4-a683-ab4d172c5796.png",
      alt: "Ministry meeting with stakeholders on environmental legislation",
      title: "Stakeholder Engagement Meeting"
    },
    {
      src: "/lovable-uploads/1129206b-bc5b-4dd8-995b-ac0b6cacba9a.png",
      alt: "Presentation of environmental regulations to officials",
      title: "Official Documentation Presentation"
    },
    {
      src: "/lovable-uploads/0d0cefba-201c-48c4-8707-4cb8716a3433.png",
      alt: "Commissioner discussing environmental laws with officials",
      title: "High-Level Consultations"
    },
    {
      src: "/lovable-uploads/9c288996-339e-47f2-a7cd-06c1177fb0c3.png",
      alt: "Team presentation of campaign materials",
      title: "Campaign Launch Team"
    },
    {
      src: "/lovable-uploads/cca36e21-7041-44f7-8f23-ffba7c925535.png",
      alt: "Commissioner reviewing campaign documents",
      title: "Strategic Planning Session"
    },
    {
      src: "/lovable-uploads/f212175a-137e-44ff-8c43-059c30f28a22.png",
      alt: "Visit to traditional institution for campaign support",
      title: "Traditional Authority Engagement"
    },
    {
      src: "/lovable-uploads/818242b8-0ed0-4e0f-b001-db787b9b7726.png",
      alt: "Ceremonial meeting at Emir's palace for campaign endorsement",
      title: "Royal Palace Courtesy Visit"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container-custom relative">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Badge className="bg-white/20 text-white mb-6 px-4 py-2">
                <FileText className="w-4 h-4 mr-2" />
                Legal Compliance Campaign
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Eight-Week Sensitization Campaign on Environmental Pollution Laws
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Ensuring comprehensive understanding and compliance with the Kano State Environmental Pollution Control Law 2022 and Pollution and Waste Control Regulations 2025 across all sectors of society.
              </p>
            </div>
          </div>
        </section>

        {/* Campaign Overview */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campaign Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our eight-week sensitization campaign on the Kano State Environmental Pollution Control Law 2022 and 
                  the Kano State Pollution and Waste Control Regulations 2025 is well underway. Led by Dr. Dahir M. Hashim, 
                  Honourable Commissioner, this initiative aims to ensure that every ministry, local government, traditional 
                  institution, and community in Kano State understands and embraces their responsibilities under these new legal frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Gallery */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campaign in Action</h2>
              <p className="text-lg text-gray-600">
                Key moments from our sensitization campaign across various stakeholder groups
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaignImages.map((image, index) => (
                <div key={index} className="group">
                  <div className="relative h-64 overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg leading-tight">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Milestones */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Milestones to Date</h2>
                <p className="text-lg text-gray-600">
                  Significant achievements in our campaign to build awareness and support
                </p>
              </div>
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => {
                  const IconComponent = milestone.icon;
                  return (
                    <Card key={milestone.id} className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="bg-purple-100 p-3 rounded-full">
                            <IconComponent className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl text-purple-600">{milestone.title}</CardTitle>
                              <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                                {milestone.status === 'completed' ? 'Completed' : 'In Progress'}
                              </Badge>
                            </div>
                            <CardDescription className="text-gray-700 leading-relaxed">
                              {milestone.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Next Phase Outreach */}
        <section className="py-16 bg-purple-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Next-Phase Outreach (Weeks 5–8)</h2>
                <p className="text-lg text-gray-600">
                  Comprehensive engagement strategy for remaining campaign weeks
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {outreachActivities.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="bg-purple-600 p-3 rounded-full">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-purple-600 mb-2">{activity.title}</CardTitle>
                            <CardDescription className="text-gray-700 leading-relaxed">
                              {activity.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Expected Outcomes */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Expected Outcomes</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl text-green-600">Widespread Awareness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Every stakeholder group will understand their legal obligations under the 2022 Law and 2025 Regulations, 
                      plus the health, environmental, and economic benefits of compliance.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-blue-600">Local Champions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Identify community champions to sustain momentum after the eight weeks, ensuring long-term compliance and engagement.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gavel className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl text-purple-600">Swift Enforcement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      With mobile courts operational, environmental offences will be handled promptly, deterring violations and reinforcing accountability.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="py-16 bg-purple-900 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">How to Get Involved</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-4">Visit/Contact Us</h3>
                <p className="text-xl mb-6">Ministry of Environment and Climate Change</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Block 5, Audu Bako Secretariat, Kano State, Nigeria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>+234 803 071 9901</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>info@kanoenvironment.gov.ng</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-gray-100"
                >
                  <Link to="/contact">
                    Learn More
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

export default SensitizationCampaign;
