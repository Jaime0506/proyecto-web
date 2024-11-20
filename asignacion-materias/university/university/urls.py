from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('courses.urls')),  # Incluye las rutas de la aplicación 'courses'
]