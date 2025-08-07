import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClimateActorRegisterForm from "@/components/forms/ClimateActorRegisterForm";
import { TreePine, Shield, Globe, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ClimateActorRegister = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo and Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/25">
                  <TreePine className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Join Kano's
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Climate Action Network
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
                Official Climate-Actor Registry
              </p>
            </div>
            
            {/* Description */}
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Become a verified member of Kano State's official climate action network. 
              Connect with stakeholders, access resources, and contribute to sustainable development 
              initiatives across the state.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Official Recognition</h3>
                  <p className="text-sm text-muted-foreground">Get listed in the state's official climate registry</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Network Access</h3>
                  <p className="text-sm text-muted-foreground">Connect with other climate actors and stakeholders</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Opportunities</h3>
                  <p className="text-sm text-muted-foreground">Access funding and collaboration opportunities</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <ClimateActorRegisterForm />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ClimateActorRegister;
