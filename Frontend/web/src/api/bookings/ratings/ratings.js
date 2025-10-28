import axiosClient from "../../config";

const URL_BASE = "/Ratings";

export const getRatingsByHotelIdAPI = async (hotelId) => {
  try {
    const response = await axiosClient.get(`${URL_BASE}/hotel/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error("Get ratings error:", error);
    throw error;
  }
};

export const getRatingsByUserAPI = async () => {
  try {
    const response = await axiosClient.get(`${URL_BASE}/user`);
    return response.data;
  } catch (error) {
    console.error("Get ratings error:", error);
    throw error;
  }
};

export const createRatingAPI = async (data) => {
  try {
    const payload = {
      dto: {
        bookingId: data.bookingId,
        hotelId: data.hotelId,
        ratingValue: data.ratingValue,
        comment: data.comment,
      },
    };

    const response = await axiosClient.post(URL_BASE, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Get ratings error:", error);
    throw error;
  }
};
