import { useEffect, useState } from "react";
import { getRoomTypesAPI } from "../../../api/rooms/roomTypes";

let cachedRoomTypes = null;

export const useGetRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState(cachedRoomTypes || []);
  const [loading, setLoading] = useState(!cachedRoomTypes);
  const [error, setError] = useState(null);

  const fetchRoomTypes = async () => {
    setLoading(true);
    setError(null);

    try {
      if (cachedRoomTypes) {
        setRoomTypes(cachedRoomTypes);
      }

      const result = await getRoomTypesAPI();

      let roomTypesArray = [];
      if (Array.isArray(result)) {
        roomTypesArray = result;
      } else if (Array.isArray(result.result)) {
        roomTypesArray = result.result;
      } else {
        console.warn("Unexpected API response format:", result);
      }

      cachedRoomTypes = roomTypesArray;
      setRoomTypes(roomTypesArray);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedRoomTypes) {
      fetchRoomTypes();
    }
  }, []);

  return { roomTypes, loading, error, refetch: fetchRoomTypes };
};
