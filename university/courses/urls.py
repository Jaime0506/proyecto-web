from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_course_registration, name='create_course_registration'),
]