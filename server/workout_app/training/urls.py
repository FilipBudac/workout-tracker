from django.urls import path

from training.views import ExerciseList, BodyPartsCategoryList

urlpatterns = [
    path('exercises/', ExerciseList.as_view()),
    path('categories/', BodyPartsCategoryList.as_view()),
]
