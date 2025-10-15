import { useState, useEffect, useCallback } from "react";
import { getHotelsAPI } from "../../../api/hotels/hotels";

let cachedHotels = null;

export const useGetHotels = () => {
  const [hotels, setHotels] = useState(cachedHotels || []);
  const [loading, setLoading] = useState(!cachedHotels);
  const [error, setError] = useState(null);

  const fetchHotels = useCallback(async () => {
    if (cachedHotels) {
      setHotels(cachedHotels);
      setLoading(false);
      return cachedHotels;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getHotelsAPI();
      setHotels(data);
      cachedHotels = data;
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!cachedHotels) fetchHotels();
  }, [fetchHotels]);

  const refetch = async () => {
    cachedHotels = null;
    return fetchHotels();
  };

  return { hotels, loading, error, refetch };
};
