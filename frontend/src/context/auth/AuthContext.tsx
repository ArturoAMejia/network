import { IUser } from "@/interfaces/user";
import { createContext } from "react";

interface ContextProps {
  isLogged: boolean;
  user?: IUser;
  login: (user: IUser) => Promise<boolean>;
  logout: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const AuthContext = createContext<ContextProps>({} as ContextProps);
