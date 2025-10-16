import { useState } from "react";
import { deleteHotelLocationAPI } from "../../../api/places/hotelLocations";

export const useDeleteHotelLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteHotelLocation = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteHotelLocationAPI(data);
      return result;
    } catch (err) {
      setError(err);
      console.error("Delete hotel location failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteHotelLocation, loading, error };
};
