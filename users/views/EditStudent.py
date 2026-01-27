from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from ..models.Student import Student
from ..requests import StudentRequest
from ..responses import StudentResponse

__all__ = ['EditStudent']

class EditStudent(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        if not request.user.is_staff or not request.user.has_perm('users.change_student'):
            return Response(
                {"message": "You do not have permission to edit a student."},
                status=status.HTTP_403_FORBIDDEN
            )
        try:
            student = Student.objects.get(id=pk)
        except Student.DoesNotExist:
            return Response(
                {"message": "Student not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentRequest(student, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            updated_student = serializer.save()
            return Response(
                {
                    "message": "Student updated successfully",
                    "student": StudentResponse(updated_student).data
                },
                status=status.HTTP_200_OK
            )