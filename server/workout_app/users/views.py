from django.contrib.auth.models import User, Group, update_last_login
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from oauth2_provider.models import AccessToken, RefreshToken
from oauth2_provider.settings import oauth2_settings
from oauth2_provider.views.mixins import OAuthLibMixin
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from rest_framework import generics, permissions, status
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serializers import UserSerializer, GroupSerializer, RegisterSerializer, LoginSerializer


def destroy_tokens(user: User):
    access_token = AccessToken.objects.filter(user=user)
    if access_token:
        access_token.delete()

    refresh_token = RefreshToken.objects.filter(user=user)
    if refresh_token:
        refresh_token.delete()


class UserList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']


class UserDetails(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class Login(APIView, OAuthLibMixin):
    permission_classes = (permissions.AllowAny,)
    server_class = oauth2_settings.OAUTH2_SERVER_CLASS
    validator_class = oauth2_settings.OAUTH2_VALIDATOR_CLASS
    oauthlib_backend_class = oauth2_settings.OAUTH2_BACKEND_CLASS

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        destroy_tokens(user)

        url, headers, body, stat = self.create_token_response(request)
        body = json.loads(body)

        if stat != status.HTTP_200_OK:
            return Response(data={'error': body.get('error_description')}, status=status.HTTP_400_BAD_REQUEST)

        update_last_login(None, user)

        data = {
            'auth': body,
            'user': UserSerializer(user).data,
            'status': status.HTTP_200_OK
        }

        return Response(data, status=status.HTTP_200_OK)


class Register(APIView, OAuthLibMixin):
    permission_classes = (permissions.AllowAny,)
    server_class = oauth2_settings.OAUTH2_SERVER_CLASS
    validator_class = oauth2_settings.OAUTH2_VALIDATOR_CLASS
    oauthlib_backend_class = oauth2_settings.OAUTH2_BACKEND_CLASS

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            with transaction.atomic():
                user = serializer.save()
                user.set_password(user.password)
                user.save()

                data = {'user': UserSerializer(user).data}

                return Response(data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView, OAuthLibMixin):
    permission_classes = (permissions.AllowAny,)
    server_class = oauth2_settings.OAUTH2_SERVER_CLASS
    validator_class = oauth2_settings.OAUTH2_VALIDATOR_CLASS
    oauthlib_backend_class = oauth2_settings.OAUTH2_BACKEND_CLASS

    def post(self, request):
        user_id = request.data.get('user_id')

        if not user_id:
            return Response(data={'error': 'User id hasn\'t been provided.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(pk=user_id)

        if not user:
            return Response(data={'error': 'User not found.'}, status=status.HTTP_400_BAD_REQUEST)

        destroy_tokens(user)

        return Response()

