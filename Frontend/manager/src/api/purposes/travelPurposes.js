import axiosClient from "../config";

const URL_BASE = "/TravelPurposes";

export const createTravelPurposeAPI = async (data) => {
  try {
    const payload = {
      travelPurpose: {
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
    console.error("Error creating travel purpose:", error);
    throw error;
  }
};

export const deleteTravelPurposeAPI = async (data) => {
  try {
    const payload = {
      travelPurpose: {
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
    console.error("Error deleting travel purpose:", error);
    throw error;
  }
};

export const updateTravelPurposeAPI = async (data) => {
  try {
    const payload = {
      travelPurpose: {
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
    console.error("Error updating travel purpose:", error);
    throw error;
  }
};

export const getTravelPurposesAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching travel purposes:", error);
    throw error;
  }
};
