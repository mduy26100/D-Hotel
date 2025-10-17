import { useState } from "react";
import { deleteBedTypeAPI } from "../../../api/rooms/bedTypes";

export const useDeleteBedType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteBedType = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteBedTypeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteBedType, loading, error };
};
