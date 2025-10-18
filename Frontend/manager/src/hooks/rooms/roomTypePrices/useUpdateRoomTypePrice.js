import { useState } from "react";
import { updateRoomTypePriceAPI } from "../../../api/rooms/roomTypePrices";

export const useUpdateRoomTypePrice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateRoomTypePrice = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateRoomTypePriceAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateRoomTypePrice, loading, error };
};
