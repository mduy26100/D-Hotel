import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export function PublicRoute({ children }) {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
