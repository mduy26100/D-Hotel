import { Navigate } from "react-router-dom"
import { getToken, clearAuth } from "../utils/localStorage"
import { hasRole, isTokenExpired } from "../utils/jwtDecode"

export default function PrivateRoute({ children }) {
  const token = getToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (isTokenExpired(token)) {
    clearAuth()
    return <Navigate to="/login" replace />
  }

  if (!hasRole(token, "Manager")) {
    clearAuth()
    return <Navigate to="/login" replace />
  }

  return children
}
