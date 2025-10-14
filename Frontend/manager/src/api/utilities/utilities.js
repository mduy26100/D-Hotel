import axiosClient from "../config";

const URL_BASE = "/Utilities";

export const createUtilityAPI = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosClient.post(URL_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating utility:", error);
    throw error;
  }
};

export const getUtilitiesAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);

    return response.data;
  } catch (error) {
    console.error("Error fetching utilities:", error);
    throw error;
  }
};

export const updateUtilityAPI = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
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
    console.error("Error updating utility:", error);
    throw error;
  }
};

export const deleteUtilityAPI = async (data) => {
  try {
    const response = await axiosClient.delete(URL_BASE, {
      data,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting utility:", error);
    throw error;
  }
};
