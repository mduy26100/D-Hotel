import { useState, useEffect } from "react";
import { getHotelCategoriesAPI } from "../../../api/hotels/hotelCategories";

let cachedCategories = null;

export const useGetHotelCategories = () => {
  const [categories, setCategories] = useState(cachedCategories || []);
  const [loading, setLoading] = useState(!cachedCategories);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    if (cachedCategories) {
      setCategories(cachedCategories);
      setLoading(false);
      return cachedCategories;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getHotelCategoriesAPI();
      setCategories(data);
      cachedCategories = data;
      return data;
    } catch (err) {
      console.error("Error fetching hotel categories:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedCategories) fetchCategories();
  }, []);

  const refetch = async () => {
    cachedCategories = null;
    return fetchCategories();
  };

  return { categories, loading, error, refetch };
};
