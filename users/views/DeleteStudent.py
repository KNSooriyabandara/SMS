from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from ..models.Student import Student

__all__ = ['DeleteStudent']

class DeleteStudent(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        if not request.user.is_staff or not request.user.has_perm('users.delete_student'):
            return Response(
                {"message": "You do not have permission to delete a student."},
                status=status.HTTP_403_FORBIDDEN
            )
        try:
            student = Student.objects.get(id=pk)
            student.delete()
            return Response(
                {"message": "Student deleted successfully"},
                status=status.HTTP_200_OK
            )
        except Student.DoesNotExist:
            return Response(
                {"message": "Student not found."},
                status=status.HTTP_404_NOT_FOUND
            )