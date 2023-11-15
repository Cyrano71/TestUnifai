from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path("create/", csrf_exempt(views.create_secretsanta), name="create_secretsanta"),
    path("latest/", csrf_exempt(views.get_last_secret_santa), name="get_last_secret_santa"),
]