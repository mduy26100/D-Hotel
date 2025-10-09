import axiosClient from "../config";

const hotels = "/hotels";

// 🏨 Lấy danh sách khách sạn
export const hotelsAPI = async () => {
  try {
    const response = await axiosClient.get(hotels);
    return response;
  } catch (error) {
    console.error("Get hotels error:", error);
    throw error;
  }
};

// 📝 Lấy chi tiết khách sạn theo ID
export const hotelDetailsAPI = async (id) => {
  try {
    const response = await axiosClient.get(`${hotels}/${id}/details`);
    return response;
  } catch (error) {
    console.error("Get hotel details error:", error);
    throw error;
  }
};

// 🧭 Lấy khách sạn theo Category ID
export const hotelByCategoriesIdAPI = async (categoryId) => {
  try {
    const response = await axiosClient.get(`${hotels}/category/${categoryId}`);
    return response;
  } catch (error) {
    console.error("Get hotel by categoryId error:", error);
    throw error;
  }
};
