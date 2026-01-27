from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from users.models.Note import Note
from users.requests import NoteRequest
from users.responses import NoteResponse

__all__ = ['EditNote']

class EditNote(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            note = Note.objects.get(id=pk, owner=request.user)
        except Note.DoesNotExist:
            return Response(
                {"message": "Note not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = NoteRequest(note, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        updated_note = serializer.save()

        return Response(
            {
                "message": "Note updated successfully",
                "note": NoteResponse(updated_note).data
            },
            status=status.HTTP_200_OK
        )