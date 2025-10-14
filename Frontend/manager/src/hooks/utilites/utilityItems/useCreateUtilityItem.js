import { useState } from "react";
import { createUtilityItemAPI } from "../../../api/utilities/utilityItems";

export const useCreateUtilityItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createUtilityItem = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await createUtilityItemAPI(data);
      setSuccess(true);
      return response;
    } catch (err) {
      console.error("Error creating utility item:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUtilityItem,
    loading,
    error,
    success,
  };
};
