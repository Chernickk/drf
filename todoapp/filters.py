from django_filters import DateFilter
from django_filters.rest_framework import FilterSet

from .views import Project, ToDo


class ProjectFilterSet(FilterSet):
    class Meta:
        model = Project
        fields = {
            'name': ['exact', 'contains']
        }


class ToDoFilterSet(FilterSet):
    from_date = DateFilter(field_name='created', lookup_expr='gte')
    to_date = DateFilter(field_name='created', lookup_expr='lte')

    class Meta:
        model = ToDo
        fields = {
            'project__name': ['exact', 'contains']
        }
