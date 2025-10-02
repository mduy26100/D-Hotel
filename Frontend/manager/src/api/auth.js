import { apiConfig } from "./config"

export const loginAPI = async (email, password) => {
  try {
    const response = await fetch(`${apiConfig.baseURL}/Auth/login`, {
      method: "POST",
      headers: apiConfig.headers,
      body: JSON.stringify({
        dto: {
          email,
          password,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}
