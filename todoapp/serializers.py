from rest_framework import serializers

from .models import Project, ToDo
from authapp.serializers import UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(serializers.ModelSerializer):
    # project = ProjectSerializer()
    # user = UserSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
