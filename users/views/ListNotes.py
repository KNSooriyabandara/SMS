from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from users.responses import NoteResponse
from users.models import Note

__all__ = ['ListNotes']


class ListNotes(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = Note.objects.filter(owner=request.user)

        return Response(
            {
                "notes": NoteResponse(notes, many=True).data
            },
            status=status.HTTP_200_OK
        )
