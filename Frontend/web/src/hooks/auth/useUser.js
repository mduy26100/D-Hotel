import { useState, useEffect, useCallback } from "react";
import { getUserInfoAPI } from "../../api/auth/account";

export function useUser(token) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user info from API
  const fetchUser = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const userInfo = await getUserInfoAPI(token);
      setUser(userInfo);
      return userInfo;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ✅ Auto fetch when token changes
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ✅ Allow manual refetch
  const refetch = fetchUser;

  return {
    user,
    setUser,
    loading,
    refetch,
  };
}
