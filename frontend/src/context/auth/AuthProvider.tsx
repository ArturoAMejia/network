import { IUser } from "@/interfaces/user";
import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import Cookies from "js-cookie";
import api from "@/api/api";

export interface AuthState {
  isLogged: boolean;
  user?: IUser;
}

export const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const session = Cookies.get("user");

  useEffect(() => {
    if (session) {
      const user = JSON.parse(session);
      console.log(user)
      dispatch({ type: "Login", payload: user });
    }
  }, [session]);

  const login = async (user: IUser): Promise<boolean> => {
    const { data } = await api.post("/login", user);
    console.log({ data });

    Cookies.set("user", JSON.stringify(data));
    Cookies.set("user_id", data.id);

    dispatch({ type: "Login", payload: data });
    return true;
  };

  const logout = () => {
    Cookies.remove("user");
    dispatch({ type: "Logout" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
