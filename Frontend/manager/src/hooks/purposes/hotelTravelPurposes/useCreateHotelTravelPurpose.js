import { useState } from "react";
import { createHotelTravelPurposeAPI } from "../../../api/purposes/hotelTravelPurpose";

export const useCreateHotelTravelPurpose = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createHotelTravelPurpose = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createHotelTravelPurposeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createHotelTravelPurpose, loading, error };
};
