import { useState } from "react";
import { updateBookingAPI } from "../../api/bookings/bookings";

export const useUpdateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateBooking = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateBookingAPI(data);
      setSuccess(true);
      return result;
    } catch (err) {
      console.error("useUpdateBooking error:", err);
      setError(err.message || "Failed to update booking");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateBooking,
    loading,
    error,
    success,
  };
};
