import { useState, useEffect } from "react";
import { getRatingsByUserAPI } from "../../../api/bookings/ratings/ratings";

export const useRatingsByUser = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRatingsByUserAPI();
        setRatings(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  return { ratings, loading, error };
};
