import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/user.store";

export const PublicRoute = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);

  return isAuth ? <Navigate to={"/"} /> : children;
};
