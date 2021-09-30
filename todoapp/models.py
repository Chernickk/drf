from django.db import models
from authapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=128)
    link = models.CharField(max_length=128, blank=True, null=True)
    user = models.ManyToManyField(User, related_name='project')


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='todo')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
