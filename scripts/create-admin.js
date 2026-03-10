require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env vars in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  const email = 'brandon@facet.works';
  const password = crypto.randomBytes(12).toString('hex'); 
  
  console.log('Creating auth user...');
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) {
    console.error('Failed to create user:', error.message);
    process.exit(1);
  }
  
  const userId = data.user.id;
  console.log(`User created. ID: ${userId}`);

  console.log('Adding to admin_users table...');
  const { error: dbError } = await supabase.from('admin_users').insert([{ id: userId }]);
  
  if (dbError) {
    console.error('Failed to add admin user role:', dbError.message);
    process.exit(1);
  }

  console.log('--- SUCCESS ---');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
}

main();
