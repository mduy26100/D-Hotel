import { useState } from "react";
import { deleteRoomTypePriceAPI } from "../../../api/rooms/roomTypePrices";

export const useDeleteRoomTypePrice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRoomTypePrice = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteRoomTypePriceAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRoomTypePrice, loading, error };
};
