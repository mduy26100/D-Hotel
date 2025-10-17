import { useState } from "react";
import { updateHotelTravelPurposeAPI } from "../../../api/purposes/hotelTravelPurpose";

export const useUpdateHotelTravelPurpose = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHotelTravelPurpose = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateHotelTravelPurposeAPI(payload);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateHotelTravelPurpose, loading, error };
};
