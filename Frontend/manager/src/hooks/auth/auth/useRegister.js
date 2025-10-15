import { useState } from "react";
import { registerAPI } from "../../../api/auth/auth";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await registerAPI(formData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed, please try again!"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};
