import os
import shutil
import time

from django.forms import model_to_dict
from django_filters.rest_framework import DjangoFilterBackend
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from training.models import Exercise, BodyPartsCategory, Training, TrainingRecord
from training.serializers import ExerciseSerializer, BodyPartsCategorySerializer, TrainingSerializer, \
    TrainingRecordsSerializer
from workout_app import settings


class ExerciseList(ListCreateAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = Exercise
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'category__name', 'category__id', 'user']


class ExerciseView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = Exercise
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()


class ExerciseImage(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    LOCATION_ORIGIN = 'http://127.0.0.1:8000'

    def post(self, request):
        file = request.FILES['file']
        exercise_id = request.data.get('exercise_id')

        if not file or file.content_type not in Exercise.ALLOWED_IMAGE_FORMAT:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        exercise = get_object_or_404(Exercise, pk=exercise_id)

        path = f"{settings.UPLOADED_ROOT}/exercises/{exercise_id}"
        if os.path.exists(path):
            shutil.rmtree(path)
        os.makedirs(path)

        file_path = f"{path}/image_{time.time()}.jpg"
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()

        exercise.img = f"{self.LOCATION_ORIGIN}/{file_path}"
        exercise.save()

        return Response(
            data=model_to_dict(exercise),
            status=status.HTTP_200_OK
        )

    def delete(self, request):
        exercise_id = request.data.get('exercise_id')
        exercise = get_object_or_404(Exercise, pk=exercise_id)

        image_dir = f"{settings.UPLOADED_ROOT}/exercises/{exercise_id}"

        if not os.path.exists(image_dir):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            shutil.rmtree(image_dir)
        except OSError as e:
            print("error: %s - %s." % (e.filename, e.strerror))


class BodyPartsCategoryList(ListCreateAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = BodyPartsCategory
    serializer_class = BodyPartsCategorySerializer
    queryset = BodyPartsCategory.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class TrainingList(ListCreateAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = Training
    serializer_class = TrainingSerializer
    queryset = Training.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class TrainingView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = Training
    serializer_class = TrainingSerializer
    queryset = Training.objects.all()


class TrainingRecordsList(ListCreateAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = TrainingRecord
    serializer_class = TrainingRecordsSerializer
    queryset = TrainingRecord.objects.all()
    filter_backends = [DjangoFilterBackend]


class TrainingRecordsView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    model = TrainingRecord
    serializer_class = TrainingRecordsSerializer
    queryset = TrainingRecord.objects.all()
