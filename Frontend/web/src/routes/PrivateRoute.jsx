import { Navigate } from "react-router-dom";
import { getToken, clearAuth } from "../utils/localStorage"
import { isTokenExpired } from "../utils/jwtDecode"

export function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (isTokenExpired(token)) {
    clearAuth()
    return <Navigate to="/login" replace />
  }
  return children;
}