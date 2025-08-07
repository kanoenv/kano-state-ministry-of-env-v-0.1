import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Image,
  Shield,
  Bell,
  Search,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger, 
  useSidebar 
} from '@/components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, adminUser } = useAdminAuth();
  const { state } = useSidebar();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const collapsed = state === "collapsed";

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
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      description: 'Overview & Analytics',
      category: 'main'
    },
    { 
      path: '/admin/reports', 
      label: 'Reports', 
      icon: FileText,
      description: 'Environmental reports',
      category: 'main'
    },
    { 
      path: '/admin/climate-actors', 
      label: 'Climate Actors', 
      icon: Building2,
      description: 'Organizations registry',
      category: 'main'
    },
    { 
      path: '/admin/tree-campaign', 
      label: 'Tree Campaign', 
      icon: TreePine,
      description: '5M trees initiative',
      category: 'main'
    },
    { 
      path: '/admin/forest-guard-applications', 
      label: 'Forest Guard Apps', 
      icon: UserCheck,
      description: 'Forest guard applications',
      category: 'main'
    },
    { 
      path: '/admin/tree-planting-tracker', 
      label: 'Tree Planting Tracker', 
      icon: TreePine,
      description: 'Monitor tree planting',
      category: 'monitoring'
    },
    { 
      path: '/admin/air-quality', 
      label: 'Air Quality', 
      icon: Wind,
      description: 'Air monitoring data',
      category: 'monitoring'
    },
    { 
      path: '/admin/banners', 
      label: 'Home Banners', 
      icon: Image,
      description: 'Website banners',
      category: 'content'
    },
    { 
      path: '/admin/programs', 
      label: 'Programs', 
      icon: FolderOpen,
      description: 'Environmental programs',
      category: 'content'
    },
    { 
      path: '/admin/content', 
      label: 'Content', 
      icon: Settings,
      description: 'Site content management',
      category: 'content'
    },
    { 
      path: '/admin/careers', 
      label: 'Careers', 
      icon: Briefcase,
      description: 'Job opportunities',
      category: 'management'
    },
    { 
      path: '/admin/recruitment', 
      label: 'Recruitment', 
      icon: UserCheck,
      description: 'HR & recruitment',
      category: 'management'
    },
    { 
      path: '/admin/users', 
      label: 'Admin Users', 
      icon: Users,
      description: 'System administrators',
      category: 'management'
    },
  ];

  const groupedMenuItems = {
    main: menuItems.filter(item => item.category === 'main'),
    monitoring: menuItems.filter(item => item.category === 'monitoring'),
    content: menuItems.filter(item => item.category === 'content'),
    management: menuItems.filter(item => item.category === 'management'),
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-destructive text-destructive-foreground';
      case 'content_admin': return 'bg-primary text-primary-foreground';
      case 'moderator': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleLabel = (role: string) => {
    return role.replace('_', ' ').toUpperCase();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} variant="sidebar" collapsible="icon">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-base font-semibold text-sidebar-foreground">Admin Console</h2>
                <p className="text-xs text-sidebar-foreground/70">Climate Management</p>
              </div>
            )}
          </div>
          
          {/* Session timer - only show when expanded */}
          {!collapsed && adminUser && (
            <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 text-xs text-warning-foreground">
                <Clock className="h-3 w-3" />
                <span>Session:</span>
              </div>
              <div className="text-sm font-mono font-bold text-warning-foreground">
                {formatTimeRemaining(timeRemaining)}
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedMenuItems.main.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild className={isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}>
                      <Link to={item.path}>
                        <Icon className="h-4 w-4" />
                        {!collapsed && (
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs opacity-70">{item.description}</div>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Monitoring */}
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedMenuItems.monitoring.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild className={isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}>
                      <Link to={item.path}>
                        <Icon className="h-4 w-4" />
                        {!collapsed && (
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs opacity-70">{item.description}</div>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Content Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedMenuItems.content.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild className={isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}>
                      <Link to={item.path}>
                        <Icon className="h-4 w-4" />
                        {!collapsed && (
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs opacity-70">{item.description}</div>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedMenuItems.management.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild className={isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}>
                      <Link to={item.path}>
                        <Icon className="h-4 w-4" />
                        {!collapsed && (
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs opacity-70">{item.description}</div>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Sign Out</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { adminUser } = useAdminAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-destructive text-destructive-foreground';
      case 'content_admin': return 'bg-primary text-primary-foreground';
      case 'moderator': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleLabel = (role: string) => {
    return role.replace('_', ' ').toUpperCase();
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-card border-b border-border sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                
                {/* Search bar */}
                <div className="hidden md:flex items-center relative">
                  <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
                  <Input 
                    placeholder="Search admin panel..." 
                    className="pl-10 w-80 bg-muted/50"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
                
                {/* User profile */}
                {adminUser && (
                  <div className="flex items-center gap-3 pl-3 border-l border-border">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {adminUser.full_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                      <div className="text-sm font-medium">{adminUser.full_name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getRoleColor(adminUser.role)}>
                          {getRoleLabel(adminUser.role)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button variant="outline" size="sm" asChild>
                  <Link 
                    to="/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    View Site
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 bg-muted/30 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
