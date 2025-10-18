import { useEffect, useState } from "react";
import { getRoomTypePricesAPI } from "../../../api/rooms/roomTypePrices";

let cachedRoomTypePrices = null;

export const useGetRoomTypePrices = () => {
  const [roomTypePrices, setRoomTypePrices] = useState(
    cachedRoomTypePrices || []
  );
  const [loading, setLoading] = useState(!cachedRoomTypePrices);
  const [error, setError] = useState(null);

  const fetchRoomTypePrices = async () => {
    setLoading(true);
    setError(null);

    try {
      if (cachedRoomTypePrices) {
        setRoomTypePrices(cachedRoomTypePrices);
      }

      const result = await getRoomTypePricesAPI();

      let roomTypePricesArray = [];
      if (Array.isArray(result)) {
        roomTypePricesArray = result;
      } else if (Array.isArray(result.result)) {
        roomTypePricesArray = result.result;
      } else {
        console.warn("Unexpected API response format:", result);
      }

      cachedRoomTypePrices = roomTypePricesArray;
      setRoomTypePrices(roomTypePricesArray);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedRoomTypePrices) {
      fetchRoomTypePrices();
    }
  }, []);

  return { roomTypePrices, loading, error, refetch: fetchRoomTypePrices };
};
