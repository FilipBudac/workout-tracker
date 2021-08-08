from django.urls import path

from training.views import ExerciseList, BodyPartsCategoryList, ExerciseView, TrainingList, TrainingView, \
    TrainingRecordsList, TrainingRecordsView

urlpatterns = [
    path('exercises/', ExerciseList.as_view()),
    path('exercises/<int:pk>', ExerciseView.as_view()),
    path('categories/', BodyPartsCategoryList.as_view()),

    path('trainings/', TrainingList.as_view()),
    path('trainings/<int:pk>', TrainingView.as_view()),

    path('training-records/', TrainingRecordsList.as_view()),
    path('training-records/<int:pk>', TrainingRecordsView.as_view()),
]
