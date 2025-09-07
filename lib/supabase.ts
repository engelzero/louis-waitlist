import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured. Using mock client.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type WaitlistEntry = {
  id?: string
  email: string
  created_at?: string
}

export async function addToWaitlist(email: string): Promise<{ data: WaitlistEntry | null; error: unknown }> {
  // If Supabase is not configured, return a mock success for development
  if (!supabase) {
    console.log('Mock: Adding email to waitlist:', email)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
    return { 
      data: { email, id: 'mock-id', created_at: new Date().toISOString() }, 
      error: null 
    }
  }

  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email }])
    .select()
    .single()

  return { data, error }
}
