import axios from "axios";
export const login = async (data) => {
  try {
    const user = await axios.post(
      `${import.meta.env.VITE_API_BACK_URL}/users/login`,
      data
    );
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user.data,
        isAuth: true,
      })
    );
    return user;
  } catch (error) {
    throw error.response.data;
  }
};

export const registration = async (data) => {
  try {
    const user = await axios.post(
      `${import.meta.env.VITE_API_BACK_URL}/users/registration`,
      data
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
