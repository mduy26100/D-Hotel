import { useState } from "react"
import { registerAPI } from "../../api/auth/auth"
import { useNavigate } from "react-router-dom"

export const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const register = async (formData) => {
    setLoading(true)
    setError(null)

    try {
      const data = await registerAPI(formData)
      // Nếu muốn, có thể redirect sang login sau khi đăng ký thành công
      navigate("/login")
      return data
    } catch (err) {
      setError(err.message || "Register failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}