import axiosClient from "../config"; // ✅ đường dẫn đến file axiosClient.js

// 🧠 Hàm login
export const loginAPI = async (payload) => {
  try {
    const response = await axiosClient.post("/Authentication/login", payload);
    return response.data;
  } catch (error) {
    // normalize error message if needed
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// 🧠 Hàm register
export const registerAPI = async (user) => {
  try {
    // Kiểm tra các field bắt buộc
    const requiredFields = [
      "firstName",
      "lastName",
      "userName",
      "email",
      "phoneNumber",
      "password",
      "confirmPassword",
      "role",
    ];

    for (const field of requiredFields) {
      if (!user[field]) {
        throw new Error(`Field ${field} is required`);
      }
    }

    if (user.password !== user.confirmPassword) {
      throw new Error("Password and confirmPassword do not match");
    }

    const response = await axiosClient.post("/Authentication/register", {
      dto: {
        ...user,
        provider: "EmailPassword",
      },
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
