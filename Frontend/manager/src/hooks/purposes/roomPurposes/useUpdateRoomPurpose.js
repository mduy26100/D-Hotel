import { useState } from "react";
import { updateRoomPurposeAPI } from "../../../api/purposes/roomPurposes";

export const useUpdateRoomPurpose = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateRoomPurpose = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateRoomPurposeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateRoomPurpose, loading, error };
};
