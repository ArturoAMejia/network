import api from "@/api/api";
import { IPost } from "@/interfaces/post";
import { useMutation, useQuery } from "@tanstack/react-query";

const getPosts = async () => {
  const { data } = await api.get("/post");
  return data;
};

const createPost = async (post: IPost) => {
  const { data } = await api.post("/post", post);
  return data;
};

export const useGetPosts = () => {
  return useQuery(["posts"], () => getPosts());

};
export const useCreatePost = () => {
  return useMutation({ mutationFn: (post: IPost) => createPost(post) });
};
