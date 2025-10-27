import { useState } from "react";
import { createBookingAPI } from "../../api/bookings/bookings";

export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createBookingAPI(bookingData);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error, data };
};
