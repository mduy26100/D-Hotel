import { useState } from "react";
import { deleteQuantityGuestAPI } from "../../../api/rooms/quantityGuests";

export const useDeleteQuantityGuest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteQuantityGuest = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteQuantityGuestAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteQuantityGuest, loading, error };
};
