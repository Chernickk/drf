"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from authapp.views import UserViewSet
from todoapp.views import ProjectViewSet, TodoViewSet


schema_view = get_schema_view(
    openapi.Info(
        title="ToDo",
        default_version='1.0',
        description='Documentation to ToDo project',
        contact=openapi.Contact(email='someemail'),
        license=openapi.License(name='My license')
    ),
    public=True,
    permission_classes=[AllowAny],
)


router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('projects', ProjectViewSet, basename='projects')
router.register('todos', TodoViewSet, basename='todos')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),

]
