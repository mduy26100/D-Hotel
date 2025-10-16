import { useState } from "react";
import { createHotelLocationAPI } from "../../../api/places/hotelLocations";

export const useCreateHotelLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createHotelLocation = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createHotelLocationAPI(data);
      return result;
    } catch (err) {
      setError(err);
      console.error("Create hotel location failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createHotelLocation, loading, error };
};
