import axiosClient from "../config";

const URL_BASE = "/Authentication";

export const loginAPI = async (email, password) => {
  try {
    const response = await axiosClient.post(`${URL_BASE}/login`, {
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

export const registerAPI = async (data) => {
  try {
    const response = await axiosClient.post(`${URL_BASE}/register`, {
      dto: {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        role: data.role,
        confirmPassword: data.confirmPassword,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
