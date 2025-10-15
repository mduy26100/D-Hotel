import { useState } from "react";
import { deleteHotelAPI } from "../../../api/hotels/hotels";

export const useDeleteHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteHotel = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteHotelAPI(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteHotel, loading, error };
};
