import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: `${API_URL}/api`, // thêm /api ở đây
});

// Thêm token tự động cho mọi request
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Xử lý response
axiosClient.interceptors.response.use(
  function (response) {
    if (response.data && response.data.data) return response.data;
    return response;
  },
  function (error) {
    if (error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
  }
);

export default axiosClient;
