import { useState } from "react";
import { updateHotelLocationAPI } from "../../../api/places/hotelLocations";

export const useUpdateHotelLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHotelLocation = async (hotelId, data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateHotelLocationAPI(hotelId, data);
      return result;
    } catch (err) {
      setError(err);
      console.error("Update hotel location failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateHotelLocation, loading, error };
};
