import { useState } from "react";
import { createRoomTypeAPI } from "../../../api/rooms/roomTypes";

export const useCreateRoomType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRoomType = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createRoomTypeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createRoomType, loading, error };
};
