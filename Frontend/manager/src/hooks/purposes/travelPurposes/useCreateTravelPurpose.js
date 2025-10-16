import { useState } from "react";
import { createTravelPurposeAPI } from "../../../api/purposes/travelPurposes";

export const useCreateTravelPurpose = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTravelPurpose = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createTravelPurposeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTravelPurpose, loading, error };
};
