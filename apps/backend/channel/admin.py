from django.contrib import admin

from channel.models import Channel


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    model = Channel
