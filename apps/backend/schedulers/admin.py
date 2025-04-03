from django.contrib import admin

from .models import CustomPeriodicTask, CustomSchedule


@admin.register(CustomSchedule)
class CustomScheduleAdmin(admin.ModelAdmin):
    model = CustomSchedule


@admin.register(CustomPeriodicTask)
class CustomPeriodicTaskAdmin(admin.ModelAdmin):
    model = CustomPeriodicTask
