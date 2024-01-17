import { IUser } from "@/interfaces/user";
import { AuthState } from "./AuthProvider";

type AuthActionType = | { type: "Login", payload: IUser } | { type: "Logout"}

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case "Login":
            return {
                ...state,
                user: action.payload,
                isLogged: true
            }
        case "Logout":
            return {
                ...state,
                user: undefined,
                isLogged: false
            }
        default:
            return state;
    }
}