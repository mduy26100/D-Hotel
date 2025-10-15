import axiosClient from "../config";

const URL_BASE = "/Account";

export const getCurrentUser = async () => {
  try {
    const response = await axiosClient.get(`${URL_BASE}`);
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

export const updateProfileAPI = async (data) => {
  try {
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("role", data.role);

    if (data.avatarImage) {
      formData.append("avatarImage", data.avatarImage);
    }

    const response = await axiosClient.put(`${URL_BASE}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};
