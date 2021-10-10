from rest_framework.viewsets import ModelViewSet

from .models import Project, ToDo
from .serializers import ProjectSerializer, ToDoSerializer
from .filters import ProjectFilterSet, ToDoFilterSet
from .paginators import ProjectPaginationClass, ToDoPaginationClass


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectPaginationClass
    filterset_class = ProjectFilterSet


class TodoViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()
    pagination_class = ToDoPaginationClass
    filterset_class = ToDoFilterSet

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
