import { useState } from "react";
import { createBedTypeAPI } from "../../../api/rooms/bedTypes";

export const useCreateBedType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBedType = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createBedTypeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBedType, loading, error };
};
