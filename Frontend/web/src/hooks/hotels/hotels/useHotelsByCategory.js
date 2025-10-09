import { useState, useEffect } from "react";
import { hotelByCategoriesIdAPI } from "../../../api/hotels/hotels";

export function useHotelsByCategory(categoryId) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await hotelByCategoriesIdAPI(categoryId);
        setHotels(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [categoryId]);

  return { hotels, loading, error };
}
