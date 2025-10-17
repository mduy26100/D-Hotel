import { useState } from "react";
import { updateQuantityGuestAPI } from "../../../api/rooms/quantityGuests";

export const useUpdateQuantityGuest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateQuantityGuest = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateQuantityGuestAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateQuantityGuest, loading, error };
};
