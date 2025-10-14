import axiosClient from "../config";

export const loginAPI = async (email, password) => {
  try {
    const response = await axiosClient.post("/Authentication/login", {
      dto: {
        email,
        password,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
