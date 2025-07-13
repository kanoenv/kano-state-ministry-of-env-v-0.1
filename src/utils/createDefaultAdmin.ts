
import { supabase } from '@/integrations/supabase/client';

export const createDefaultAdmin = async () => {
  try {
    console.log('Initializing admin user...');
    
    // Check if default admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', 'admin@environment.kn.gov.ng')
      .maybeSingle();

    if (checkError) {
      console.error('Error checking for existing admin:', checkError);
      return { success: false, error: checkError.message };
    }

    if (existingAdmin) {
      console.log('Admin account already exists');
      return { success: true, message: 'Admin account already exists and is ready to use' };
    }

    // Create admin user
    const { data, error } = await supabase.rpc('create_admin_user', {
      admin_email: 'admin@environment.kn.gov.ng',
      admin_password: 'admin123',
      admin_name: 'System Administrator',
      admin_role_param: 'super_admin'
    });

    if (error) {
      console.error('Error creating admin account:', error);
      return { success: false, error: error.message };
    }

    console.log('Admin account created successfully');
    return { 
      success: true, 
      message: 'Admin account has been created successfully' 
    };
  } catch (error) {
    console.error('Error in createDefaultAdmin:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
