import axiosClient from "../config";

const URL_BASE = "/RoomUtilities";

export const createRoomUtilityAPI = async (data) => {
  try {
    const payload = {
      roomId: data.roomId,
      utilityIds: data.utilityIds,
    };

    const response = await axiosClient.post(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating room utility:", error);
    throw error;
  }
};

export const deleteRoomUtilityAPI = async (data) => {
  try {
    const payload = {
      roomId: data.roomId,
      utilityIds: data.utilityIds,
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting room utility:", error);
    throw error;
  }
};

export const updateRoomUtilityAPI = async (data) => {
  try {
    const payload = {
      roomId: data.roomId,
      utilityIds: data.utilityIds,
    };

    const response = await axiosClient.put(
      `${URL_BASE}/${data.roomId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating room utility:", error);
    throw error;
  }
};
