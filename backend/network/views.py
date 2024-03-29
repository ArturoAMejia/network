from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .serializers import GetPostSerializer, PostSerializer, FollowSerializer, UserSerializer, LikeSerializer
from .models import Follow, Post, User, Like
import json
from django.core.paginator import Paginator


def index(request):
    return render(request, "network/index.html")

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        # Attempt to sign user in
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data, safe=False, status=200)
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
        page = request.GET.get('page', 1)
        posts = Post.objects.all().order_by("-created_at")
        serializer = GetPostSerializer(posts, many=True)
        paginator = Paginator(serializer.data, 10)
        r = paginator.page(page).object_list
        return JsonResponse({"posts": r, "numberOfPages" : paginator.num_pages}, safe=False)
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"error":"Invalid data"}, safe=False, status=400)
        
        serializer.save()
        return JsonResponse(serializer.data, safe=False)
    
    def put(self, request):
        post = Post.objects.filter(id=request.data["id"]).update(content=request.data["content"])
        serializer = PostSerializer(post)
        return JsonResponse(post, safe=False)


class FollowView(APIView):
    def post(self, request):
        follow = Follow.objects.filter(user=request.data["user"], followed_user=request.data["followed_user"])

        if follow.exists():
            follow = Follow.objects.filter(user=request.data["user"], followed_user=request.data["followed_user"]).delete()
            return JsonResponse({"message": "Unfollow done"}, safe=False)
        
        serializer = FollowSerializer(data=request.data)
        if not serializer.is_valid():
            return JsonResponse({"error":"Invalid data"}, safe=False, status=400)
        
        serializer.save()
        return JsonResponse(serializer.data, safe=False)
    

class UserView(APIView):
    def get(self, request, username):

        user = User.objects.get(username=username)
        serializer = UserSerializer(user)
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
    def get(self, request):
        user_id = request.headers.get("Authorization")

        likes = Like.objects.filter(user=user_id).count()
        return JsonResponse({ "likes": likes }, safe=False)
    
    def post(self, request):

        like = Like.objects.filter(user=request.data["user"], post=request.data["post"])

        if like.exists():
            like = Like.objects.filter(user=request.data["user"], post=request.data["post"]).delete()
            return JsonResponse({"message": "Unlike done"}, safe=False)
        
        serializer = LikeSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"error": "Invalid data"}, safe=False, status=400)
        
        serializer.save()
        return JsonResponse(serializer.data, safe=False)
    
    def delete(self, request):

        serializer = LikeSerializer(data=request.data)

        if not serializer.is_valid():
            return JsonResponse({"error": "Invalid data"}, safe=False)
        
        serializer.save()
        
        return JsonResponse({"message": "Unlike done"}, safe=False)
        
