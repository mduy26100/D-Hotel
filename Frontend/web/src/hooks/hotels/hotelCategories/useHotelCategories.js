import { useState, useEffect } from "react";
import { hotelCategoriesAPI } from "../../../api/hotels/hotelCategories";

export const useHotelCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await hotelCategoriesAPI();
        if (isMounted) {
          setCategories(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error fetching hotel categories");
          setCategories([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
};
