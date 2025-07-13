
-- Function to verify admin login credentials
CREATE OR REPLACE FUNCTION verify_admin_login(
  admin_email TEXT,
  admin_password TEXT
)
RETURNS TABLE (
  id TEXT,
  email TEXT,
  full_name TEXT,
  role admin_role,
  is_active BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id::TEXT,
    au.email,
    au.full_name,
    au.role,
    au.is_active
  FROM public.admin_users au
  WHERE au.email = admin_email
    AND au.password_hash = crypt(admin_password, au.password_hash)
    AND au.is_active = true;
END;
$$;

-- Function to create admin users
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_name TEXT,
  admin_role_param admin_role DEFAULT 'content_admin'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_id TEXT;
  hashed_password TEXT;
BEGIN
  -- Generate a UUID for the admin
  admin_id := gen_random_uuid()::text;
  
  -- Hash the password
  hashed_password := crypt(admin_password, gen_salt('bf'));

  -- Create admin record
  INSERT INTO public.admin_users (
    id,
    email,
    password_hash,
    full_name,
    role,
    is_active,
    created_at,
    updated_at
  )
  VALUES (
    admin_id::uuid,
    admin_email,
    hashed_password,
    admin_name,
    admin_role_param,
    true,
    now(),
    now()
  );

  RETURN admin_id;
END;
$$;
