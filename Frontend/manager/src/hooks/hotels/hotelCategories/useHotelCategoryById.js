import { useState, useEffect } from "react";
import { getHotelCategoryByIdAPI } from "../../../api/hotels/hotelCategories";

const cachedCategories = {};

export const useHotelCategoryById = (id) => {
  const [hotelCategory, setHotelCategory] = useState(
    id ? cachedCategories[id] || null : null
  );
  const [loading, setLoading] = useState(id ? !cachedCategories[id] : false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    if (cachedCategories[id]) {
      setHotelCategory(cachedCategories[id]);
      setLoading(false);
      return;
    }

    const fetchHotelCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHotelCategoryByIdAPI(id);
        cachedCategories[id] = data;
        setHotelCategory(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelCategory();
  }, [id]);

  return { hotelCategory, loading, error };
};
