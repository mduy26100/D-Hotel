import { useState } from "react";
import { updateUtilityAPI } from "../../../api/utilities/utilities";

export const useUpdateUtility = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateUtility = async (formData) => {
    if (!formData.id) throw new Error("Missing utility ID for update");

    setLoading(true);
    setError(null);
    try {
      const result = await updateUtilityAPI(formData);
      setData(result);
      return result;
    } catch (err) {
      console.error("Update utility failed:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUtility,
    data,
    loading,
    error,
  };
};
