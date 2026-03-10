'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/utils/supabase/server'

async function logAudit(eventType: string, details: Record<string, unknown>) {
  try {
    const admin = createAdminClient()
    await admin.from('audit_logs').insert([{ actor_type: 'admin', event_type: eventType, details }])
  } catch {
    // non-blocking
  }
}

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    await logAudit('admin.login.failed', { email, reason: error.message })
    redirect('/login?error=Invalid login credentials')
  }

  await logAudit('admin.login', { email, user_id: data.user.id })

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  await logAudit('admin.logout', { email: user?.email, user_id: user?.id })

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
