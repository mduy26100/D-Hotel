import axiosClient from "../config";

// 🧠 Lấy thông tin user (nếu token đã được interceptor gắn thì không cần truyền vào)
export const getUserInfoAPI = async (token) => {
  try {
    const response = await axiosClient.get("/Account", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return response;
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
};
