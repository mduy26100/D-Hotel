import React from "react";
import { AuthContext } from "./AuthContext";
import { useProvideAuth } from "../hooks/auth/useAuthProvider";

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
