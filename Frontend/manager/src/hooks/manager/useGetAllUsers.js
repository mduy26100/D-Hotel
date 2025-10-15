import { useState, useEffect, useCallback } from "react";
import { getAllUsersAPI } from "../../api/manager/managerUsers";

const cachedUsers = {}; // key = role, value = users array

export const useGetAllUsers = (role = null) => {
  const [users, setUsers] = useState(cachedUsers[role] || []);
  const [loading, setLoading] = useState(!cachedUsers[role]);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Nếu có cache, set ngay
      if (cachedUsers[role]) {
        setUsers(cachedUsers[role]);
      }

      const data = await getAllUsersAPI(role);
      cachedUsers[role] = data; // lưu cache
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    if (!cachedUsers[role]) {
      fetchUsers();
    }
  }, [fetchUsers, role]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
};
