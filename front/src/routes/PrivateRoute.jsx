import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/user.store";

export const PrivateRoute = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);

  const location = useLocation();
  return isAuth ? (
    children
  ) : (
    <Navigate state={{ from: location }} to={"/login"} />
  );
};
