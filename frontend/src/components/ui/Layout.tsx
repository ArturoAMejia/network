import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="bg-black text-white flex flex-col gap-16 md:grid md:grid-cols-3 p-8">
      <Navbar />
      <main>
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
      </main>
    </div>
  );
};
