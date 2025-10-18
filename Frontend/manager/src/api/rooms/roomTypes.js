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
        basePrice: data.basePrice,
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
        basePrice: data.basePrice,
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
        basePrice: data.basePrice,
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
