import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("user");

    if (!jwt) {

        return navigate("/auth/login")
    }  

  }, [navigate])
  return (
    <div className="bg-black text-white h-fit flex flex-col gap-16 md:grid md:grid-cols-3 p-8">
      <Navbar />
      <main className="">
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
      </main>
    </div>
  );
};
