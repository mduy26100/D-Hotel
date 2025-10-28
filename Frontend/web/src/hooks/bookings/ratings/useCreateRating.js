import { useState } from "react";
import { createRatingAPI } from "../../../api/bookings/ratings/ratings";

export const useCreateRating = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createRating = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createRatingAPI(data);
      setSuccess(true);
    } catch (err) {
      setError(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { createRating, loading, error, success };
};
