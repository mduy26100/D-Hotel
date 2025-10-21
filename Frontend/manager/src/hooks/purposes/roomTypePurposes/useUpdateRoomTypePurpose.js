"use client";

import { useState } from "react";
import { updateRoomTypePurposeAPI } from "../../../api/purposes/roomTypePurposes";

export const useUpdateRoomTypePurpose = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const updateRoomTypePurpose = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await updateRoomTypePurposeAPI(data);
      setSuccess(true);
      return response;
    } catch (err) {
      console.error("Error updating room type purpose:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateRoomTypePurpose, loading, success, error };
};
