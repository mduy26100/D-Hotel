import axiosClient from "../config";

const URL_BASE = "/ManagerUsers";

export const getAllUsersAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
