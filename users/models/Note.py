from django.db import models
from django.conf import settings   
class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notes")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title