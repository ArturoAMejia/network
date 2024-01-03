import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";

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
    ]
  },


] )