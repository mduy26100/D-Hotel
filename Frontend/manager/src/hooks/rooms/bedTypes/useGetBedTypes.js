import { useEffect, useState } from "react";
import { getBedTypesAPI } from "../../../api/rooms/bedTypes";

let cachedBedTypes = null;

export const useGetBedTypes = () => {
  const [bedTypes, setBedTypes] = useState(cachedBedTypes || []);
  const [loading, setLoading] = useState(!cachedBedTypes);
  const [error, setError] = useState(null);

  const fetchBedTypes = async () => {
    setLoading(true);
    setError(null);

    try {
      if (cachedBedTypes) {
        setBedTypes(cachedBedTypes);
      }

      const result = await getBedTypesAPI();

      let bedTypesArray = [];
      if (Array.isArray(result)) {
        bedTypesArray = result;
      } else if (Array.isArray(result.result)) {
        bedTypesArray = result.result;
      } else {
        console.warn("Unexpected API response format:", result);
      }

      cachedBedTypes = bedTypesArray;
      setBedTypes(bedTypesArray);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedBedTypes) {
      fetchBedTypes();
    }
  }, []);

  return { bedTypes, loading, error, refetch: fetchBedTypes };
};
