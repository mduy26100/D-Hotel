import axiosClient from "../config";

const URL_BASE = "/HotelCategories";

export const createHotelCategoryAPI = async (data) => {
  try {
    const payload = {
      dto: {
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
    console.error("Error creating hotel category:", error);
    throw error;
  }
};

export const updateHotelCategoryAPI = async (data) => {
  try {
    const payload = {
      dto: {
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
    console.error("Error update hotel category:", error);
    throw error;
  }
};

export const deleteHotelCategoryAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        name: data.name,
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
    console.error("Error delete hotel category:", error);
    throw error;
  }
};

export const getHotelCategoriesAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);

    return response.data;
  } catch (error) {
    console.error("Error fetching hotel categories:", error);
    throw error;
  }
};

export const getHotelCategoryByIdAPI = async (id) => {
  try {
    const response = await axiosClient.get(`${URL_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching hotel category with id ${id}:`, error);
    throw error;
  }
};
