"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import { notification } from "antd"; // ✅ import notification

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginWithEmail, loginWithFacebook, loginWithGoogle, loading, error } =
    useLogin();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(form.email, form.password);
      notification.success({
        message: "Login successful",
        description: "You have successfully logged in.",
      });
    } catch (err) {
      notification.error({
        message: "Login failed",
        description: err?.message || "Please try again.",
      });
    }
  };

  const handleFbSuccess = async (response) => {
    const accessToken = response?.accessToken;
    if (!accessToken) {
      notification.error({
        message: "Facebook login failed",
        description: "No access token returned.",
      });
      return;
    }
    try {
      await loginWithFacebook(accessToken);
      notification.success({
        message: "Login with Facebook successful",
        description: "You have successfully logged in with Facebook.",
      });
    } catch (err) {
      notification.error({
        message: "Facebook login failed",
        description: err?.message || "Please try again.",
      });
    }
  };

  const handleFbError = () => {
    notification.error({
      message: "Facebook login cancelled",
      description: "You cancelled or failed to login with Facebook.",
    });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      notification.error({
        message: "Google login failed",
        description: "No credential returned.",
      });
      return;
    }
    try {
      await loginWithGoogle(idToken);
      notification.success({
        message: "Login with Google successful",
        description: "You have successfully logged in with Google.",
      });
    } catch (err) {
      notification.error({
        message: "Google login failed",
        description: err?.message || "Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 space-y-8 animate-fadeIn">
        <h2 className="text-4xl font-extrabold text-[#003B95] text-center tracking-wide">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500">
          Sign in to continue your journey
        </p>

        {/* EMAIL LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#003B95] focus:border-[#003B95] transition"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#003B95] to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300 flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin border-2 border-t-2 border-white rounded-full w-6 h-6"></span>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="text-sm text-gray-400">Or continue with</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
          {/* Facebook */}
          <FacebookLogin
            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
            onSuccess={handleFbSuccess}
            onFail={handleFbError}
            scope="public_profile,email"
            render={({ onClick }) => (
              <button
                onClick={onClick}
                className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-gray-300 shadow-md hover:shadow-lg transition bg-white font-semibold w-full sm:w-auto"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.22 10.44 22v-6.99H7.9v-2.94h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.85h2.74l-.44 2.94h-2.3V22C18.34 21.22 22 17.09 22 12.07z"
                    fill="#1877F2"
                  />
                </svg>
                <span className="text-[#1877F2]">Facebook</span>
              </button>
            )}
          />

          {/* Google */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() =>
              notification.error({
                message: "Google login failed",
                description: "Please try again.",
              })
            }
            useOneTap
            render={({ onClick, disabled }) => (
              <button
                onClick={onClick}
                disabled={disabled}
                className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-gray-300 shadow-md hover:shadow-lg transition bg-white font-semibold w-full sm:w-auto"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.7 1.22 9.19 3.6l6.85-6.85C35.85 2.88 30.3 0.5 24 0.5 14.9 0.5 7.1 5.9 3.43 13.25l7.99 6.22C12.73 13.38 17.9 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.5 24.5c0-1.63-.15-3.2-.43-4.72H24v9.45h12.65c-.55 2.96-2.18 5.47-4.64 7.17l7.23 5.61C43.56 38.27 46.5 31.94 46.5 24.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M11.42 28.03a14.45 14.45 0 010-8.06l-7.99-6.22A23.47 23.47 0 000 24.5c0 3.81.9 7.42 2.48 10.61l8.94-7.08z"
                  />
                  <path
                    fill="#4285F4"
                    d="M24 47.5c6.3 0 11.6-2.08 15.47-5.68l-7.23-5.61c-2.01 1.35-4.58 2.14-8.24 2.14-6.1 0-11.27-3.88-13.14-9.31l-8.94 7.08C7.1 42.1 14.9 47.5 24 47.5z"
                  />
                </svg>
                <span className="text-gray-700">Google</span>
              </button>
            )}
          />
        </div>

        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#003B95] font-semibold hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
