import { useState } from "react";
import { updateLocationAPI } from "../../../api/places/location";

export const useUpdateLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLocation = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await updateLocationAPI(id, data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateLocation, loading, error };
};
