from django.contrib.auth.models import User
from django.db import models


class BodyPartsCategory(models.Model):
    name = models.CharField(verbose_name='name', max_length=127)
    description = models.CharField(verbose_name='description', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        db_table = 'body_parts_categories'
        indexes = [
            models.Index(fields=['name'], name='body_parts_cat_name_idx'),
        ]


class TrainingTypeCategory(models.Model):
    name = models.CharField(verbose_name='name', max_length=127)
    description = models.CharField(verbose_name='description', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        db_table = 'training_type_categories'
        indexes = [
            models.Index(fields=['name'], name='train_type_cat_name_idx'),
        ]


class Exercise(models.Model):
    ALLOWED_IMAGE_FORMAT = ['image/png', 'image/jpeg']

    name = models.CharField(verbose_name='name', max_length=127)
    description = models.CharField(verbose_name='description', max_length=255)
    img = models.TextField(verbose_name='image path', blank=True, null=True)
    category = models.ForeignKey(BodyPartsCategory, on_delete=models.CASCADE, verbose_name="exercise category")
    user = models.ForeignKey(User, on_delete=models.RESTRICT, default=1)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        db_table = 'exercises'
        indexes = [
            models.Index(fields=['name'], name='exercise_name_idx'),
        ]


class Training(models.Model):

    class Rating(models.IntegerChoices):
        ONE_STAR = 1
        TWO_STARS = 2
        THREE_STARS = 3
        FOUR_STARS = 4
        FIVE_STARS = 5

    rating = models.IntegerField(choices=Rating.choices)
    name = models.CharField(verbose_name='training name', max_length=255)
    description = models.CharField(verbose_name='training description', max_length=5012)
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def save_records(records):
        for record in records:
            new_record = TrainingRecord(record)
            new_record.save()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        db_table = 'trainings'
        indexes = [
            models.Index(fields=['name'], name='training_name_idx'),
        ]


class TrainingRecord(models.Model):

    class ExerciseDifficulty(models.TextChoices):
        RPE = 'RPE'
        RIR = 'RIR'
        Percentage = 'Percentage'

    exercise = models.ForeignKey(Exercise, on_delete=models.RESTRICT)
    weight = models.FloatField()
    sets = models.IntegerField()
    reps = models.IntegerField()
    difficulty = models.CharField(choices=ExerciseDifficulty.choices, max_length=64)
    difficulty_value = models.FloatField(null=True, blank=True, default=None)
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name='records')

    class Meta:
        ordering = ['training__name']
        db_table = 'training_records'
