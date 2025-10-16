import { useState } from "react";
import { createLocationAPI } from "../../../api/places/location";

export const useCreateLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLocation = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await createLocationAPI(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createLocation, loading, error };
};
