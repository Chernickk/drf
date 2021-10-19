from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

from .models import User
from .serializers import UserSerializer, UserSerializerV2


class UserViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    # serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserSerializerV2
        return UserSerializer
