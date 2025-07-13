
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FiveMillionTreesStepForm from '@/components/forms/FiveMillionTreesStepForm';
import { TreePine, ArrowLeft } from 'lucide-react';

const FiveMillionTreesApply = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-12">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/programs/five-million-trees" 
                className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Campaign Overview
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Organization Application Form</h1>
                  <p className="text-xl text-gray-600">2025 Five Million Trees Planting Campaign</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700">
                Use this form to apply for participation in the 2025 Five Million Trees Planting Campaign. 
                Complete each step and save your progress as you go.
              </p>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16">
          <div className="container-custom">
            <FiveMillionTreesStepForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FiveMillionTreesApply;
