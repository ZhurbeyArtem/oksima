import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "./constants/routes.constants";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";

import LoginPage from "./pages/login/Login";
import RegistrationPage from "./pages/registration/Registration";
import Layout from "./pages/layout/Layout";
import { useUserStore } from "./store/user.store";
import Home from "./pages/home/Home";

const { HOME, SIGN_IN, SIGN_UP, SIGN_UP_MANAGER } = ROUTES;
function App() {
  return (
    <Routes>
      <Route path={HOME} element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path={SIGN_IN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={SIGN_UP}
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path={SIGN_UP_MANAGER}
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        {/* <Route
          path={`${TRANSACTION}/${HISTORY}/:transactionsType`}
          element={
            <PrivateRoute>
              <TarnsactionsHistoryPage />
            </PrivateRoute>
          }
        /> */}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default App;
