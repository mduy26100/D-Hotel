import { useState, useEffect } from "react";
import { getRoomTypeImagesAPI } from "../../../api/rooms/roomTypeImages";

const cachedRoomTypeImages = {};

export const useGetRoomTypeImages = (roomTypeId) => {
  const [images, setImages] = useState(cachedRoomTypeImages[roomTypeId] || []);
  const [loading, setLoading] = useState(!cachedRoomTypeImages[roomTypeId]);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    if (!roomTypeId) return;

    setLoading(true);
    setError(null);

    try {
      if (cachedRoomTypeImages[roomTypeId]) {
        setImages(cachedRoomTypeImages[roomTypeId]);
      }

      const result = await getRoomTypeImagesAPI(roomTypeId);

      let imagesArray = [];
      if (Array.isArray(result)) {
        imagesArray = result;
      } else if (Array.isArray(result.result)) {
        imagesArray = result.result;
      } else {
        console.warn("Unexpected API response format:", result);
      }

      cachedRoomTypeImages[roomTypeId] = imagesArray;
      setImages(imagesArray);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roomTypeId && !cachedRoomTypeImages[roomTypeId]) {
      fetchImages();
    } else if (cachedRoomTypeImages[roomTypeId]) {
      setImages(cachedRoomTypeImages[roomTypeId]);
    }
  }, [roomTypeId]);

  return { images, loading, error, refetch: fetchImages };
};
