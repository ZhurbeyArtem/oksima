import axios from "axios";
import { useUserStore } from "../store/user.store";

export const changeName = async (data) => {
  try {
    const userStore = useUserStore.getState();
    const tokenFromStore = userStore.token;

    const user = await axios.put(
      `${import.meta.env.VITE_API_BACK_URL}/users/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${tokenFromStore}`,
        },
      }
    );
    const { firstName, lastName } = user.data
    
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    storedUser.user.firstName = firstName
    storedUser.user.lastName = lastName
    localStorage.setItem("user", JSON.stringify(storedUser));
    return "Success";
  } catch (error) {
    throw error.response.data;
  }
};
