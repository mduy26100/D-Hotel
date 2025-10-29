"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import { notification } from "antd";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { loginWithEmail, loginWithFacebook, loginWithGoogle, loading, error } =
    useLogin();

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email format is invalid";
      valid = false;
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // stop if invalid

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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

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
