import api from "@/api/api";
import { IFollowing, ILike, IPost } from "@/interfaces/post";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetUser } from "..";

const getPosts = async (numberOfPage: number) => {
  const { data } = await api.get(`/post?page=${numberOfPage}`);
  return data;
};

const createPost = async (post: IPost) => {
  const { data } = await api.post("/post", post);
  return data;
};

const updatePost = async (post: IPost) => {
  const { data } = await api.put("/post", post);
  return data;
};

const likePost = async (post: ILike) => {
  const { data } = await api.post("/like", post);
  return data;
};

export const useGetPosts = (numberOfPage: number) => {
  return useQuery(["posts"], () => getPosts(numberOfPage));
};
export const useCreatePost = (page: number) => {
  const { refetch } = useGetPosts(page);

  return useMutation({
    mutationFn: (post: IPost) => createPost(post),
    onSuccess: () => refetch(),
  });
};

export const useUpdatePost = (page: number) => {
  const { refetch } = useGetPosts(page);

  return useMutation({
    mutationFn: (post: IPost) => updatePost(post),
    onSuccess: () => refetch(),
  });
};

export const useLikePost = (page: number) => {
  const { refetch } = useGetPosts(page);

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
