// SupabaseTest.test.js
import { describe, it, expect, vi } from "vitest";
import { createClient } from "@supabase/supabase-js";

// Mock de los datos de ejemplo que devuelve supabase
const mockData = [
  { id_administrativo: 5, nombre: 'Laura', apellido: 'Jiménez', email: 'laura.jimenez@example.com', departamento: 'Admisiones' },
  { id_administrativo: 6, nombre: 'Pedro', apellido: 'Sánchez', email: 'pedro.sanchez@example.com', departamento: 'Finanzas' },
  { id_administrativo: 7, nombre: 'María', apellido: 'Pérez', email: 'maria.perez@example.com', departamento: 'Registro Académico' },
  { id_administrativo: 1, nombre: 'Camilo', apellido: 'Puentes', email: 'camilo@example.com', departamento: 'NA' },
];

// Crear un cliente Supabase simulado
const supabase = createClient('https://yavmmbxesjyhipjijpyk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhdm1tYnhlc2p5aGlwamlqcHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwMzYwNDIsImV4cCI6MjA0MDYxMjA0Mn0.fMkCFWraqpST81cVrHPfIVhvpLYKN2QCLIMlTA3mjjo');

// Mock de la función `supabase.from().select()` para devolver los datos simulados
vi.mock("@supabase/supabase-js", () => {
  return {
    createClient: () => ({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockData,
          error: null,
        }),
      }),
    }),
  };
});

describe("Supabase data fetching", () => {
  it("debe recibir datos desde la tabla 'administrativo'", async () => {
    const { data, error } = await supabase.from("administrativo").select();

    // Verifica que no haya errores
    expect(error).toBeNull();

    // Verifica que los datos recibidos sean los esperados
    expect(data).toEqual(expect.arrayContaining([
      expect.objectContaining({ id_administrativo: 5, nombre: 'Laura' }),
      expect.objectContaining({ id_administrativo: 6, nombre: 'Pedro' }),
      expect.objectContaining({ id_administrativo: 7, nombre: 'María' }),
      expect.objectContaining({ id_administrativo: 1, nombre: 'Camilo' }),
    ]));

    // Verifica que se haya llamado la función de supabase
    expect(supabase.from("administrativo").select).toHaveBeenCalled();
  });
});
