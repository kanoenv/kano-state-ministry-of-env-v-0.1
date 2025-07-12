
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, Mail } from 'lucide-react';

const ReportBanner = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-20 border-t border-slate-200/50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Main Banner Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl mb-8 shadow-lg">
              <AlertTriangle className="h-9 w-9 text-red-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Report Environmental Issues
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Help us protect Kano's environment by reporting illegal dumping, pollution, or other environmental hazards in your community. Your contribution makes a difference.
            </p>
            <Link to="/report-issue">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-6 text-lg font-semibold shadow-2xl hover:shadow-red-500/25 transition-all duration-500 transform hover:translate-y-[-2px] rounded-xl border border-red-500/20"
              >
                <AlertTriangle className="mr-3 h-6 w-6" />
                Report Environmental Issue
              </Button>
            </Link>
          </div>

          {/* Enhanced Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-green-200 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Emergency Hotline</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">24/7 environmental emergency response</p>
              <a 
                href="https://wa.me/2348030719901" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              >
                +234 803 071 9901
              </a>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-blue-200 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Email Reports</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">Send detailed environmental reports</p>
              <a 
                href="mailto:complaints@environment.kn.gov.ng" 
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                complaints@environment.kn.gov.ng
              </a>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-purple-200 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Online Form</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">Submit reports with photos and details</p>
              <Link 
                to="/report-issue" 
                className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Fill Report Form
              </Link>
            </div>
          </div>

          {/* Enhanced Information Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 backdrop-blur-lg rounded-2xl p-10 border border-slate-200/50 shadow-xl">
              <p className="text-lg md:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed font-medium">
                Your reports help us maintain a cleaner, healthier environment for all residents of Kano State.
                All reports are treated confidentially and responded to promptly by our expert team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportBanner;
