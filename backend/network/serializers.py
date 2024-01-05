
from rest_framework import serializers
from .models import Post, Follow, User, Like

class UserSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    def get_followers(self, obj):
        return Follow.objects.filter(followed_user=obj).count()
    
    def get_following(self, obj):
        return Follow.objects.filter(user=obj).count()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'followers', 'following')


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    likes = serializers.SerializerMethodField()

    def get_likes(self, obj):
        return Like.objects.filter(post=obj).count()
    class Meta:
        model = Post
        fields = '__all__'


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'