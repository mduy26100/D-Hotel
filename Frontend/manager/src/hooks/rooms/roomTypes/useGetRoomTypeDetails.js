import { useState, useEffect } from "react";
import { getRoomTypeDetailsAPI } from "../../../api/rooms/roomTypes";

const cachedRoomTypeDetails = {};

export const useGetRoomTypeDetails = (roomTypeId) => {
  const [details, setDetails] = useState(
    cachedRoomTypeDetails[roomTypeId] || null
  );
  const [loading, setLoading] = useState(!cachedRoomTypeDetails[roomTypeId]);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    if (!roomTypeId) return;

    setLoading(true);
    setError(null);

    try {
      if (cachedRoomTypeDetails[roomTypeId]) {
        setDetails(cachedRoomTypeDetails[roomTypeId]);
      }

      const result = await getRoomTypeDetailsAPI(roomTypeId);

      let detailsObj = null;
      if (result && typeof result === "object") {
        detailsObj = result;
      } else if (result && result.result && typeof result.result === "object") {
        detailsObj = result.result;
      } else {
        console.warn("Unexpected API response format:", result);
      }

      cachedRoomTypeDetails[roomTypeId] = detailsObj;
      setDetails(detailsObj);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roomTypeId && !cachedRoomTypeDetails[roomTypeId]) {
      fetchDetails();
    } else if (cachedRoomTypeDetails[roomTypeId]) {
      setDetails(cachedRoomTypeDetails[roomTypeId]);
    }
  }, [roomTypeId]);

  return { details, loading, error, refetch: fetchDetails };
};
