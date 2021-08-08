# Generated by Django 3.2 on 2021-08-08 05:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('training', '0003_alter_exercise_img'),
    ]

    operations = [
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField(choices=[(1, 'One Star'), (2, 'Two Stars'), (3, 'Three Stars'), (4, 'Four Stars'), (5, 'Five Stars')])),
                ('name', models.CharField(max_length=255, verbose_name='training name')),
                ('description', models.CharField(max_length=5012, verbose_name='training description')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'trainings',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='TrainingRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField()),
                ('sets', models.IntegerField()),
                ('reps', models.IntegerField()),
                ('difficulty', models.CharField(choices=[('RPE', 'Rpe'), ('RIR', 'Rir'), ('Percentage', 'Percentage')], max_length=255)),
                ('exercise', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to='training.exercise')),
                ('training', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='training.training')),
            ],
            options={
                'db_table': 'training_records',
                'ordering': ['training__name'],
            },
        ),
        migrations.AddIndex(
            model_name='training',
            index=models.Index(fields=['name'], name='training_name_idx'),
        ),
    ]
