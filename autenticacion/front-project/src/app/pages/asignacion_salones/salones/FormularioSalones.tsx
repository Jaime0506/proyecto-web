import React, { useState } from 'react'
import { crearSalon } from '../../../../supabase/supabase'
import { Button } from "../../microdesafios/components/ui/button"
import { Input } from "../../microdesafios/components/ui/Input"
import { Checkbox } from "../../microdesafios/components/ui/Checkbox"
import { Label } from "../../microdesafios/components/ui/Label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../microdesafios/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../microdesafios/components/ui/select"

export default function FormularioSalon() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError('')
    setSuccess(false)

    const formData = new FormData(event.currentTarget)
    const result = await crearSalon(formData)
    
    setIsPending(false)
    if (result.success) {
      setSuccess(true)
      // Opcionalmente, puedes resetear el formulario aquí
      event.currentTarget.reset()
    } else {
      setError(result.error || 'Ocurrió un error al crear el salón')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Asignación de Salón</CardTitle>
        <CardDescription>Ingrese los detalles del nuevo salón</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Salón</Label>
            <Input id="nombre" name="nombre" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacidad">Capacidad</Label>
            <Input id="capacidad" name="capacidad" type="number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edificio">Edificio</Label>
            <Input id="edificio" name="edificio" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="piso">Piso</Label>
            <Input id="piso" name="piso" type="number" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="tiene_proyector" name="tiene_proyector" />
            <Label htmlFor="tiene_proyector">Tiene Proyector</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="tiene_computadoras" name="tiene_computadoras" />
            <Label htmlFor="tiene_computadoras">Tiene Computadoras</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="tiene_aire_acondicionado" name="tiene_aire_acondicionado" />
            <Label htmlFor="tiene_aire_acondicionado">Tiene Aire Acondicionado</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Select name="estado" defaultValue="disponible">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="ocupado">Ocupado</SelectItem>
                <SelectItem value="mantenimiento">En Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar Salón'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Salón creado exitosamente</p>}
    </Card>
  )
}