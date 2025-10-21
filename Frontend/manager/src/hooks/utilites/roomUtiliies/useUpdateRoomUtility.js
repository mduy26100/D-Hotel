"use client";

import { useState } from "react";
import { updateRoomUtilityAPI } from "../../../api/utilities/roomUtilities";

export const useUpdateRoomUtility = () => {
  const [loading, setLoading] = useState(false);

  const updateRoomUtility = async (data) => {
    try {
      setLoading(true);
      const response = await updateRoomUtilityAPI(data);
      return response;
    } catch (error) {
      console.error("Error updating room utility:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateRoomUtility, loading };
};
