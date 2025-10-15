import { useState } from "react";
import { createHotelUtilityAPI } from "../../../api/utilities/hotelUtilities";

export const useAddHotelUtilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUtilities = async ({ hotelId, utilityIds }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createHotelUtilityAPI({ hotelId, utilityIds });
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  return { loading, error, addUtilities };
};
