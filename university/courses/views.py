from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CourseRegistration
from .serializers import CourseRegistrationSerializer

@api_view(['POST'])
def create_course_registration(request):
    if request.method == 'POST':
        serializer = CourseRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)