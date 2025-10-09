import { useState, useEffect } from "react";
import { hotelDetailsAPI } from "../../../api/hotels/hotels";

export function useHotelDetails(hotelId) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) return;

    const fetchHotelDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await hotelDetailsAPI(hotelId);
        setHotel(res.data);
      } catch (err) {
        setError(err.message || "Failed to load hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  return { hotel, loading, error };
}
