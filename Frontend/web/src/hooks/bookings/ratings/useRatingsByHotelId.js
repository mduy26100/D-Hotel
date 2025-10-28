import { useState, useEffect } from "react";
import { getRatingsByHotelIdAPI } from "../../../api/bookings/ratings/ratings";

export const useRatingsByHotelId = (hotelId) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) return;

    const fetchRatings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRatingsByHotelIdAPI(hotelId);
        setRatings(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [hotelId]);

  return { ratings, loading, error };
};
