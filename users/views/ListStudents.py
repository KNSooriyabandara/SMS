import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import Student
from users.responses import StudentResponse

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

__all__ = ['ListStudents']

class ListStudents(APIView):
    def get(self, request):
        students = Student.objects.all()
        return Response(data=StudentResponse(students, many=True).data, status=status.HTTP_200_OK)