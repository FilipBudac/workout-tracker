from django.urls import path, include

from training.views import (
    ExerciseList,
    BodyPartsCategoryList,
    ExerciseView,
    TrainingList,
    TrainingView,
    TrainingRecordsList,
    TrainingRecordsView,
    ExerciseImage
)

urlpatterns = [
    path('exercises/', include([
        path('', ExerciseList.as_view()),
        path('<int:pk>', ExerciseView.as_view()),
        path('image', ExerciseImage.as_view()),
    ])),

    path('trainings/', include([
        path('', TrainingList.as_view()),
        path('<int:pk>', TrainingView.as_view()),
    ])),

    path('training-records/', include([
        path('', TrainingRecordsList.as_view()),
        path('<int:pk>', TrainingRecordsView.as_view()),
    ])),

    path('categories/', BodyPartsCategoryList.as_view()),
]

