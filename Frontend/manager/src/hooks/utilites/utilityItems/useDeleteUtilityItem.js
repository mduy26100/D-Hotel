import { useState } from "react";
import { deleteUtilityItemAPI } from "../../../api/utilities/utilityItems";

export const useDeleteUtilityItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteUtilityItem = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await deleteUtilityItemAPI(data);
      setSuccess(true);
      return response;
    } catch (err) {
      console.error("Error delete utility item:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUtilityItem,
    loading,
    error,
    success,
  };
};
