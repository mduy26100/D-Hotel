import axiosClient from "../config";

const URL_BASE = "/HotelUtilities";

export const createHotelUtilityAPI = async (data) => {
  try {
    const formData = new FormData();
    formData.append("hotelId", data.hotelId);
    formData.append("utilityIds", data.utilityIds);

    const response = await axiosClient.post(URL_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating hotel utilities:", error);
    throw error;
  }
};

export const updateHotelUtilityAPI = async ({ hotelId, utilityIds }) => {
  try {
    const formData = new FormData();
    formData.append("utilityIds", utilityIds);

    const response = await axiosClient.put(`${URL_BASE}/${hotelId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating utilities for hotel ${hotelId}:`, error);
    throw error;
  }
};

export const deleteHotelUtilityAPI = async ({ hotelId, utilityIds }) => {
  try {
    const response = await axiosClient.delete(`${URL_BASE}/${hotelId}`, {
      params: {
        utilityIds,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error deleting utilities for hotel ${hotelId}:`, error);
    throw error;
  }
};
