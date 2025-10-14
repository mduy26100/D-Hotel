import { useState } from "react";
import { createHotelCategoryAPI } from "../../../api/hotels/hotelCategories";

export const useCreateHotelCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCategory = async (data) => {
    try {
      setLoading(true);
      const response = await createHotelCategoryAPI(data);
      return response;
    } catch (err) {
      console.error("Error creating hotel category:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, loading, error };
};
