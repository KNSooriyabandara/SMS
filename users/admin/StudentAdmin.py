from django.contrib import admin
from users.models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'registration_number', 'created_at')
    search_fields = ('username', 'email', 'registration_number')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    fieldsets = (
        (None, {
            'fields': ('username', 'email', 'registration_number', 'first_name', 'last_name')
        }),
        ('Date Information', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )