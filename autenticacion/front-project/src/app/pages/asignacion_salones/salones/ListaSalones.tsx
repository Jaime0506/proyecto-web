import React, { useEffect, useState } from 'react'
import { supabase, Salon } from '../../../../supabase/supabase'
import { Card, CardContent } from '../../microdesafios/components/ui/card'
import { Button } from '../../microdesafios/components/ui/button'

export const ListaSalones: React.FC = () => {
  const [salones, setSalones] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarSalones()
  }, [])

  const cargarSalones = async () => {
    try {
      const { data, error } = await supabase
        .from('salones')
        .select('*')
        .order('nombre')

      if (error) throw error
      setSalones(data || [])
    } catch (error) {
      console.error('Error cargando salones:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Salones</h2>
        <Button onClick={() => {}}>
          Agregar Salón
        </Button>
      </div>
      {salones.length === 0 ? (
        <p className="text-center text-gray-500">No hay salones disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {salones.map((salon) => (
            <Card key={salon.id}>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{salon.nombre}</h3>
                <p>Capacidad: {salon.capacidad} estudiantes</p>
                <p>Edificio: {salon.edificio}, Piso: {salon.piso}</p>
                <p>Estado: {salon.estado}</p>
                <div className="mt-2">
                  {salon.tiene_proyector && <span className="mr-2">📽️ Proyector</span>}
                  {salon.tiene_computadoras && <span className="mr-2">💻 Computadoras</span>}
                  {salon.tiene_aire_acondicionado && <span>❄️ Aire Acondicionado</span>}
                </div>
                <p className="mt-2 text-sm text-gray-600">Creado: {new Date(salon.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Última actualización: {new Date(salon.updated_at).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}