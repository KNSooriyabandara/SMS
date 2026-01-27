from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from ..requests import StudentRequest

__all__ = ['RegisterStudent']

from ..responses import StudentResponse


class RegisterStudent(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        
        if not request.user.is_staff or not request.user.has_perm('users.add_student'):
            return Response(
                {"message": "You do not have permission to add a student."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = StudentRequest(data=request.data)
        if serializer.is_valid(raise_exception=True):
            student = serializer.save()
            return Response(
                {
                    "message": "Student registered successfully",
                    "student": StudentResponse(student).data
                },
                status=status.HTTP_201_CREATED
            )
