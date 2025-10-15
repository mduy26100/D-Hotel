import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../api/auth/account";
import { getUser, setUser } from "../../../utils/localStorage";

let cachedUser = null; // client-side cache

export const useCurrentUser = () => {
  const [user, setUserState] = useState(cachedUser || getUser());
  const [loading, setLoading] = useState(!cachedUser);

  const fetchUser = async () => {
    try {
      if (cachedUser) {
        setUserState(cachedUser);
      }

      const userData = await getCurrentUser();

      if (userData) {
        cachedUser = userData;
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
    if (!cachedUser) {
      fetchUser();
    }
  }, []);

  return { user, setUser: setUserState, loading, refreshUser: fetchUser };
};
