import { useState } from "react";
import { updateHotelUtilityAPI } from "../../../api/utilities/hotelUtilities";

export const useUpdateHotelUtilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUtilities = async ({ hotelId, utilityIds }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateHotelUtilityAPI({ hotelId, utilityIds });
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  return { loading, error, updateUtilities };
};
