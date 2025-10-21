"use client";

import { useState } from "react";
import { createRoomTypePurposeAPI } from "../../../api/purposes/roomTypePurposes";

export const useCreateRoomTypePurpose = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const createRoomTypePurpose = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await createRoomTypePurposeAPI(data);
      setSuccess(true);
      return response;
    } catch (err) {
      console.error("Error creating room type purpose:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createRoomTypePurpose, loading, success, error };
};
