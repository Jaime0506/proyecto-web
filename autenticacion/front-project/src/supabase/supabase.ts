import { createClient } from "@supabase/supabase-js";

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const supabase = createClient(API_URL, API_KEY)


// Tipos para Supabase
export type Salon = {
    id: string
    nombre: string
    capacidad: number
    edificio: string
    piso: number
    tiene_proyector: boolean
    tiene_computadoras: boolean
    tiene_aire_acondicionado: boolean
    estudiantes_esperados: number
    estado: string
    created_at: string
    updated_at: string
  }
  
  export type Materia = {
    id: string
    nombre: string
    codigo: string
    profesor_id: string
    estudiantes_esperados: number
    requiere_proyector: boolean
    requiere_computadoras: boolean
    created_at: string
    updated_at: string
  }
  
  export type Horario = {
    id: string
    dia_semana: number
    hora_inicio: string
    hora_fin: string
    materia_id: string
    salon_id: string
    periodo_academico: string
    estado: string
    created_at: string
    updated_at: string
  }

  export async function crearSalon(formData: FormData) {
    const salon = Object.fromEntries(formData)
    
    // Convertir los campos booleanos de string a boolean
    

    const { data, error } = await supabase
      .from('salones')
      .insert([salon])
      .select()
  
    if (error) {
      return { success: false, error: error.message }
    }
  
    return { success: true, data }
  }