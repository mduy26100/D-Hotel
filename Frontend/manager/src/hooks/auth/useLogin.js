import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/auth/auth";
import { setToken, setUser } from "../../utils/localStorage";
import { getRolesFromToken } from "../../utils/jwtDecode";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleLogin = async (formData) => {
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await loginAPI(formData.email, formData.password);

      if (response.accessToken) {
        setToken(response.accessToken);

        const roles = getRolesFromToken(response.accessToken);
        if (!roles.includes("Manager")) {
          setToast({
            message: "Access denied. Manager role required.",
            type: "error",
          });
          setLoading(false);
          return;
        }

        if (response.user) {
          setUser(response.user);
        }

        setToast({
          message: "Login successful! Redirecting...",
          type: "success",
        });

        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      setToast({
        message: "Login failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    toast,
    setToast,
    errors,
    setErrors,
  };
};
