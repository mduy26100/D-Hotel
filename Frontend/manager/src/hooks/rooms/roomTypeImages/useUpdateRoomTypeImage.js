import { useState } from "react";
import { updateRoomTypeImageAPI } from "../../../api/rooms/roomTypeImages";

export const useUpdateRoomTypeImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateImage = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateRoomTypeImageAPI(data);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { updateImage, loading, error };
};
