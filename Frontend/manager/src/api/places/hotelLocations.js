import axiosClient from "../config";

const URL_BASE = "/HotelLocations";

export const createHotelLocationAPI = async (data) => {
  try {
    const payload = {
      dto: {
        hotelId: data.hotelId,
        locationId: data.locationId,
      },
    };

    const response = await axiosClient.post(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating hotel location:", error);
    throw error;
  }
};

export const deleteHotelLocationAPI = async (data) => {
  try {
    const payload = {
      dto: {
        hotelId: data.hotelId,
        locationId: data.locationId,
      },
    };

    const response = await axiosClient.delete(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting hotel location:", error);
    throw error;
  }
};

export const updateHotelLocationAPI = async (hotelId, data) => {
  try {
    const payload = {
      dto: {
        hotelId: data.hotelId,
        locationId: data.locationId,
      },
    };

    const response = await axiosClient.put(`${URL_BASE}/${hotelId}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating hotel location:", error);
    throw error;
  }
};
