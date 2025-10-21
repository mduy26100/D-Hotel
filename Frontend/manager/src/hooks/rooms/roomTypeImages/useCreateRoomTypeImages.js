import { useState } from "react";
import { createRoomTypeImageAPI } from "../../../api/rooms/roomTypeImages";

export const useCreateRoomTypeImages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createImages = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createRoomTypeImageAPI(data);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { createImages, loading, error };
};
