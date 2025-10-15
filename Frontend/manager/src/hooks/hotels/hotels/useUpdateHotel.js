import { useState } from "react";
import { updateHotelAPI } from "../../../api/hotels/hotels";

export const useUpdateHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHotel = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateHotelAPI(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateHotel, loading, error };
};
