import { useEffect, useState } from "react";
import { getTravelPurposesAPI } from "../../../api/purposes/travelPurposes";

let cachedTravelPurposes = null;

export const useGetTravelPurposes = () => {
  const [travelPurposes, setTravelPurpose] = useState(
    cachedTravelPurposes || []
  );
  const [loading, setLoading] = useState(!cachedTravelPurposes);
  const [error, setError] = useState(null);

  const fetchTravelPurposes = async () => {
    setLoading(true);
    setError(null);

    try {
      if (cachedTravelPurposes) {
        setTravelPurpose(cachedTravelPurposes);
      }

      const result = await getTravelPurposesAPI();

      let travelPurposesArray = [];
      if (Array.isArray(result)) {
        travelPurposesArray = result;
      } else if (Array.isArray(result.result)) {
        travelPurposesArray = result.result;
      } else {
        console.warn("Unexpected API response format:", result);
      }

      cachedTravelPurposes = travelPurposesArray;
      setTravelPurpose(travelPurposesArray);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedTravelPurposes) {
      fetchTravelPurposes();
    }
  }, []);

  return { travelPurposes, loading, error, refetch: fetchTravelPurposes };
};
