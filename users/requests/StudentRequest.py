from rest_framework import serializers
from users.models import Student

__all__ = ['StudentRequest']


class StudentRequest(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        required=False  #  optional on update
    )

    class Meta:
        model = Student
        fields = ('id', 'username', 'email', 'password', 'registration_number')
        read_only_fields = ('id',)

    def create(self, validated_data):
        return Student.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        # Update fields
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.registration_number = validated_data.get('registration_number', instance.registration_number)

        # Handle password separately
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance