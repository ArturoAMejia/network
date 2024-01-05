from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .serializers import PostSerializer, FollowSerializer, UserSerializer, LikeSerializer
from .models import Follow, Post, User, Like
import json

def index(request):
    return render(request, "network/index.html")

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        print("---------")
        data = json.loads(request.body)
        print(data)
        print("---------")

        # Attempt to sign user in

        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        print(user)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful"}, safe=False, status=200)
        else:
            return JsonResponse({"error": "Invalid username and/or password."}, safe=False, status=400)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


class PostView(APIView):
    def get(self, request):
        # Change user value, user_id come from cookies
        follow = Follow.objects.select_related("user").all().filter(user=2).values_list("followed_user", flat=True)
        posts = Post.objects.all().filter(user__in=follow)
        users = User.objects.all().filter(id__in=follow).values()
        # posts = Post.objects.all().filter(user__in=follow).values().order_by("-created_at")
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"error":"Invalid data"}, safe=False)
        
        serializer.save()
        return JsonResponse(serializer.data, safe=False)
    
    def put(self, request):
        serializer = PostSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"error":"Invalid data"}, safe=False)
        
        serializer.save()
        return JsonResponse(serializer.data, safe=False)


class FollowView(APIView):
    def post(self, request):
        serializer = FollowSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse({"test":"test"}, safe=False)
    

class UserView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)


class UserFollowView(APIView):
    def followers_by_user(self, user):
        return Follow.objects.filter(followed_user=user).count()
    def following_by_user(self, user):
        return Follow.objects.filter(user=user).count()
    
    def get(self, request, pk):
        followers = self.followers_by_user(pk)
        following = self.following_by_user(pk)
        return JsonResponse({ "follwers" : followers, "following": following }, safe=False)


class LikePostView(APIView):
    def get(self, request, user_id):

        likes = Like.objects.filter(user=user_id).count()
        return JsonResponse({ "likes": likes }, safe=False)
    
    def post(self, request):

        like = Like.objects.filter(user=request.data["user"], post=request.data["post"])

        if like.exists():
            return JsonResponse({"error": "Already liked"}, safe=False)
        
        serializer = LikeSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"error": "Invalid data"}, safe=False)
        
        serializer.save()
        return JsonResponse(serializer.data, safe=False)
    
    def delete(self, request):

        serializer = LikeSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"error": "Invalid data"}, safe=False)
        
        serializer.save()
        
        return JsonResponse({"message": "Unlike done"}, safe=False)
        
