import { useState } from "react";
import { deleteTravelPurposeAPI } from "../../../api/purposes/travelPurposes";

export const useDeleteTravelPurpose = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTravelPurpose = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteTravelPurposeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTravelPurpose, loading, error };
};
