import { useEffect, useState } from "react";
import { getRoomPurposesAPI } from "../../../api/purposes/roomPurposes";

let cachedRoomPurposes = null;

export const useGetRoomPurposes = () => {
  const [roomPurposes, setRoomPurposes] = useState(cachedRoomPurposes || []);
  const [loading, setLoading] = useState(!cachedRoomPurposes);
  const [error, setError] = useState(null);

  const fetchRoomPurposes = async () => {
    setLoading(true);
    setError(null);

    try {
      if (cachedRoomPurposes) {
        setRoomPurposes(cachedRoomPurposes);
      }

      const result = await getRoomPurposesAPI();

      let roomPurposesArray = [];
      if (Array.isArray(result)) {
        roomPurposesArray = result;
      } else if (Array.isArray(result.result)) {
        roomPurposesArray = result.result;
      } else {
        console.warn("Unexpected API response format:", result);
      }

      cachedRoomPurposes = roomPurposesArray;
      setRoomPurposes(roomPurposesArray);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cachedRoomPurposes) {
      fetchRoomPurposes();
    }
  }, []);

  return { roomPurposes, loading, error, refetch: fetchRoomPurposes };
};
