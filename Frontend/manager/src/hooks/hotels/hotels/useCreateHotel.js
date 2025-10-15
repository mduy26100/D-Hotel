import { useState } from "react";
import { createHotelAPI } from "../../../api/hotels/hotels";

export const useCreateHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createHotel = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createHotelAPI(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createHotel, loading, error };
};
