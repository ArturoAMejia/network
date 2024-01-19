import api from "@/api/api";
import { IUser } from "@/interfaces/user";
import { useMutation, useQuery } from "@tanstack/react-query";

const login = async (user: IUser) => {
  const { data } = await api.post("/login", user);

  return data;
};

export const useLogin = () => {
  return useMutation({ mutationFn: (user: IUser) => login(user) });
};

const getUser = async (username: string) => {
  const { data } = await api.get(`/user/${username}`);

  return data;
};

export const useGetUser = (username: string) => {
  return useQuery(["user"], () => getUser(username));
};
