# Generated by Django 3.2 on 2021-08-08 13:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0005_alter_training_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainingrecord',
            name='exercise',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='training.exercise'),
        ),
        migrations.AlterField(
            model_name='trainingrecord',
            name='training',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='records', to='training.training'),
        ),
    ]