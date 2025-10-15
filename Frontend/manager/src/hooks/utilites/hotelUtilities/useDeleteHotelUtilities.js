import { useState } from "react";
import { deleteHotelUtilityAPI } from "../../../api/utilities/hotelUtilities";

export const useDeleteHotelUtilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeUtilities = async ({ hotelId, utilityIds }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteHotelUtilityAPI({ hotelId, utilityIds });
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  return { loading, error, removeUtilities };
};
