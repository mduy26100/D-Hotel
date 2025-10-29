import axiosClient from "../config";

const URL_Base = "/HotelCategories";

export const hotelCategoriesAPI = async () => {
  try {
    const response = await axiosClient.get(URL_Base);
    return response.data;
  } catch (error) {
    console.error("Get hotel by categoryId error:", error);
    throw error;
  }
};
