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

  // Login with email/password
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        dto: {
          email,
          password,
          provider: "EmailPassword",
        },
      };

      const res = await loginAPI(payload);
      console.log("Email login response:", res);

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
      console.error("Email login error:", err);
      setError(err?.message || JSON.stringify(err) || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login via Facebook access token
  const loginWithFacebook = async (fbAccessToken, fbEmail) => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        dto: {
          provider: "Facebook",
          accessToken: fbAccessToken,
          email: fbEmail || "noemail@facebook.com",
          password: "facebook_login", // dummy password
        },
      };

      const { accessToken, refreshToken } = await loginAPI(payload);
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

  return { loginWithEmail, loginWithFacebook, loading, error };
}
