import { useState } from "react";
import { updateUtilityItemAPI } from "../../apis/hotelCategoryApi";

export const useUpdateHotelCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCategory = async (data) => {
    try {
      setLoading(true);
      const response = await updateUtilityItemAPI(data);
      return response;
    } catch (err) {
      console.error("Error updating hotel category:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCategory, loading, error };
};
