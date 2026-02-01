import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          role: 'athlete' | 'scout' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          email?: string
          role?: 'athlete' | 'scout' | 'admin'
          created_at?: string
        }
      }
      athlete_profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          age: number
          city: string
          country: string
          sport: string
          position: string | null
          level: 'high_school' | 'college' | 'academy' | 'semi_pro'
          height: string | null
          weight: string | null
          graduation_year: number | null
          highlights_url: string | null
          photo_url: string | null
          is_verified: boolean
          contact_email_visible: boolean
          contact_phone_visible: boolean
          phone: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
