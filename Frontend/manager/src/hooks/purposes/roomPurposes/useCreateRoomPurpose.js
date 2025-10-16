import { useState } from "react";
import { createRoomPurposeAPI } from "../../../api/purposes/roomPurposes";

export const useCreateRoomPurpose = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRoomPurpose = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createRoomPurposeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createRoomPurpose, loading, error };
};
