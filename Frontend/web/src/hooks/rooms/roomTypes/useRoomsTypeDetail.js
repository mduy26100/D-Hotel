import { useState, useEffect } from "react";
import { roomsTypeDetailAPI } from "../../../api/rooms/roomTypes";

export const useRoomsTypeDetail = (roomTypeId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomTypeId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await roomsTypeDetailAPI(roomTypeId);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomTypeId]);

  return { data, loading, error };
};
