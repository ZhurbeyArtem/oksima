import axios from "axios";
import { useUserStore } from "../store/user.store";

export const getAllProposal = async (id) => {
  try {
    const userStore = useUserStore.getState();
    const tokenFromStore = userStore.token;

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BACK_URL}/proposals/`,
      {
        headers: {
          Authorization: `Bearer ${tokenFromStore}`,
        },
        params: {
          id,
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

    await axios.post(`${import.meta.env.VITE_API_BACK_URL}/proposals/`, data, {
      headers: {
        Authorization: `Bearer ${tokenFromStore}`,
      },
    });

    return "Success";
  } catch (error) {
    throw error.response.data;
  }
};

export const acceptProposal = async (id) => {
  try {
    const userStore = useUserStore.getState();
    const tokenFromStore = userStore.token;

    await axios.post(
      `${import.meta.env.VITE_API_BACK_URL}/proposals/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenFromStore}`,
        },
        params: {
          id,
        },
      }
    );

    return "Success";
  } catch (error) {
    throw error.response.data;
  }
};
