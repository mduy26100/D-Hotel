import { useEffect, useState, useCallback } from "react";
import { getBookingsByUserIdAPI } from "../../api/bookings/bookings";

export const useUserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getBookingsByUserIdAPI();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Trả về cả dữ liệu và hàm refetch
  return { bookings, loading, error, refetch: fetchBookings };
};
