import axios from "axios";
import { useUserStore } from "../store/user.store";

export const getCategories = async () => {
  try {
    const userStore = useUserStore.getState();
    const tokenFromStore = userStore.token;

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BACK_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${tokenFromStore}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error.response.data;
  }
};
