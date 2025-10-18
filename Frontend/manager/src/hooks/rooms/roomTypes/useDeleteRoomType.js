import { useState } from "react";
import { deleteRoomTypeAPI } from "../../../api/rooms/roomTypes";

export const useDeleteRoomType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRoomType = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteRoomTypeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRoomType, loading, error };
};
