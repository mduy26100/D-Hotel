import { useState } from "react";
import { updateTravelPurposeAPI } from "../../../api/purposes/travelPurposes";

export const useUpdateTravelPurpose = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTravelPurpose = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateTravelPurposeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateTravelPurpose, loading, error };
};
