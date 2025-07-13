import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { createDefaultAdmin } from '@/utils/createDefaultAdmin';

type AdminRole = 'super_admin' | 'content_admin' | 'reports_admin';

type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
};

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role: AdminRole) => Promise<void>;
  logout: () => Promise<void>;
  canCreateAdmins: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto-logout after 10 minutes of inactivity
  const AUTO_LOGOUT_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

  const resetSessionTimer = () => {
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }

    const timer = setTimeout(() => {
      handleAutoLogout();
    }, AUTO_LOGOUT_TIME);

    setSessionTimer(timer);
  };

  const handleAutoLogout = async () => {
    console.log('Auto-logout triggered after 10 minutes of inactivity');
    await logout();
    toast({
      title: "Session Expired",
      description: "You have been logged out due to inactivity",
      variant: "destructive"
    });
  };

  // Activity detection for session renewal
  useEffect(() => {
    if (!adminUser) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimer = () => {
      resetSessionTimer();
    };

    // Add event listeners for user activity
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    // Start the initial timer
    resetSessionTimer();

    return () => {
      // Cleanup event listeners
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
      
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
    };
  }, [adminUser]);

  // Create default admin on app start and validate session
  useEffect(() => {
    const validateSession = async () => {
      // First ensure default admin exists
      await createDefaultAdmin();
      
      const adminSession = localStorage.getItem('adminSession');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (adminSession && loginTime) {
        try {
          const parsedSession = JSON.parse(adminSession);
          const loginTimestamp = parseInt(loginTime);
          const currentTime = Date.now();
          
          // Check if session is older than 10 minutes
          if (currentTime - loginTimestamp > AUTO_LOGOUT_TIME) {
            console.log('Session expired, clearing stored data');
            localStorage.removeItem('adminSession');
            localStorage.removeItem('adminLoginTime');
            setAdminUser(null);
            setIsLoading(false);
            return;
          }

          // Verify session with database
          const { data, error } = await supabase
            .from('admin_users')
            .select('id, email, full_name, role, is_active')
            .eq('id', parsedSession.id)
            .eq('is_active', true)
            .maybeSingle();

          if (error) {
            console.error('Session validation error:', error);
            localStorage.removeItem('adminSession');
            localStorage.removeItem('adminLoginTime');
            setAdminUser(null);
          } else if (!data) {
            console.log('No admin user found, clearing stored data');
            localStorage.removeItem('adminSession');
            localStorage.removeItem('adminLoginTime');
            setAdminUser(null);
          } else {
            console.log('Session validated successfully');
            setAdminUser(data as AdminUser);
          }
        } catch (error) {
          console.error('Error validating session:', error);
          localStorage.removeItem('adminSession');
          localStorage.removeItem('adminLoginTime');
          setAdminUser(null);
        }
      }
      setIsLoading(false);
    };

    validateSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting admin login for:', email);
      
      // First check if admin_users table exists and has data
      const { data: tableCheck, error: tableError } = await supabase
        .from('admin_users')
        .select('count')
        .limit(1);

      if (tableError) {
        console.error('Admin users table error:', tableError);
        throw new Error('Admin system not properly configured. Please contact system administrator.');
      }

      // Try direct query first for debugging
      const { data: directData, error: directError } = await supabase
        .from('admin_users')
        .select('id, email, full_name, role, is_active, password_hash')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      console.log('Direct query result:', { directData, directError });

      if (directError) {
        console.error('Direct query error:', directError);
        throw new Error('Database query failed. Please try again.');
      }

      if (!directData) {
        throw new Error('Invalid email or password');
      }

      // Try the RPC function for password verification
      const { data: rpcData, error: rpcError } = await supabase.rpc('verify_admin_login', {
        admin_email: email,
        admin_password: password
      });

      console.log('RPC login response:', { rpcData, rpcError });

      if (rpcError) {
        console.error('RPC login error:', rpcError);
        // If RPC fails, try manual password check (for debugging)
        console.log('RPC failed, this might be a password verification issue');
        throw new Error('Invalid email or password');
      }

      if (!rpcData || rpcData.length === 0) {
        throw new Error('Invalid email or password');
      }

      const adminData = rpcData[0];
      console.log('Admin data from RPC:', adminData);
      
      if (!adminData.is_active) {
        throw new Error('Account is inactive. Please contact administrator.');
      }

      const adminUser: AdminUser = {
        id: adminData.id,
        email: adminData.email,
        full_name: adminData.full_name,
        role: adminData.role as AdminRole,
        is_active: adminData.is_active
      };

      // Store session in localStorage with timestamp
      const loginTime = Date.now().toString();
      localStorage.setItem('adminSession', JSON.stringify(adminUser));
      localStorage.setItem('adminLoginTime', loginTime);
      setAdminUser(adminUser);

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);

      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string, role: AdminRole) => {
    setIsLoading(true);
    try {
      console.log('Creating admin user:', { email, role, fullName });
      
      // Check if user already exists first
      const { data: existingUser, error: checkError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing user:', checkError);
        throw new Error('Failed to check existing user');
      }

      if (existingUser) {
        throw new Error('Admin user with this email already exists');
      }

      // Create admin user using the database function
      const { data, error } = await supabase.rpc('create_admin_user', {
        admin_email: email,
        admin_password: password,
        admin_name: fullName,
        admin_role_param: role
      });

      console.log('Registration response:', { data, error });

      if (error) {
        console.error('Registration error:', error);
        throw new Error(error.message || 'Failed to create admin account');
      }

      toast({
        title: "Success",
        description: "Admin account created successfully",
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to create admin account",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear session timer
      if (sessionTimer) {
        clearTimeout(sessionTimer);
        setSessionTimer(null);
      }

      // Clear stored session data
      localStorage.removeItem('adminSession');
      localStorage.removeItem('adminLoginTime');
      setAdminUser(null);
      
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  const canCreateAdmins = () => {
    return adminUser?.role === 'super_admin';
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        isLoading,
        login,
        register,
        logout,
        canCreateAdmins
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
