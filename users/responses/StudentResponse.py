from rest_framework import serializers

from users.models import Student

__all__ = ['StudentResponse']


class StudentResponse(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id','username', 'email','registration_number')
