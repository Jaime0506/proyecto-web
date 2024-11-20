// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Configuración del cliente de Supabase
const supabaseUrl = import.meta.env.VITE_API_URL
const supabaseAnonKey = import.meta.env.VITE_API_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export interface UserProgress {
  id?: number
  user_id: string
  game_type: string
  score: number
  total_questions: number
  mistakes: number
  created_at?: string
}

// Función para guardar progreso del juego
export const saveGameProgress = async (progress: UserProgress) => {
  try {
    const { data, error } = await supabase
      .from('user_game_progress')
      .insert(progress)
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error guardando progreso:', error)
    return null
  }
}

// Función para obtener progreso histórico
export const getUserGameHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_game_progress')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error obteniendo historial:', error)
    return null
  }
}