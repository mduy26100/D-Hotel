import { useState } from "react";
import { deleteLocationAPI } from "../../../api/places/location";

export const useDeleteLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteLocation = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await deleteLocationAPI(id);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteLocation, loading, error };
};
