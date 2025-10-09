import { useEffect, useState } from "react";
import { hotelsAPI } from "../../../api/hotels/hotels";

export function useHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await hotelsAPI();
        setHotels(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return { hotels, loading, error };
}
