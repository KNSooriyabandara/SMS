from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from ..models import Student
from ..responses import StudentResponse

__all__ = ['RetrieveStudent']


class RetrieveStudent(APIView):
    # ✅ Require authentication globally
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        # ✅ Extra authorization check
        if not request.user.is_staff or not request.user.has_perm('users.view_student'):
            return Response(
                {"message": "You do not have permission to view a student."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            student = Student.objects.get(pk=pk)
            return Response(
                StudentResponse(student).data,
                status=status.HTTP_200_OK
            )
        except Student.DoesNotExist:
            return Response(
                {"error": "Student does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )