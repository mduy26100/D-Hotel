import axiosClient from "../config";

const URL_BASE = "/RoomTypes";

export const createRoomTypeAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        hotelId: data.hotelId,
        name: data.name,
        description: data.description,
        baseHourlyPrice: data.baseHourlyPrice,
        baseHours: data.baseHours,
        extraHourPrice: data.extraHourPrice,
        maxHours: data.maxHours,
        overnightPrice: data.overnightPrice,
        overnightStartTime: data.overnightStartTime,
        overnightEndTime: data.overnightEndTime,
        dailyPrice: data.dailyPrice,
        dailyStartTime: data.dailyStartTime,
        dailyEndTime: data.dailyEndTime,
        area: data.area,
        quantityGuestId: data.quantityGuestId,
        bedTypeId: data.bedTypeId,
        quantity: data.quantity,
        isActive: data.isActive,
      },
    };

    const response = await axiosClient.post(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating room type:", error);
    throw error;
  }
};

export const deleteRoomTypeAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        hotelId: data.hotelId,
        name: data.name,
        description: data.description,
        baseHourlyPrice: data.baseHourlyPrice,
        baseHours: data.baseHours,
        extraHourPrice: data.extraHourPrice,
        maxHours: data.maxHours,
        overnightPrice: data.overnightPrice,
        overnightStartTime: data.overnightStartTime,
        overnightEndTime: data.overnightEndTime,
        dailyPrice: data.dailyPrice,
        dailyStartTime: data.dailyStartTime,
        dailyEndTime: data.dailyEndTime,
        area: data.area,
        quantityGuestId: data.quantityGuestId,
        bedTypeId: data.bedTypeId,
        quantity: data.quantity,
        isActive: data.isActive,
      },
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting room type:", error);
    throw error;
  }
};

export const updateRoomTypeAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        hotelId: data.hotelId,
        name: data.name,
        description: data.description,
        baseHourlyPrice: data.baseHourlyPrice,
        baseHours: data.baseHours,
        extraHourPrice: data.extraHourPrice,
        maxHours: data.maxHours,
        overnightPrice: data.overnightPrice,
        overnightStartTime: data.overnightStartTime,
        overnightEndTime: data.overnightEndTime,
        dailyPrice: data.dailyPrice,
        dailyStartTime: data.dailyStartTime,
        dailyEndTime: data.dailyEndTime,
        area: data.area,
        quantityGuestId: data.quantityGuestId,
        bedTypeId: data.bedTypeId,
        quantity: data.quantity,
        isActive: data.isActive,
      },
    };

    const response = await axiosClient.put(`${URL_BASE}/${data.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room type:", error);
    throw error;
  }
};

export const getRoomTypesAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
};

export const getRoomTypeDetailsAPI = async (roomTypeId) => {
  try {
    const response = await axiosClient.get(`${URL_BASE}/${roomTypeId}/details`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching hotel details (id: ${roomTypeId}):`, error);
    throw error;
  }
};

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
