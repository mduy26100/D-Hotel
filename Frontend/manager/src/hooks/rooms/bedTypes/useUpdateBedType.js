import { useState } from "react";
import { updateBedTypeAPI } from "../../../api/rooms/bedTypes";

export const useUpdateBedType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBedType = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateBedTypeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateBedType, loading, error };
};
