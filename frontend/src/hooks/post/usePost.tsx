import api from "@/api/api";
import { IFollowing, ILike, IPost } from "@/interfaces/post";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useGetUser } from "..";

const getPosts = async () => {
  const token = Cookies.get("user_id");
  const { data } = await api.get("/post", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const createPost = async (post: IPost) => {
  const { data } = await api.post("/post", post);
  return data;
};

const likePost = async (post: ILike) => {
  const { data } = await api.post("/like", post);
  return data;
};

export const useGetPosts = () => {
  return useQuery(["posts"], () => getPosts());
};
export const useCreatePost = () => {
  const { refetch } = useGetPosts();

  return useMutation({
    mutationFn: (post: IPost) => createPost(post),
    onSuccess: () => refetch(),
  });
};

export const useLikePost = () => {
  const { refetch } = useGetPosts();

  return useMutation({
    mutationFn: (post: ILike) => likePost(post),
    onSuccess: () => refetch(),
  });
};

const followUser = async (follow: IFollowing) => {
  const { data } = await api.post("/follow", follow);
  return data;
};

export const useFollowUser = (username: string) => {
  const { refetch } = useGetUser(username);

  return useMutation({
    mutationFn: (follow: IFollowing) => followUser(follow),
    onSuccess: () => refetch(),
  });
};
