from django_filters.rest_framework import DjangoFilterBackend
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from rest_framework import generics, permissions

from training.models import Exercise, BodyPartsCategory
from training.serializers import ExerciseSerializer, BodyPartsCategorySerializer


class ExerciseList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    model = Exercise
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'category__name', 'category__id']


class BodyPartsCategoryList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    model = BodyPartsCategory
    serializer_class = BodyPartsCategorySerializer
    queryset = BodyPartsCategory.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']
