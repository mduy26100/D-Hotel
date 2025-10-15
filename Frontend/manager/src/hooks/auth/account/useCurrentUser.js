import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../api/auth/account";
import { getUser, setUser } from "../../../utils/localStorage";

export const useCurrentUser = () => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const cachedUser = getUser();
      if (cachedUser) {
        setUserState(cachedUser);
      }

      const userData = await getCurrentUser();

      if (userData) {
        setUser(userData);
        setUserState(userData);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, setUser: setUserState, loading, refreshUser: fetchUser };
};
