'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function changePassword(formData: FormData) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) redirect('/login')

  const newPassword = formData.get('new_password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (!newPassword || newPassword.length < 8) {
    redirect('/admin/settings?error=Password+must+be+at+least+8+characters')
  }

  if (newPassword !== confirmPassword) {
    redirect('/admin/settings?error=Passwords+do+not+match')
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword })

  if (error) {
    redirect('/admin/settings?error=' + encodeURIComponent(error.message))
  }

  // Log it
  const db = createAdminClient()
  try {
    await db.from('audit_logs').insert([{
      actor_type: 'admin',
      event_type: 'admin.password_changed',
      details: { user_id: user.id, email: user.email }
    }])
  } catch { /* non-blocking */ }

  redirect('/admin/settings?success=Password+updated+successfully')
}
