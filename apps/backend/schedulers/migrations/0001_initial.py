# Generated by Django 5.0.7 on 2024-12-09 19:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("django_celery_beat", "0019_alter_periodictasks_options"),
    ]

    operations = [
        migrations.CreateModel(
            name="CustomSchedule",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "schedule_import_path",
                    models.CharField(
                        help_text="The python import path where the Celery scheduler is defined at",
                        max_length=255,
                        unique=True,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CustomPeriodicTask",
            fields=[
                (
                    "periodictask_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="django_celery_beat.periodictask",
                    ),
                ),
                (
                    "custom",
                    models.ForeignKey(
                        blank=True,
                        help_text="Custom Schedule to run the task on. Set only one schedule type, leave the others null.",
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="schedulers.customschedule",
                        verbose_name="Custom Schedule",
                    ),
                ),
            ],
            bases=("django_celery_beat.periodictask",),
        ),
    ]
