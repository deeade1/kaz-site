import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
})



# your_project/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path 

from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path('graphql/', GraphqlSubscriptionConsumer)
    ]),
})