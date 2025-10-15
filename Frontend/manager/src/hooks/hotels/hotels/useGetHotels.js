import { useState, useEffect, useCallback } from "react";
import { getHotelsAPI } from "../../../api/hotels/hotels";

export const useGetHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHotelsAPI();
      setHotels(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  return { hotels, loading, error, refetch: fetchHotels };
};
