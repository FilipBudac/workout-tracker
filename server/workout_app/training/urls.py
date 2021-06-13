from django.urls import path

from training.views import ExerciseList, BodyPartsCategoryList, ExerciseView

urlpatterns = [
    path('exercises/', ExerciseList.as_view()),
    path('exercises/<int:pk>', ExerciseView.as_view()),
    path('categories/', BodyPartsCategoryList.as_view()),
]
