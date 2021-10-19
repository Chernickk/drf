from django.test import TestCase
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_401_UNAUTHORIZED
from rest_framework.test import APITestCase, APIClient, APIRequestFactory, force_authenticate
from mixer.backend.django import mixer

from authapp.models import User
from .models import ToDo, Project
from .views import TodoViewSet


class TestToDoViewSet(APITestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_superuser(username='superuser', email='superuser@test.com', password='psw')
        self.client.login(username='superuser', password='psw')

    def test_get_list(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_post_data(self):
        todo = mixer.blend(ToDo)
        response = self.client.post('/api/todos/', {
            'project': todo.project.pk,
            'user': todo.user.pk,
            'text': todo.text,
        })
        self.assertEqual(response.status_code, HTTP_201_CREATED)


class TestProjectViewSet(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user = User.objects.create_superuser(username='superuser', email='superuser@test.com', password='psw')
        self.client.login(username='superuser', password='psw')

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_post_data(self):
        project = mixer.blend(Project)
        response = self.client.post('/api/projects/', {
            'name': project.name,
            'user': [self.user.pk],
        })
        self.assertEqual(response.status_code, HTTP_201_CREATED)


class TestToDoAgainViewSet(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user = User.objects.create_superuser(username='superuser', email='superuser@test.com', password='psw')
        self.client.login(username='superuser', password='psw')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todos/')
        view = TodoViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)
        force_authenticate(request, self.user)
        response = view(request)
        self.assertEqual(response.status_code, HTTP_200_OK)

