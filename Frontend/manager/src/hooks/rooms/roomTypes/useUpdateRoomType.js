import { useState } from "react";
import { updateRoomTypeAPI } from "../../../api/rooms/roomTypes";

export const useUpdateRoomType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateRoomType = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateRoomTypeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateRoomType, loading, error };
};
