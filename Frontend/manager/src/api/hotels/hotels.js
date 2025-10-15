import axiosClient from "../config";

const URL_BASE = "/Hotels";

export const createHotelAPI = async (data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("categoryId", data.categoryId);
    formData.append("hotelManagerId", data.hotelManagerId);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("isActive", data.isActive);

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosClient.post(`${URL_BASE}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating hotel:", error);
    throw error;
  }
};

export const updateHotelAPI = async (data) => {
  try {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("categoryId", data.categoryId);
    formData.append("hotelManagerId", data.hotelManagerId);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("isActive", data.isActive);

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosClient.put(`${URL_BASE}/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating hotel:", error);
    throw error;
  }
};

export const deleteHotelAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        name: data.name,
        categoryId: data.categoryId,
        hotelManagerId: data.hotelManagerId,
        address: data.address,
        description: data.description,
        imgUrl: data.imgUrl,
        isActive: data.isActive,
      },
    };

    const response = await axiosClient.delete(`${URL_BASE}`, {
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error delete hotel:", error);
    throw error;
  }
};

export const getHotelsAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);

    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};
