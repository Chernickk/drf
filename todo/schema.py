import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from authapp.models import User


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    todos_by_project_name = graphene.List(ToDoType, name=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_todos_by_project_name(root, info, name=None):
        if name:
            return ToDo.objects.filter(project__name=name)
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
