import axiosClient from "../config";

export const getCurrentUser = async () => {
  try {
    const response = await axiosClient.get("/Account");
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};
