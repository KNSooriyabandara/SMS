from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from users.requests import NoteRequest
from users.responses import NoteResponse

__all__ = ['CreateNote']


class CreateNote(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = NoteRequest(data=request.data)
        serializer.is_valid(raise_exception=True)

        note = serializer.save(owner=request.user)

        return Response(
            {
                "message": "Note created successfully",
                "note": NoteResponse(note).data
            },
            status=status.HTTP_201_CREATED
        )
