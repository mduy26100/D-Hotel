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

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      // 1️⃣ Gọi API login và lấy token
      const { accessToken } = await loginAPI(email, password);
      setToken(accessToken);

      // 2️⃣ Lấy thông tin user
      const userInfo = await getUserInfoAPI(accessToken);

      // 3️⃣ Lưu user + token vào localStorage + context
      const userWithToken = { ...userInfo, token: accessToken };
      setUserLocal(userWithToken);
      setUser(userWithToken);

      // 4️⃣ Điều hướng về home
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
