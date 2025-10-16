import axiosClient from "../config";

const URL_BASE = "/Locations";

export const getAllLocationsAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const getLocationByIdAPI = async (id) => {
  try {
    const response = await axiosClient.get(`${URL_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location by id:", error);
    throw error;
  }
};

export const createLocationAPI = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosClient.post(URL_BASE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};

export const updateLocationAPI = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosClient.put(`${URL_BASE}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
};

export const deleteLocationAPI = async (id) => {
  try {
    const response = await axiosClient.delete(`${URL_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting location:", error);
    throw error;
  }
};
