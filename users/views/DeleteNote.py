from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from users.models.Note import Note

__all__ = ['DeleteNote']

class DeleteNote(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            note = Note.objects.get(id=pk, owner=request.user)
        except Note.DoesNotExist:
            return Response(
                {"message": "Note not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        note.delete()
        return Response(
            {"message": "Note deleted successfully"},
            status=status.HTTP_200_OK
        )