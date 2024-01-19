
from rest_framework import serializers
from .models import Post, Follow, User, Like

class PostSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    def get_count(self, obj):
        return Like.objects.filter(post=obj).count()
    class Meta:
        model = Post
        fields = '__all__'


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    count_followers = serializers.SerializerMethodField()
    count_following = serializers.SerializerMethodField()
    following = FollowSerializer(many=True)
    followers = FollowSerializer(many=True)

    posts = PostSerializer(many=True)

    def get_count_followers(self, obj):
        return Follow.objects.filter(followed_user=obj).count()
    
    def get_count_following(self, obj):
        return Follow.objects.filter(user=obj).count()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'count_followers', 'count_following', 'posts', 'following', 'followers')


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class GetPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    likes = LikeSerializer(many=True)
    count = serializers.SerializerMethodField()


    def get_count(self, obj):
        return Like.objects.filter(post=obj).count()
    class Meta:
        model = Post
        fields = '__all__'


