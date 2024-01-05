import api from "@/api/api";
import { IUser } from "@/interfaces/user";
import { useMutation } from "@tanstack/react-query";

const login = async (user: IUser) => {
  const { data } = await api.post("/login", user);
  return data;
};

export const useLogin = () => {
  return useMutation({ mutationFn: (user: IUser) => login(user) });
};
