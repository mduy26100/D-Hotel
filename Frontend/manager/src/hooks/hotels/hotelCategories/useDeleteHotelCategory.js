import { useState } from "react";
import { deleteHotelCategoryAPI } from "../../../api/hotels/hotelCategories";

export const useDeleteHotelCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCategory = async (data) => {
    try {
      setLoading(true);
      const response = await deleteHotelCategoryAPI(data);
      return response;
    } catch (err) {
      console.error("Error deleting hotel category:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCategory, loading, error };
};
