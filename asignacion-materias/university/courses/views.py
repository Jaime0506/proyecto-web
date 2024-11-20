import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from supabase import create_client, Client
from django.http import JsonResponse
from datetime import datetime
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@api_view(['GET'])
def get_alumno_by_id(request):
    try:
        alumno_id = request.GET.get('id')  
        if not alumno_id:
            return Response({"error": "ID del alumno es requerido"}, status=status.HTTP_400_BAD_REQUEST)

        response = supabase.table("alumno").select("*").eq("id_alumno", alumno_id).execute()

        if response.data:
            return Response(response.data[0], status=status.HTTP_200_OK)  
        else:
            return Response({"error": "Alumno no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def test_view(request):
    """Endpoint de prueba para verificar que el API está funcionando."""
    return Response({"message": "Test successful"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_course_registration(request):
    if request.method == 'POST':
        data = request.data
        try:
            nombre_asignatura = data.get('nombre') 

            response = supabase.table('asignatura').select('id_asignatura').eq('nombre', nombre_asignatura).execute()

            if response.data: 
                return Response({"id_asignatura": response.data[0]['id_asignatura']}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Asignatura no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_asignaturas(request):
    
    try:
        response = supabase.table("asignatura").select("*").execute()

        if response.data:
            return Response(response.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No data found"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_asignatura_by_nombre(request):
    nombre_asignatura = request.query_params.get('nombre')
    if not nombre_asignatura:
        return Response({"error": "Nombre de asignatura no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        asignatura_response = supabase.table("asignatura").select("id_asignatura").ilike("nombre", nombre_asignatura).execute()

        
        if asignatura_response.data:
            id_asignatura = asignatura_response.data[0]['id_asignatura']
        else:
            return JsonResponse({"error": "Asignatura no encontrada"}, status=404)

        docentes_response = supabase.table("asignacion_docente").select("id_docente").eq("id_asignatura", id_asignatura).execute()
        
        docentes = []
        for docente in docentes_response.data:
            docente_info = supabase.table("docente").select("nombre, apellido").eq("id_docente", docente['id_docente']).execute()
            if docente_info.data:
                docentes.append({
                    "id_docente": docente['id_docente'],
                    "nombre": docente_info.data[0]['nombre'],
                    "apellido": docente_info.data[0]['apellido']
                })

        horarios_response = supabase.table("horario").select("dia, hora_inicio, hora_fin").eq("id_asignatura", id_asignatura).execute()
        horarios = [{"dia": h['dia'], "hora_inicio": h['hora_inicio'], "hora_fin": h['hora_fin']} for h in horarios_response.data]

        return JsonResponse({"id_asignatura": id_asignatura, "docentes": docentes, "horarios": horarios}, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@api_view(['POST'])
def registrar_inscripcion(request):
    id_alumno = request.data.get('id_alumno')
    asignaturas = request.data.get('asignaturas')  

    if not id_alumno or not asignaturas:
        return Response({"error": "ID del alumno y asignaturas son requeridos"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        fecha_inscripcion = datetime.now().date().isoformat()
        inscripciones = []

        for asignatura in asignaturas:
            id_asignatura = asignatura['id_asignatura']
            
            response_inscripcion = supabase.table("inscripcion").insert({
                "fecha_inscripcion": fecha_inscripcion,
                "id_asignatura": id_asignatura,
                "id_alumno": id_alumno,
                "id_administrativo": 1  
            }).execute()

            if not response_inscripcion.data:
                raise Exception(f"Error al registrar la inscripción: {response_inscripcion.error}")
            
            inscripciones.append(response_inscripcion.data)

            for horario in asignatura['horarios']:
                response_horario_estudiante = supabase.table("horario_estudiante").insert({
                    "id_alumno": id_alumno,
                    "id_asignatura": id_asignatura,
                    "id_docente": asignatura['id_docente'],  
                    "dia": horario['dia'],
                    "hora_inicio": horario['hora_inicio'],
                    "hora_fin": horario['hora_fin']
                }).execute()

                if not response_horario_estudiante.data:
                    raise Exception(f"Error al registrar el horario: {response_horario_estudiante.error}")
                
        return Response({
            "inscripciones": inscripciones,
            "mensaje": "Inscripción y horarios registrados correctamente"
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)