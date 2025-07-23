
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, Users, Newspaper, FileText, Mail, Phone, MapPin,
  AlertTriangle, LogIn, Building, TreeDeciduous, Leaf, Sprout  
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        ></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="py-12 border-b border-white/10">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/547b0670-14bd-4393-902d-09fa4e0f1c39.png" 
                alt="Kano State Ministry of Environment Logo" 
                className="h-20 md:h-24 object-contain"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Ministry of Environment & Climate Change
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Building a sustainable future for Kano State through innovation, conservation, and community engagement.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <Mail className="mr-3 h-5 w-5 text-emerald-400" />
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 leading-relaxed">
                    Block 5, Audu Bako Secretariat,<br />
                    Kano State, Nigeria
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <a href="https://wa.me/2348030719901" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  +234 803 071 9901
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <a href="mailto:reports@environment.kn.gov.ng" className="text-slate-300 hover:text-emerald-400 transition-colors break-all">
                  reports@environment.kn.gov.ng
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-3">Quick Links</span>
              <div className="h-1 w-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors group">
                  <Info size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/programs" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors group">
                  <TreeDeciduous size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>Our Programs</span>
                </Link>
              </li>
              <li>
                <Link to="/news" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors group">
                  <Newspaper size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>News & Updates</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors group">
                  <FileText size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>Resources</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors group">
                  <Mail size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/report-issue" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors group">
                  <AlertTriangle size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>Report Issue</span>
                </Link>
              </li>
              <li>
                <Link to="/climate-actor-registry" className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors group">
                  <Users size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>Climate-Actor Registry</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Agencies */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-3">Agencies</span>
              <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/programs/remasab" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors group">
                  <Building size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>REMASAB</span>
                </Link>
              </li>
              <li>
                <Link to="/programs/weccma" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors group">
                  <Building size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>WECCMA</span>
                </Link>
              </li>
              <li>
                <Link to="/programs/skp" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors group">
                  <Leaf size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>Sustainable Kano Project</span>
                </Link>
              </li>
              <li>
                <Link to="/programs/knap" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors group">
                  <Sprout size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>Kano Afforestation Project</span>
                </Link>
              </li>
              <li>
                <a href="https://kanoacresal.org" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors group">
                  <Building size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span>ACRESAL</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-3">Connect With Us</span>
              <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </h4>
            
            {/* Social Media */}
            <div className="flex flex-wrap gap-3">
              <a href="https://facebook.com/kanoenvironment" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white/10 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 group-hover:scale-110 backdrop-blur-sm border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
              <a href="https://x.com/kanoenvironment" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white/10 hover:bg-black p-3 rounded-xl transition-all duration-300 group-hover:scale-110 backdrop-blur-sm border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </div>
              </a>
              <a href="https://instagram.com/kanoenvironment" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 p-3 rounded-xl transition-all duration-300 group-hover:scale-110 backdrop-blur-sm border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
              <a href="https://www.youtube.com/@KanoEnvironment" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white/10 hover:bg-red-600 p-3 rounded-xl transition-all duration-300 group-hover:scale-110 backdrop-blur-sm border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            </div>
            
            {/* Admin Access */}
            <div className="pt-4 border-t border-white/10">
              <Link 
                to="/admin-login" 
                className="inline-flex items-center text-slate-400 hover:text-emerald-400 transition-colors group text-sm"
              >
                <LogIn size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                <span>Staff Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                © 2025 Kano State Ministry of Environment & Climate Change. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Powered by{' '}
                <a 
                  href="https://outsidelab.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Outside Lab
                </a>
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
