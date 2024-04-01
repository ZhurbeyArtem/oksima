import { create } from "zustand";
export const useUserStore = create((set) => ({
  isAuth: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).isAuth
    : false,
  setIsAuth: () =>
    set({
      isAuth: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).isAuth
        : false,
    }),
  logout: () =>
    set({
      isAuth: false,
    }),
}));
