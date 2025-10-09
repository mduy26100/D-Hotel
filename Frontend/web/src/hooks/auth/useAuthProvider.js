// hooks/useProvideAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, setUser as setUserLocal, clearAuth } from "../../utils/localStorage";
import { isTokenExpired } from "../../utils/jwtDecode";

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser && storedUser.token && !isTokenExpired(storedUser.token)) {
      setUser(storedUser);
    } else {
      clearAuth();
      setUser(null);
    }
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
    navigate("/");
  };

  const updateUser = (userData) => {
    setUser(userData);
    setUserLocal(userData);
  };

  return { user, setUser: updateUser, logout };
};
