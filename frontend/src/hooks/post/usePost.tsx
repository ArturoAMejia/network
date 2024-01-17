import api from "@/api/api";
import { ILike, IPost } from "@/interfaces/post";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

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
