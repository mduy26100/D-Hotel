// hooks/auth/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/auth/auth";
import { getUserInfoAPI } from "../../api/auth/account";
import { setToken, setUser as setUserLocal } from "../../utils/localStorage";
import { useAuthContext } from "../../context/AuthContext";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  // -------------------------------
  // Email login
  // -------------------------------
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const payload = { dto: { email, password, provider: "EmailPassword" } };
      const res = await loginAPI(payload);
      const accessToken = res?.accessToken;
      if (!accessToken) throw new Error("No access token returned from API");

      setToken(accessToken);
      const userInfo = await getUserInfoAPI(accessToken);
      const userWithToken = { ...userInfo, token: accessToken };

      setUserLocal(userWithToken);
      setUser(userWithToken);
      navigate("/");
      return userWithToken;
    } catch (err) {
      setError(err?.message || JSON.stringify(err) || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Facebook login
  // -------------------------------
  const loginWithFacebook = async (fbAccessToken, fbEmail) => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        dto: {
          provider: "Facebook",
          accessToken: fbAccessToken,
          email: fbEmail || "noemail@facebook.com",
          password: "facebook_login",
        },
      };

      const { accessToken } = await loginAPI(payload);
      setToken(accessToken);
      const userInfo = await getUserInfoAPI(accessToken);
      const userWithToken = { ...userInfo, token: accessToken };

      setUserLocal(userWithToken);
      setUser(userWithToken);
      navigate("/");
      return userWithToken;
    } catch (err) {
      setError(err?.message || JSON.stringify(err) || "Facebook login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Google login
  // -------------------------------
  const loginWithGoogle = async (googleIdToken, googleEmail) => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        dto: {
          provider: "Google",
          accessToken: googleIdToken,
          email: googleEmail || "noemail@gmail.com",
          password: "google_login", // dummy password
        },
      };

      const { accessToken } = await loginAPI(payload);
      setToken(accessToken);

      const userInfo = await getUserInfoAPI(accessToken);
      const userWithToken = { ...userInfo, token: accessToken };

      setUserLocal(userWithToken);
      setUser(userWithToken);
      navigate("/");
      return userWithToken;
    } catch (err) {
      setError(err?.message || JSON.stringify(err) || "Google login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginWithEmail, loginWithFacebook, loginWithGoogle, loading, error };
}
