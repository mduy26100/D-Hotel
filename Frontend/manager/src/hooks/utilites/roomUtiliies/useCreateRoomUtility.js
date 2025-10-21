"use client";

import { useState } from "react";
import { createRoomUtilityAPI } from "../../../api/utilities/roomUtilities";

export const useCreateRoomUtility = () => {
  const [loading, setLoading] = useState(false);

  const createRoomUtility = async (data) => {
    try {
      setLoading(true);
      const response = await createRoomUtilityAPI(data);
      return response;
    } catch (error) {
      console.error("Error creating room utility:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createRoomUtility, loading };
};
