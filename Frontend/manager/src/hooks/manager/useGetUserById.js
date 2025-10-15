import { useState, useEffect, useCallback } from "react";
import { getUserByIdAPI } from "../../api/manager/managerUsers";

const cachedUsersById = {};

export const useGetUserById = (initialId = null) => {
  const [user, setUser] = useState(
    initialId ? cachedUsersById[initialId] || null : null
  );
  const [loading, setLoading] = useState(
    initialId ? !cachedUsersById[initialId] : false
  );
  const [error, setError] = useState(null);
  const [id, setId] = useState(initialId);

  const fetchUser = useCallback(async (userId) => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      // Nếu có cache, set ngay
      if (cachedUsersById[userId]) {
        setUser(cachedUsersById[userId]);
      }

      const data = await getUserByIdAPI(userId);
      cachedUsersById[userId] = data;
      setUser(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id !== null && !cachedUsersById[id]) {
      fetchUser(id);
    }
  }, [id, fetchUser]);

  const refetch = (newId = id) => {
    setId(newId);
    fetchUser(newId);
  };

  return { user, loading, error, refetch, setId };
};
