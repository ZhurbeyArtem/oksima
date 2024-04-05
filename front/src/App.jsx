import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "./constants/routes.constants";

import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";

import LoginPage from "./pages/login/Login";
import RegistrationPage from "./pages/registration/Registration";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Profile from "./pages/profile/Profile";
import Proposals from "./pages/proposals/Proposals";
import Payment from "./pages/payment/Payment";
import Support from "./pages/support/Support";
import Users from "./pages/users/Users";


const {
  HOME,
  SIGN_IN,
  SIGN_UP,
  SIGN_UP_MANAGER,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  PROFILE,
  PROPOSALS,
  USERS,
  PAYMENTS,
  SUPPORT,
} = ROUTES;
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
        <Route
          path={FORGOT_PASSWORD}
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path={RESET_PASSWORD}
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path={PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PROPOSALS}
          element={
            <PrivateRoute>
              <Proposals />
            </PrivateRoute>
          }
        />
        <Route
          path={USERS}
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path={PAYMENTS}
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route
          path={SUPPORT}
          element={
            <PrivateRoute>
              <Support />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default App;
