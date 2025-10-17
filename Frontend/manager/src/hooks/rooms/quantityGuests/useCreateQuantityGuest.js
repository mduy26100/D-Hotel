import { useState } from "react";
import { createQuantityGuestAPI } from "../../../api/rooms/quantityGuests";

export const useCreateQuantityGuest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createQuantityGuest = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createQuantityGuestAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createQuantityGuest, loading, error };
};
