
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Wind, 
  Users, 
  UserCheck,
  TreePine,
  Building2,
  LogOut,
  Menu,
  X,
  Clock,
  FolderOpen,
  Briefcase,
  Image
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useState, useEffect } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, adminUser } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Calculate time remaining until auto-logout
  useEffect(() => {
    const updateTimeRemaining = () => {
      const loginTime = localStorage.getItem('adminLoginTime');
      if (loginTime) {
        const loginTimestamp = parseInt(loginTime);
        const currentTime = Date.now();
        const elapsed = currentTime - loginTimestamp;
        const remaining = Math.max(0, (10 * 60 * 1000) - elapsed); // 10 minutes - elapsed
        setTimeRemaining(remaining);
      }
    };

    // Update immediately
    updateTimeRemaining();

    // Update every second
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const formatTimeRemaining = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/banners', label: 'Home Banners', icon: Image },
    { path: '/admin/programs', label: 'Programs', icon: FolderOpen },
    { path: '/admin/careers', label: 'Careers', icon: Briefcase },
    { path: '/admin/reports', label: 'Reports', icon: FileText },
    { path: '/admin/content', label: 'Content', icon: Settings },
    { path: '/admin/air-quality', label: 'Air Quality', icon: Wind },
    { path: '/admin/recruitment', label: 'Recruitment', icon: UserCheck },
    { path: '/admin/tree-campaign', label: 'Tree Campaign', icon: TreePine },
    { path: '/admin/climate-actors', label: 'Climate Actors', icon: Building2 },
    { path: '/admin/users', label: 'Admin Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        isMobileMenuOpen ?'w-64' : 'w-64 hidden lg:block'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-700">Admin Panel</h2>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Session timer */}
          {adminUser && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-yellow-800">
                <Clock className="h-4 w-4" />
                <span>Session expires in:</span>
              </div>
              <div className="text-lg font-mono font-bold text-yellow-900">
                {formatTimeRemaining(timeRemaining)}
              </div>
            </div>
          )}
        </div>
        
        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-4">
              {adminUser && (
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                  <span>Welcome, {adminUser.full_name}</span>
                  <span className="text-gray-400">•</span>
                  <span className="capitalize">{adminUser.role.replace('_', ' ')}</span>
                </div>
              )}
              <Link 
                to="/" 
                className="text-sm text-gray-600 hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Website
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
