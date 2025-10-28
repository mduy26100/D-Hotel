import axiosClient from "../config";

const URL_BASE = "/Assistants";

export const askAsyncAPI = async (data) => {
  try {
    const payload = {
      prompt: data.prompt,
    };

    const response = await axiosClient.post(`${URL_BASE}/ask`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Ask Assistant error:", error);
    throw error;
  }
};
