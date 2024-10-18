import { createClient } from '@supabase/supabase-js'



const supabaseUrl = import.meta.env.VITE_APIURL
const supabaseAnonKey = import.meta.env.VITE_APIKEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
