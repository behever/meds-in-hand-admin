require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const email = 'brandon@facet.works';
  const password = crypto.randomBytes(12).toString('hex'); 
  
  console.log('Updating auth user password...');
  const { data: users, error: getErr } = await supabase.auth.admin.listUsers();
  const user = users.users.find(u => u.email === email);
  
  if (user) {
    await supabase.auth.admin.updateUserById(user.id, { password });
    console.log(`Password reset for ${email}: ${password}`);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    console.log(`Created user ${email}: ${password}`);
  }
}
main();
