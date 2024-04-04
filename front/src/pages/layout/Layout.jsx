import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { useUserStore } from "../../store/user.store";

const Layout = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  const user = useUserStore((state) => state.user);
  return (
    <>
      {isAuth && (
        <>
          <Sidebar />
          {user.role === "manager" && <Header />}
        </>
      )}
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
