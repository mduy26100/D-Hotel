import { useState, useEffect } from "react";
import { getUtilitiesAPI } from "../../apis/hotelCategoryApi";

export const useGetHotelCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getUtilitiesAPI();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching hotel categories:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};
