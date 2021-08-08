from django.db import transaction, IntegrityError
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from training.models import Exercise, BodyPartsCategory, Training, TrainingRecord


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


class TrainingRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingRecord
        fields = ('id', 'weight', 'sets', 'reps', 'difficulty', 'training', 'exercise')


class TrainingSerializer(serializers.ModelSerializer):
    records = TrainingRecordsSerializer(many=True, read_only=True)

    def create(self, validated_data):
        records = self.initial_data.pop('records', [])

        try:
            with transaction.atomic():
                training = Training.objects.create(**validated_data)

                for record in records:
                    record['training'] = training.id
                    new_record = TrainingRecordsSerializer(data=record)
                    new_record.is_valid(raise_exception=True)
                    new_record.save()

        except ValidationError as e:
            raise serializers.ValidationError({'error': e})
        except IntegrityError as e:
            raise serializers.ValidationError({'error': e})

        return training

    class Meta:
        model = Training
        fields = '__all__'
        # depth = 1
