from rest_framework import serializers

from training.models import Exercise, BodyPartsCategory


class ExerciseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', required=False)
    category_desc = serializers.CharField(source='category.description', required=False)

    class Meta:
        model = Exercise
        fields = ('id', 'name', 'description', 'category', 'img', 'category_name', 'category_desc')


class BodyPartsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BodyPartsCategory
        fields = ('id', 'name', 'description')
