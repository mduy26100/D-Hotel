import axiosClient from "../config";

const URL_BASE = "/QuantityGuests";

export const createQuantityGuestAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        name: data.name,
        minGuests: data.minGuests,
        maxGuests: data.maxGuests,
        standardGuests: data.standardGuests,
        extraGuestCharge: data.extraGuestCharge,
        childrenAllowed: data.childrenAllowed,
        maxChildren: data.maxChildren,
      },
    };

    const response = await axiosClient.post(`${URL_BASE}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating quantity guest:", error);
    throw error;
  }
};

export const deleteQuantityGuestAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        name: data.name,
        minGuests: data.minGuests,
        maxGuests: data.maxGuests,
        standardGuests: data.standardGuests,
        extraGuestCharge: data.extraGuestCharge,
        childrenAllowed: data.childrenAllowed,
        maxChildren: data.maxChildren,
      },
    };

    const response = await axiosClient.delete(URL_BASE, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting quantity guest:", error);
    throw error;
  }
};

export const updateQuantityGuestAPI = async (data) => {
  try {
    const payload = {
      dto: {
        id: data.id,
        name: data.name,
        minGuests: data.minGuests,
        maxGuests: data.maxGuests,
        standardGuests: data.standardGuests,
        extraGuestCharge: data.extraGuestCharge,
        childrenAllowed: data.childrenAllowed,
        maxChildren: data.maxChildren,
      },
    };

    const response = await axiosClient.put(`${URL_BASE}/${data.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating quantity guest:", error);
    throw error;
  }
};

export const getQuantityGuestsAPI = async () => {
  try {
    const response = await axiosClient.get(URL_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching quantity guests:", error);
    throw error;
  }
};
