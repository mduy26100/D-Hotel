import { useEffect, useState } from "react";
import { getQuantityGuestsAPI } from "../../../api/rooms/quantityGuests";

let cachedQuantityGuests = null;

export const useGetQuantityGuests = () => {
  const [quantityGuests, setQuantityGuests] = useState(
    cachedQuantityGuests || []
  );
  const [loading, setLoading] = useState(!cachedQuantityGuests);
  const [error, setError] = useState(null);

  const fetchQuantityGuests = async () => {
    setLoading(true);
    setError(null);

    try {
      if (cachedQuantityGuests) {
        setQuantityGuests(cachedQuantityGuests);
      }

      const result = await getQuantityGuestsAPI();

      let quantityGuestsArray = [];
      if (Array.isArray(result)) {
        quantityGuestsArray = result;
      } else if (Array.isArray(result.result)) {
        quantityGuestsArray = result.result;
      } else {
        console.warn("Unexpected API response format:", result);
      }

      cachedQuantityGuests = quantityGuestsArray;
      setQuantityGuests(quantityGuestsArray);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedQuantityGuests) {
      fetchQuantityGuests();
    }
  }, []);

  return { quantityGuests, loading, error, refetch: fetchQuantityGuests };
};
