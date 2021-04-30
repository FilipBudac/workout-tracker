from django.db import models


class BodyPartsCategory(models.Model):
    name = models.CharField(verbose_name='name', max_length=127)
    description = models.CharField(verbose_name='description', max_length=255)

    class Meta:
        ordering = ['name']
        db_table = 'body_parts_categories'
        indexes = [
            models.Index(fields=['name'], name='body_parts_cat_name_idx'),
        ]


class TrainingTypeCategory(models.Model):
    name = models.CharField(verbose_name='name', max_length=127)
    description = models.CharField(verbose_name='description', max_length=255)

    class Meta:
        ordering = ['name']
        db_table = 'training_type_categories'
        indexes = [
            models.Index(fields=['name'], name='train_type_cat_name_idx'),
        ]


class Exercise(models.Model):
    name = models.CharField(verbose_name='name', max_length=127)
    description = models.CharField(verbose_name='description', max_length=255)
    img = models.CharField(verbose_name='image path', max_length=255, blank=True, null=True)
    category = models.ForeignKey(BodyPartsCategory, on_delete=models.CASCADE, verbose_name="exercise category")

    class Meta:
        ordering = ['name']
        db_table = 'exercises'
        indexes = [
            models.Index(fields=['name'], name='exercise_name_idx'),
        ]
