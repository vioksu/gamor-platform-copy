import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode
}

const AuthRoute = ({ children }: PropsType) => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    children ? children : <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
