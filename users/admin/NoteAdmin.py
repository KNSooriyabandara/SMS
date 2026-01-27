from django.contrib import admin
from users.models import Note

__all__ = ['NoteAdmin']


class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner')
    search_fields = ('title', 'owner__username')
    list_filter = ('owner',)
    ordering = ('title',)