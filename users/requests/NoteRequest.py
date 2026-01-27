from rest_framework import serializers
from users.models import Note

__all__ = ['NoteRequest']


class NoteRequest(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('title', 'content')
