import axiosClient from "../config";

const URL_BASE = "/RoomTypeImages";

export const createRoomTypeImageAPI = async (data) => {
  try {
    const formData = new FormData();
    formData.append("roomTypeId", data.roomTypeId);

    for (const file of data.files) {
      formData.append("images", file);
    }

    const response = await axiosClient.post(`${URL_BASE}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading room type images:", error);
    throw error;
  }
};

export const getRoomTypeImagesAPI = async (roomTypeId) => {
  try {
    const response = await axiosClient.get(
      `${URL_BASE}/roomtypes/${roomTypeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching room type images:", error);
    throw error;
  }
};

export const updateRoomTypeImageAPI = async (data) => {
  try {
    const formData = new FormData();
    formData.append("roomTypeId", data.roomTypeId);

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosClient.put(`${URL_BASE}/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.status;
  } catch (error) {
    console.error("Error updating room type image:", error);
    throw error;
  }
};

export const deleteRoomTypeImageAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        roomTypeId: data.roomTypeId,
        imgUrl: data.imgUrl,
      },
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting room type image:", error);
    throw error;
  }
};
