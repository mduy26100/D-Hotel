import { useEffect, useState } from "react";
import { getAllLocationsAPI } from "../../../api/places/location";

let cachedLocations = null;

export const useGetAllLocations = () => {
  const [locations, setLocations] = useState(cachedLocations || []);
  const [loading, setLoading] = useState(!cachedLocations);
  const [error, setError] = useState(null);

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      if (cachedLocations) {
        setLocations(cachedLocations);
      }

      const data = await getAllLocationsAPI();

      let results = [];
      if (Array.isArray(data)) {
        results = data;
      } else if (Array.isArray(data.result)) {
        results = data.result;
      } else {
        console.warn("Unexpected API response format:", data);
      }

      cachedLocations = results;
      setLocations(results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedLocations) {
      fetchLocations();
    }
  }, []);

  const refetch = async () => {
    cachedLocations = null;
    await fetchLocations();
  };

  return { locations, loading, error, refetch };
};
