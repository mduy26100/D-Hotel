import axiosClient from "../config";

const URL_BASE = "/ManagerUsers";

export const getHotelManagerUser = async () => {
  try {
    const response = await axiosClient.get(`${URL_BASE}?role=Hotel_Manager`);
    return response.data;
  } catch (error) {
    console.error("Get hotel manager user error:", error);
    throw error;
  }
};
