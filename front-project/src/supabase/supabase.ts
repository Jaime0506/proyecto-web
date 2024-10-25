import { createClient } from "@supabase/supabase-js";

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const supabase = createClient(API_URL, API_KEY)