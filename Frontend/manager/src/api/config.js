const API_URL = import.meta.env.VITE_API_URL

export const apiConfig = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
}

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    ...apiConfig.headers,
    Authorization: token ? `Bearer ${token}` : "",
  }
}
