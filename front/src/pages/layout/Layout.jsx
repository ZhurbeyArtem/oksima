import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { useUserStore } from "../../store/user.store";

const Layout = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  return (
    <>
      {isAuth && (
        <>
          <Sidebar />
          <Header />
        </>
      )}
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
