import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const pathname = window.location.pathname;

  if (token && pathname === "/") {
    return <Navigate to="/articles" />;
  } else if (token && pathname !== "/") {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
