import { apiConfig, getAuthHeaders } from "./config"

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${apiConfig.baseURL}/Account`, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user data")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Get user error:", error)
    throw error
  }
}
