from rest_framework import serializers
from users.models import Note

__all__ = ['NoteResponse']


class NoteResponse(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'content', 'created_at')
