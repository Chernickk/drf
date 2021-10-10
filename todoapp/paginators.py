from rest_framework.pagination import LimitOffsetPagination


class ProjectPaginationClass(LimitOffsetPagination):
    default_limit = 10


class ToDoPaginationClass(LimitOffsetPagination):
    default_limit = 20