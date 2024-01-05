import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "@/pages/Login";

export const router = createBrowserRouter( [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "home",
        element: <Home />
      }
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <Login />
      }
    ]
  }

] )