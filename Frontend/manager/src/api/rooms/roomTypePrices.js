import axiosClient from "../config";

const URL_BASE = "/RoomTypePrices";

export const createRoomTypePriceAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        roomTypeId: data.roomTypeId,
        priceType: data.priceType,
        baseHourlyPrice: data.baseHourlyPrice,
        extraHourPrice: data.extraHourPrice,
        overnightPrice: data.overnightPrice,
        dailyPrice: data.dailyPrice,
        startDate: data.startDate,
        endDate: data.endDate,
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
    console.error("Error creating room type price:", error);
    throw error;
  }
};

export const deleteRoomTypePriceAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        roomTypeId: data.roomTypeId,
        priceType: data.priceType,
        baseHourlyPrice: data.baseHourlyPrice,
        extraHourPrice: data.extraHourPrice,
        overnightPrice: data.overnightPrice,
        dailyPrice: data.dailyPrice,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
      },
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting room type price:", error);
    throw error;
  }
};

export const updateRoomTypePriceAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        roomTypeId: data.roomTypeId,
        priceType: data.priceType,
        baseHourlyPrice: data.baseHourlyPrice,
        extraHourPrice: data.extraHourPrice,
        overnightPrice: data.overnightPrice,
        dailyPrice: data.dailyPrice,
        startDate: data.startDate,
        endDate: data.endDate,
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
    console.error("Error updating room type price:", error);
    throw error;
  }
};

export const getRoomTypePricesAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching room type prices:", error);
    throw error;
  }
};
