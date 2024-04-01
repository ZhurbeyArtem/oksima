import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import { useUserStore } from "../../store/user.store";

const Layout = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  return (
    <>
      {isAuth && <Header />}
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
