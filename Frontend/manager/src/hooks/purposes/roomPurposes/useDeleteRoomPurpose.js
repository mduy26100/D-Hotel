import { useState } from "react";
import { deleteRoomPurposeAPI } from "../../../api/purposes/roomPurposes";

export const useDeleteRoomPurpose = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRoomPurpose = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteRoomPurposeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRoomPurpose, loading, error };
};
