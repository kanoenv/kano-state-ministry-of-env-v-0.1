
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Building, Shield, Leaf, Users, Settings, Globe, BarChart, ClipboardList, Building2, Megaphone, Trash2, Home, Info, FileText, Phone, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const agencies = [
    {
      title: "REMASAB",
      description: "Refuse Management and Sanitation Board",
      href: "/agencies/remasab",
      icon: <Trash2 className="h-5 w-5" />
    },
    {
      title: "WECCMA",
      description: "Watershed, Erosion and Climate Change Management",
      href: "/agencies/weccma",
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: "Sustainable Kano Project (SKP)",
      description: "Multi-sectoral sustainable development initiative",
      href: "/agencies/skp",
      icon: <Leaf className="h-5 w-5" />
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-kano-primary to-kano-secondary shadow-2xl sticky top-0 z-50 border-b-4 border-kano-accent">
      <div className="container-custom">
        <div className="flex justify-between items-center py-3">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src="/lovable-uploads/4f962187-9c7c-4f29-9af7-0d2d3413167d.png" 
                alt="Kano State Ministry of Environment and Climate Change Logo" 
                className="ministry-logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="white"
              size="sm"
              asChild
              className="group"
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button 
              variant="white"
              size="sm"
              asChild
              className="group"
            >
              <Link to="/about" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                About
              </Link>
            </Button>
            
            {/* Agencies Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="white"
                  size="sm"
                  className="group flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  Agencies
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/98 backdrop-blur-sm shadow-2xl border-2 border-kano-primary/20 rounded-2xl p-4 w-80 z-50">
                <div className="space-y-2">
                  {agencies.map((agency) => (
                    <DropdownMenuItem key={agency.title} asChild>
                      <Link 
                        to={agency.href}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-kano-primary/5 hover:to-kano-secondary/5 transition-all duration-300 border-2 border-transparent hover:border-kano-primary/20 hover:shadow-lg group w-full"
                      >
                        <div className="text-kano-primary mt-1 p-3 rounded-xl bg-kano-primary/10 group-hover:bg-kano-primary/20 transition-colors duration-300">
                          {agency.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm group-hover:text-kano-primary transition-colors duration-300">{agency.title}</h4>
                          <p className="text-xs text-gray-600 mt-1 group-hover:text-gray-700 transition-colors duration-300">{agency.description}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <div className="pt-2 border-t border-gray-100">
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/agencies"
                        className="flex items-center justify-center gap-2 p-3 text-white bg-gradient-to-r from-kano-primary to-kano-secondary hover:from-kano-primary/90 hover:to-kano-secondary/90 font-semibold text-sm rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full"
                      >
                        View All Agencies
                      </Link>
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="white"
              size="sm"
              asChild
              className="group"
            >
              <Link to="/resources" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resources
              </Link>
            </Button>
            <Button 
              variant="white"
              size="sm"
              asChild
              className="group"
            >
              <Link to="/contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-kano-accent focus:outline-none transition-colors duration-300 p-3 rounded-xl hover:bg-white/10 transform hover:scale-110"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t-2 border-white/20 bg-gradient-to-r from-kano-primary/95 to-kano-secondary/95 backdrop-blur-sm rounded-b-2xl">
            <div className="flex flex-col space-y-3">
              <Button 
                variant="white"
                size="sm"
                asChild
                className="mx-4"
              >
                <Link to="/" onClick={toggleMenu} className="flex items-center gap-2 justify-center">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button 
                variant="white"
                size="sm"
                asChild
                className="mx-4"
              >
                <Link to="/about" onClick={toggleMenu} className="flex items-center gap-2 justify-center">
                  <Info className="h-4 w-4" />
                  About
                </Link>
              </Button>
              <Button 
                variant="white"
                size="sm"
                asChild
                className="mx-4"
              >
                <Link to="/agencies" onClick={toggleMenu} className="flex items-center gap-2 justify-center">
                  <Building2 className="h-4 w-4" />
                  Agencies
                </Link>
              </Button>
              <Button 
                variant="white"
                size="sm"
                asChild
                className="mx-4"
              >
                <Link to="/resources" onClick={toggleMenu} className="flex items-center gap-2 justify-center">
                  <FileText className="h-4 w-4" />
                  Resources
                </Link>
              </Button>
              <Button 
                variant="white"
                size="sm"
                asChild
                className="mx-4"
              >
                <Link to="/contact" onClick={toggleMenu} className="flex items-center gap-2 justify-center">
                  <Phone className="h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
