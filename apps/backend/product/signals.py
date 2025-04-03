from core.tasks import delete_from_storage_task
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.postgres.search import SearchVector
from .models import Category

@receiver(post_save, sender=Category)
def update_category_search_vector(sender, instance, **kwargs):
    instance.search_vector = (
        SearchVector('name', weight='A') +
        SearchVector('slug', weight='A') +
        SearchVector('description_plaintext', weight='B')
    )
    instance.save(update_fields=['search_vector'])


def delete_background_image(sender, instance, **kwargs):
    if img := instance.background_image:
        delete_from_storage_task.delay(img.name)


def delete_digital_content_file(sender, instance, **kwargs):
    if file := instance.content_file:
        delete_from_storage_task.delay(file.name)


def delete_product_media_image(sender, instance, **kwargs):
    if file := instance.image:
        delete_from_storage_task.delay(file.name)
