import axiosClient from "../config";

const URL_BASE = "/RoomTypes";

export const roomsByHotelIdAPI = async (data) => {
  try {
    const { hotelId, priceType, startDate, endDate, checkInTime, usageHours } =
      data;

    const params = {};
    if (priceType) params.priceType = priceType;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (checkInTime) params.checkInTime = checkInTime;
    if (usageHours) params.usageHours = usageHours;

    const response = await axiosClient.get(`${URL_BASE}/by-hotel/${hotelId}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Get rooms by hotel id error:", error);
    throw error;
  }
};
