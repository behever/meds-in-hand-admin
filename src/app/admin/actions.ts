'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function logAudit(
  supabase: Awaited<ReturnType<typeof createClient>>,
  eventType: string,
  details: Record<string, unknown>
) {
  try {
    await supabase.from('audit_logs').insert([{
      actor_type: 'admin',
      event_type: eventType,
      details
    }])
  } catch {
    // Don't fail the main action if logging fails
  }
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────

export async function createCategory(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const description = formData.get('description') as string

  if (!name) {
    redirect('/admin/categories?error=Name+is+required')
  }

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, description }])
    .select()
    .single()

  if (error) {
    redirect('/admin/categories?error=' + encodeURIComponent(error.message))
  }

  await logAudit(supabase, 'category.created', { id: data.id, name })
  
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateCategory(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string

  if (!id || !name) {
    redirect('/admin/categories?error=ID+and+Name+are+required')
  }

  const { error } = await supabase
    .from('categories')
    .update({ name, description })
    .eq('id', id)

  if (error) {
    redirect('/admin/categories?error=' + encodeURIComponent(error.message))
  }

  await logAudit(supabase, 'category.updated', { id, name })
  
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function deleteCategory(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  if (!id) {
    redirect('/admin/categories?error=ID+is+required')
  }

  // Get the name before deleting for audit log
  const { data: category } = await supabase
    .from('categories')
    .select('name')
    .eq('id', id)
    .single()

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    redirect('/admin/categories?error=' + encodeURIComponent(error.message))
  }

  await logAudit(supabase, 'category.deleted', { id, name: category?.name })
  
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

// ─────────────────────────────────────────────────────────────
// MEDICATIONS
// ─────────────────────────────────────────────────────────────

export async function createMedication(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const category_id = formData.get('category_id') as string

  if (!name || !category_id) {
    redirect('/admin/medications?error=Name+and+Category+are+required')
  }

  const { data, error } = await supabase
    .from('medications')
    .insert([{ name, category_id }])
    .select()
    .single()

  if (error) {
    redirect('/admin/medications?error=' + encodeURIComponent(error.message))
  }

  await logAudit(supabase, 'medication.created', { id: data.id, name, category_id })
  
  revalidatePath('/admin/medications')
  redirect('/admin/medications')
}

export async function updateMedication(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const category_id = formData.get('category_id') as string

  if (!id || !name || !category_id) {
    redirect('/admin/medications?error=All+fields+are+required')
  }

  const { error } = await supabase
    .from('medications')
    .update({ name, category_id })
    .eq('id', id)

  if (error) {
    redirect('/admin/medications?error=' + encodeURIComponent(error.message))
  }

  await logAudit(supabase, 'medication.updated', { id, name, category_id })
  
  revalidatePath('/admin/medications')
  redirect('/admin/medications')
}

export async function deleteMedication(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  if (!id) {
    redirect('/admin/medications?error=ID+is+required')
  }

  // Get the name before deleting for audit log
  const { data: med } = await supabase
    .from('medications')
    .select('name')
    .eq('id', id)
    .single()

  const { error } = await supabase
    .from('medications')
    .delete()
    .eq('id', id)

  if (error) {
    redirect('/admin/medications?error=' + encodeURIComponent(error.message))
  }

  await logAudit(supabase, 'medication.deleted', { id, name: med?.name })
  
  revalidatePath('/admin/medications')
  redirect('/admin/medications')
}

// ─────────────────────────────────────────────────────────────
// USER MEDICATION MAPPING
// ─────────────────────────────────────────────────────────────

export async function mapUserMedication(formData: FormData) {
  const supabase = await createClient()
  const user_med_id = formData.get('user_med_id') as string
  const canonical_id = formData.get('canonical_id') as string

  if (!user_med_id || !canonical_id) {
    redirect('/admin/users?error=Missing+IDs')
  }

  // Get raw name for audit log
  const { data: userMed } = await supabase
    .from('user_medications')
    .select('raw_name')
    .eq('id', user_med_id)
    .single()

  const { error } = await supabase
    .from('user_medications')
    .update({ 
      canonical_id, 
      status: 'mapped',
      updated_at: new Date().toISOString()
    })
    .eq('id', user_med_id)

  if (error) {
    redirect('/admin/users?error=' + encodeURIComponent(error.message))
  }

  await logAudit(supabase, 'user_medication.mapped', { 
    user_med_id, 
    canonical_id, 
    raw_name: userMed?.raw_name 
  })

  revalidatePath('/admin/users')
  revalidatePath('/admin')
  redirect('/admin/users')
}

export async function dismissUserMedication(formData: FormData) {
  const supabase = await createClient()
  const user_med_id = formData.get('user_med_id') as string

  if (!user_med_id) {
    redirect('/admin/users?error=Missing+ID')
  }

  const { data: userMed } = await supabase
    .from('user_medications')
    .select('raw_name')
    .eq('id', user_med_id)
    .single()

  const { error } = await supabase
    .from('user_medications')
    .update({ 
      status: 'dismissed',
      updated_at: new Date().toISOString()
    })
    .eq('id', user_med_id)

  if (error) {
    redirect('/admin/users?error=' + encodeURIComponent(error.message))
  }

  await logAudit(supabase, 'user_medication.dismissed', { 
    user_med_id, 
    raw_name: userMed?.raw_name 
  })

  revalidatePath('/admin/users')
  revalidatePath('/admin')
  redirect('/admin/users')
}
