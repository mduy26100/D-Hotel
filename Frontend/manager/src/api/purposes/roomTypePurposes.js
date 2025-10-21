import axiosClient from "../config";

const URL_BASE = "/RoomTypePurposes";

export const createRoomTypePurposeAPI = async (data) => {
  try {
    const payload = {
      roomTypePurposeDto: {
        roomId: data.roomId,
        roomPurposeId: data.roomPurposeId,
      },
    };

    const response = await axiosClient.post(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating room type purpose:", error);
    throw error;
  }
};

export const deleteRoomTypePurposeAPI = async (data) => {
  try {
    const payload = {
      roomTypePurposeDto: {
        roomId: data.roomId,
        roomPurposeId: data.roomPurposeId,
      },
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting room type purpose:", error);
    throw error;
  }
};

export const updateRoomTypePurposeAPI = async (data) => {
  try {
    const payload = {
      roomTypePurposeDto: {
        roomId: data.roomId,
        roomPurposeId: data.roomPurposeId,
      },
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
    console.error("Error updating room type purpose:", error);
    throw error;
  }
};
