import { useEffect, useState } from "react";
import { getBookingsByUserIdAPI } from "../../api/bookings/bookings";

export const useUserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        // Gọi API mà không cần truyền userId
        const data = await getBookingsByUserIdAPI();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading, error };
};
