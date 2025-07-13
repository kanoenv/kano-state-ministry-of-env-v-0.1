
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Messages = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center text-kano-dark mb-12">Leadership Messages</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Governor's Message - Now first */}
          <Card className="overflow-hidden border-0 shadow-lg animate-fade-in">
            <div className="bg-red-600 text-white p-6">
              <h3 className="text-2xl font-bold">His Excellency's Message</h3>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div className="w-32 h-32 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-4 border-red-600 bg-white">
                  <img 
                    src="/lovable-uploads/ee1f8efd-671a-4dc5-a8b0-d772922afe99.png" 
                    alt="Alhaji Abba Kabir Yusuf" 
                    className="w-full h-full object-cover object-top" 
                  />
                </div>
                <div>
                  <p className="text-gray-700 italic mb-6">
                    "A clean environment is the bedrock of public health, economic growth, and social well‑being. 
                    My administration has reestablished REMASAB and empowered our Ministry with the tools, funding, 
                    and political will to tackle waste, pollution, and climate risks headon. 
                    We will leave no stone unturned, from rehabilitating our dams, erosion control to planting millions of trees. 
                    Together, we will build a Kano that is not only prosperous, but sustainable and resilient in the face of a changing climate."
                  </p>
                  <div className="text-right">
                    <h4 className="font-bold text-red-600">Alhaji Abba Kabir Yusuf</h4>
                    <p className="text-gray-600">Executive Governor of Kano State</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commissioner's Message - Updated title */}
          <Card className="overflow-hidden border-0 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-kano-primary text-white p-6">
              <h3 className="text-2xl font-bold">Commissioner's Message</h3>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div className="w-32 h-32 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-4 border-kano-primary bg-white">
                  <img 
                    src="/lovable-uploads/d8ae522e-5423-4798-849c-d19bd4a9eed9.png" 
                    alt="Dr. Dahiru Muhammad Hashim" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-gray-700 italic mb-6">
                    "Since inauguration, we have embarked on a 'Rescue Mission' to reverse decades of environmental neglect. 
                    From revitalizing our Pollution Control Laboratory to launching community‑led waste‑cleanup drives, 
                    every initiative is driven by one goal: a healthier, greener Kano for today's citizens and generations to come. 
                    I invite you, residents, businesses, and partners, to join hands with the Ministry. 
                    Together, we will turn our strategic plans into visible change on our streets, farms, and waterways."
                  </p>
                  <div className="text-right">
                    <h4 className="font-bold text-kano-primary">Dr. Dahiru Muhammad Hashim</h4>
                    <p className="text-gray-600">Commissioner, Kano State Ministry of Environment & Climate Change</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Messages;
