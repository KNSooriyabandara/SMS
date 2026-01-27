from django.contrib import admin

from users.models import Student, Note
from .StudentAdmin import StudentAdmin
from .NoteAdmin import NoteAdmin

admin.site.register(Note, NoteAdmin)

