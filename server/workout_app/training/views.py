from django_filters.rest_framework import DjangoFilterBackend
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.mixins import DestroyModelMixin
from rest_framework.permissions import IsAuthenticated

from training.models import Exercise, BodyPartsCategory
from training.serializers import ExerciseSerializer, BodyPartsCategorySerializer


class ExerciseList(ListCreateAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = Exercise
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'category__name', 'category__id']


class ExerciseView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = Exercise
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()


class BodyPartsCategoryList(ListCreateAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = BodyPartsCategory
    serializer_class = BodyPartsCategorySerializer
    queryset = BodyPartsCategory.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']
