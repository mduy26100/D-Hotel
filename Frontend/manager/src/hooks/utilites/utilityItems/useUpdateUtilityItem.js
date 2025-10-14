import { useState } from "react";
import { updateUtilityItemAPI } from "../../../api/utilities/utilityItems";

export const useUpdateUtilityItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateUtilityItem = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await updateUtilityItemAPI(data);
      setSuccess(true);
      return response;
    } catch (err) {
      console.error("Error update utility item:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUtilityItem,
    loading,
    error,
    success,
  };
};
