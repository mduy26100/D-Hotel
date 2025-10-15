import { useState } from "react";
import { updateProfileAPI } from "../../../api/auth/account";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateProfileAPI(data);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Update information failed! Please try again!"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error, success };
};
