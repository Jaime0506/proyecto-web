
from django.urls import path
from .views import create_course_registration, get_asignaturas, get_asignatura_by_nombre, test_view, registrar_inscripcion, get_alumno_by_id, registrar_inscripcion

urlpatterns = [
    path('create/', create_course_registration, name='create_course_registration'), 
    path('asignaturas/', get_asignaturas, name='get_asignaturas'), 
    path('get_asignatura_by_nombre/', get_asignatura_by_nombre, name='get_asignatura_by_nombre'),  
    path('test/', test_view, name='test_view'),  
    path('registrar_inscripcion/', registrar_inscripcion, name='registrar_inscripcion'), 
    path('create_course_registration/', create_course_registration, name='create_course_registration'),
    path('get_alumno_by_id/', get_alumno_by_id, name='get_alumno_by_id'),
    path('registrar_inscripcion/', registrar_inscripcion, name='registrar_inscripcion'),
]

