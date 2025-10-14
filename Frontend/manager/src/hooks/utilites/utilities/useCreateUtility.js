import { useState } from "react";
import { createUtilityAPI } from "../../../api/utilities/utilities";

export const useCreateUtility = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createUtility = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createUtilityAPI(formData);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUtility,
    data,
    loading,
    error,
  };
};
