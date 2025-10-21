import { useState } from "react";
import { deleteRoomTypeImageAPI } from "../../../api/rooms/roomTypeImages";

export const useDeleteRoomTypeImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteImage = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteRoomTypeImageAPI(data);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { deleteImage, loading, error };
};
