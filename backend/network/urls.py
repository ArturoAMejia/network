
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

# router.register(r'post', views.PostViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("post", views.PostView.as_view(), name="post")
]
