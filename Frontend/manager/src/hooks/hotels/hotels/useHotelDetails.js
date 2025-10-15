import { useState, useEffect, useCallback } from "react";
import { getHotelDetailsAPI } from "../../../api/hotels/hotels";

const hotelCache = new Map();

export const useHotelDetails = (id) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotelDetails = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getHotelDetailsAPI(id);
      setHotel(data);
      hotelCache.set(id, data);
    } catch (err) {
      console.error("Failed to fetch hotel details:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    if (hotelCache.has(id)) {
      setHotel(hotelCache.get(id));
      setLoading(false);
    } else {
      fetchHotelDetails();
    }
  }, [id, fetchHotelDetails]);

  const refetch = async () => {
    await fetchHotelDetails();
  };

  return { hotel, loading, error, refetch };
};
