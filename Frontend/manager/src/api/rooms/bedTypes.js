import axiosClient from "../config";

const URL_BASE = "/BedTypes";

export const createBedTypeAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        name: data.name,
        description: data.description,
        dimensions: data.dimensions,
        capacity: data.capacity,
        isShared: data.isShared,
      },
    };

    const response = await axiosClient.post(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating bed type:", error);
    throw error;
  }
};

export const deleteBedTypeAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        name: data.name,
        description: data.description,
        dimensions: data.dimensions,
        capacity: data.capacity,
        isShared: data.isShared,
      },
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting bed type:", error);
    throw error;
  }
};

export const updateBedTypeAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        name: data.name,
        description: data.description,
        dimensions: data.dimensions,
        capacity: data.capacity,
        isShared: data.isShared,
      },
    };

    const response = await axiosClient.put(`${URL_BASE}/${data.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating bed type:", error);
    throw error;
  }
};

export const getBedTypesAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching bed types:", error);
    throw error;
  }
};
