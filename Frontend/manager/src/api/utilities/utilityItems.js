import axiosClient from "../config";

const URL_BASE = "/UtilityItems";

export const createUtilityItemAPI = async (data) => {
  try {
    const payload = {
      dto: {
        utilityId: data.utilityId,
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
    console.error("Error creating utility item:", error);
    throw error;
  }
};

export const updateUtilityItemAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        utilityId: data.utilityId,
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
    console.error("Error update utility item:", error);
    throw error;
  }
};

export const deleteUtilityItemAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        utilityId: data.utilityId,
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
    console.error("Error delete utility item:", error);
    throw error;
  }
};
