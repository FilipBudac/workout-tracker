from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.content)
        instance.first_name = validated_data.get('first_name', instance.content)
        instance.last_name = validated_data.get('last_name', instance.content)
        instance.password = validated_data.get('password', instance.content)

        instance.save()

        return instance

    def validate(self, data):
        password = data.get('password', None)
        confirm_password = data.get('confirm_password', None)

        if not password or not confirm_password:
            raise serializers.ValidationError(_("Empty Password"))

        if password != confirm_password:
            raise serializers.ValidationError(_("Password mismatch"))

        data.pop('confirm_password', None)

        return data

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'password', 'email', 'confirm_password', 'is_active')
        extra_kwargs = {
            'password': {'write_only': True}
        }


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        max_length=128,
        write_only=True
    )

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError(_("Invalid credentials given."))

        if not user.is_active:
            raise serializers.ValidationError(_("User account is disabled"))

        return user
