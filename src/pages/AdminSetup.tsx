import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { SecureAdminSetup } from '@/components/admin/SecureAdminSetup';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export const AdminSetup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('is_active', true)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error checking setup status:', error);
        setNeedsSetup(true);
      } else {
        setNeedsSetup(!data);
      }
    } catch (error) {
      console.error('Error checking setup status:', error);
      setNeedsSetup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminCreated = () => {
    setSetupComplete(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Checking system status...</p>
        </div>
      </div>
    );
  }

  if (!needsSetup || setupComplete) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kano State Ministry of Environment
          </h1>
          <p className="text-gray-600">
            Initial System Setup
          </p>
        </div>
        <SecureAdminSetup onAdminCreated={handleAdminCreated} />
      </div>
    </div>
  );
};

export default AdminSetup;
