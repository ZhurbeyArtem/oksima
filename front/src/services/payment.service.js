import axios from "axios";
import { useUserStore } from "../store/user.store";

export const getPayments = async (status) => {
  try {
    const userStore = useUserStore.getState();
    const tokenFromStore = userStore.token;

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BACK_URL}/payouts`,
      {
        headers: {
          Authorization: `Bearer ${tokenFromStore}`,
        },
        params: {
          status,
        },
      }
    );
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createPayment = async (values) => {
  try {
    const userStore = useUserStore.getState();
    const tokenFromStore = userStore.token;

    await axios.post(
      `${import.meta.env.VITE_API_BACK_URL}/payouts/create`,
      values,
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
};

export const closePayment = async ({ id, newStatus }) => {
  try {
    const userStore = useUserStore.getState();
    const tokenFromStore = userStore.token;
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BACK_URL}/payouts/close`,
      {
        id,
        newStatus,
      },
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
