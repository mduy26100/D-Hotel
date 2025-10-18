import { useState } from "react";
import { createRoomTypePriceAPI } from "../../../api/rooms/roomTypePrices";

export const useCreateRoomTypePrice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRoomTypePrice = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createRoomTypePriceAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createRoomTypePrice, loading, error };
};
