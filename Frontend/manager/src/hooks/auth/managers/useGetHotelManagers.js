"use client";

import { useState, useEffect } from "react";
import { getHotelManagerUser } from "../../../api/auth/managers";

export const useGetHotelManagers = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchManagers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHotelManagerUser();
      setManagers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return { managers, loading, error, refetch: fetchManagers };
};
