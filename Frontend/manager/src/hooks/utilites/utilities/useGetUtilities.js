import { useEffect, useState } from "react";
import { getUtilitiesAPI } from "../../../api/utilities/utilities";

let cachedUtilities = null; // client-side cache

export const useGetUtilities = () => {
  const [utilities, setUtilities] = useState(cachedUtilities || []);
  const [loading, setLoading] = useState(!cachedUtilities);
  const [error, setError] = useState(null);

  const fetchUtilities = async () => {
    setLoading(true);
    setError(null);
    try {
      // Nếu đã có cached, set ngay
      if (cachedUtilities) {
        setUtilities(cachedUtilities);
      }

      const data = await getUtilitiesAPI();

      let results = [];
      if (Array.isArray(data)) {
        results = data;
      } else if (Array.isArray(data.result)) {
        results = data.result;
      } else {
        console.warn("Unexpected API response format:", data);
      }

      cachedUtilities = results; // lưu vào cache
      setUtilities(results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedUtilities) {
      fetchUtilities();
    }
  }, []);

  return { utilities, loading, error, refetch: fetchUtilities };
};
