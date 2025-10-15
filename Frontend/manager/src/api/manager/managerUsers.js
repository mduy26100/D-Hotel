import axiosClient from "../config";

const URL_BASE = "/ManagerUsers";

export const getAllUsersAPI = async (role) => {
  try {
    const response = await axiosClient.get(URL_BASE, {
      params: role ? { role } : {},
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserByIdAPI = async (id) => {
  try {
    const response = await axiosClient.get(`${URL_BASE}/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
