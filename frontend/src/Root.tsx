import { Navigate, Outlet, useLocation } from "react-router-dom";

function Root() {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <Navigate to="/" />;
  }
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default Root;
