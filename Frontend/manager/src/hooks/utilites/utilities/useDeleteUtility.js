import { useState } from "react";
import { deleteUtilityAPI } from "../../../api/utilities/utilities";

export const useDeleteUtility = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteUtility = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await deleteUtilityAPI(data);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err);
      console.error("Error deleting utility:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUtility, loading, error, success };
};
