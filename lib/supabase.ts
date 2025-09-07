import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface WaitlistEntry {
  id?: string
  created_at?: string
  email: string
}

// Waitlist form submission
export async function addToWaitlist(email: string) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email }])
    .select()

  if (error) {
    throw error
  }

  return data
}
