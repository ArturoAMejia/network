
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

router = routers.DefaultRouter()

# router.register(r'post', views.PostViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("post", views.PostView.as_view(), name="post"),
    path("follow", views.FollowView.as_view(), name="follow"),
    path("follower/<int:pk>", views.UserFollowView.as_view(), name="follower"),
    path("like", views.LikePostView.as_view(), name="like"),
    path("user", views.UserView.as_view(), name="user"),
]
