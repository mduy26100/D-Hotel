import axiosClient from "../config";

const URL_BASE = "/RoomPurposes";

export const createRoomPurposeAPI = async (data) => {
  try {
    const payload = {
      roomPurposeDto: {
        id: data.id,
        name: data.name,
      },
    };

    const response = await axiosClient.post(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating room purpose:", error);
    throw error;
  }
};

export const deleteRoomPurposeAPI = async (data) => {
  try {
    const payload = {
      roomPurposeDto: {
        id: data.id,
        name: data.name,
      },
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting room purpose:", error);
    throw error;
  }
};

export const updateRoomPurposeAPI = async (data) => {
  try {
    const payload = {
      roomPurpose: {
        id: data.id,
        name: data.name,
      },
    };

    const response = await axiosClient.put(`${URL_BASE}/${data.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room purpose:", error);
    throw error;
  }
};

export const getRoomPurposesAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching room purposes:", error);
    throw error;
  }
};
