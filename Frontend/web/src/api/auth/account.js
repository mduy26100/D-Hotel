import axiosClient from "../config";

const URL_BASE = "/Account";

// 🧠 Lấy thông tin user (nếu token đã được interceptor gắn thì không cần truyền vào)
export const getUserInfoAPI = async (token) => {
  try {
    const response = await axiosClient.get(URL_BASE, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
};

export const updateUserAPI = async (data) => {
  try {
    const formData = new FormData();

    if (data.firstName) formData.append("firstName", data.firstName);
    if (data.lastName) formData.append("lastName", data.lastName);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
    if (data.avatarImage) formData.append("avatarImage", data.avatarImage);

    const response = await axiosClient.put(`${URL_BASE}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};
