# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class Student(AbstractUser):
    registration_number = models.CharField(max_length=100, unique=True, verbose_name='Registration Number')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')

    def __str__(self):
        return f'{self.username} - {self.registration_number}'