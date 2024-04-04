import axios from "axios";
import { useUserStore } from "../store/user.store";

export const getAllProposal = async () => {
  try {
    const userStore = useUserStore.getState();
    const tokenFromStore = userStore.token;

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BACK_URL}/proposals/`,
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

export const createProposal = async (data) => {
  try {
     const userStore = useUserStore.getState();
     const tokenFromStore = userStore.token;

     await axios.post(
       `${import.meta.env.VITE_API_BACK_URL}/proposals/`,
       data,
       {
         headers: {
           Authorization: `Bearer ${tokenFromStore}`,
         },
       }
     );

     return "Success";
  } catch (error) {
    throw error.response.data;
    
  }
}