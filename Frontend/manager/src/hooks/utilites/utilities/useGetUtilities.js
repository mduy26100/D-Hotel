import { useEffect, useState } from "react";
import { getUtilitiesAPI } from "../../../api/utilities/utilities";

export const useGetUtilities = () => {
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUtilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUtilitiesAPI();

      if (Array.isArray(data)) {
        setUtilities(data);
      } else if (Array.isArray(data.result)) {
        setUtilities(data.result);
      } else {
        console.warn("Unexpected API response format:", data);
        setUtilities([]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUtilities();
  }, []);

  return { utilities, loading, error, refetch: fetchUtilities };
};
