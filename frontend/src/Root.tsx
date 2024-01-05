import { Toaster } from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function Root() {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <Navigate to="/" />;
  }
  return (
    <main>
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
    </main>
  );
}

export default Root;
