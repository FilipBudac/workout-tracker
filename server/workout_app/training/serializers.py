from rest_framework import serializers

from training.models import Exercise, BodyPartsCategory


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('name', 'description', 'category', 'img')


class BodyPartsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BodyPartsCategory
        fields = ('name', 'description')
