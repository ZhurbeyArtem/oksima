import { create } from "zustand";
export const useUserStore = create((set) => ({
  isAuth: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).isAuth
    : false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).user
    : {},
  token: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : "",
  setIsAuth: () =>
    set({
      isAuth: JSON.parse(localStorage.getItem("user")).isAuth,
      user: JSON.parse(localStorage.getItem("user")).user,
      token: JSON.parse(localStorage.getItem("user")).token
    }),
  setEmail: () =>
    set({
      user: JSON.parse(localStorage.getItem("user")).user
    }),
  logout: () =>
    set({
      isAuth: false,
      user: {},
      token: "",
    }),
}));
