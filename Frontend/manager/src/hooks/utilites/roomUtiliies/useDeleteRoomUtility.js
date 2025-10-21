"use client";

import { useState } from "react";
import { deleteRoomUtilityAPI } from "../../../api/utilities/roomUtilities";

export const useDeleteRoomUtility = () => {
  const [loading, setLoading] = useState(false);

  const deleteRoomUtility = async (data) => {
    try {
      setLoading(true);
      const response = await deleteRoomUtilityAPI(data);
      return response;
    } catch (error) {
      console.error("Error deleting room utility:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRoomUtility, loading };
};
