import { useState, useEffect, useCallback } from "react";
import { roomsByHotelIdAPI } from "../../../api/rooms/roomTypes";

export const useRoomsByHotelId = (params) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = useCallback(async () => {
    if (!params?.hotelId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await roomsByHotelIdAPI(params);
      setRooms(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // refetch sẽ gọi API lại
  const refetch = async () => fetchRooms();

  return { rooms, loading, error, refetch };
};
