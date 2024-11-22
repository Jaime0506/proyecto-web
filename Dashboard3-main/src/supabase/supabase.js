import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://yavmmbxesjyhipjijpyk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhdm1tYnhlc2p5aGlwamlqcHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwMzYwNDIsImV4cCI6MjA0MDYxMjA0Mn0.fMkCFWraqpST81cVrHPfIVhvpLYKN2QCLIMlTA3mjjo')