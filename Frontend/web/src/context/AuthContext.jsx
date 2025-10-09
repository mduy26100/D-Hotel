import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
