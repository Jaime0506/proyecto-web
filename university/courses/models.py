from django.db import models

class CourseRegistration(models.Model):
    id_registro = models.AutoField(primary_key=True)
    id_estudiante = models.IntegerField()
    nombre_estudiante = models.CharField(max_length=100)
    nombre_materia = models.CharField(max_length=100)
    descripcion_materia = models.TextField()
    nombre_profesor = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre_estudiante} - {self.nombre_materia}'