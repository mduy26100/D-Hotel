import axiosClient from "../config";

const URL_BASE = "/HotelTravelPurposes";

export const createHotelTravelPurposeAPI = async (data) => {
  try {
    const payload = {
      hotelTravelPurposeDto: {
        hotelId: data.hotelId,
        travelPurposeId: data.travelPurposeId,
      },
    };

    const response = await axiosClient.post(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating hotel travel purpose:", error);
    throw error;
  }
};

export const deleteHotelTravelPurposeAPI = async (data) => {
  try {
    const payload = {
      hotelTravelPurposeDto: {
        hotelId: data.hotelId,
        travelPurposeId: data.travelPurposeId,
      },
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting hotel travel purpose:", error);
    throw error;
  }
};

export const updateHotelTravelPurposeAPI = async (data) => {
  try {
    const payload = {
      hotelTravelPurposeDto: {
        hotelId: data.hotelId,
        travelPurposeId: data.travelPurposeId,
      },
    };

    const response = await axiosClient.put(
      `${URL_BASE}/${data.hotelId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating hotel travel purpose:", error);
    throw error;
  }
};
