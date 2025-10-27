import { useState, useEffect } from "react";
import { getBookingFullAPI } from "../../api/bookings/bookings";

export const useBookingFull = (bookingId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getBookingFullAPI(bookingId);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return { data, loading, error };
};
