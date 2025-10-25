"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FacebookLogin from "@greatsumini/react-facebook-login";

export default function Login({ setToast }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginWithEmail, loginWithFacebook, loading, error } = useLogin();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(form.email, form.password);
      setToast?.({ message: "Login successful!", type: "success" });
    } catch (err) {
      console.error("Email login error:", err);
      setToast?.({
        message: err?.message || "Login failed",
        type: "error",
      });
    }
  };

  // -----------------------------
  // FACEBOOK LOGIN SUCCESS
  // -----------------------------
  const handleFbSuccess = async (response) => {
    console.group("FB Login Debug");
    console.log("Full FB response:", response);
    console.log("authResponse:", response?.authResponse);

    const accessToken = response?.accessToken;
    console.log("Extracted accessToken:", accessToken);

    if (!accessToken) {
      console.error("No access token found in Facebook response");
      setToast?.({
        message: "Facebook login failed: no access token",
        type: "error",
      });
      console.groupEnd();
      return;
    }

    try {
      await loginWithFacebook(accessToken);
      console.log("Logged in to backend with FB token!");
      setToast?.({
        message: "Login with Facebook successful!",
        type: "success",
      });
    } catch (err) {
      console.error("Facebook login error:", err);
      setToast?.({
        message: err?.message || "Facebook login failed",
        type: "error",
      });
    }
    console.groupEnd();
  };

  // -----------------------------
  // FACEBOOK LOGIN ERROR
  // -----------------------------
  const handleFbError = (err) => {
    console.error("FB Login error callback:", err);
    setToast?.({
      message: "Facebook login cancelled or failed",
      type: "error",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Sign in
        </h2>

        {/* EMAIL LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin border-2 border-t-2 border-white rounded-full w-5 h-5"></span>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* FACEBOOK LOGIN */}
        <div className="flex items-center justify-center space-x-3">
          <span className="text-sm text-gray-500">Or sign in with</span>

          <FacebookLogin
            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
            onSuccess={handleFbSuccess}
            onFail={handleFbError}
            onProfileSuccess={(profile) => {
              console.log("FB user profile:", profile);
            }}
            scope="public_profile,email"
            render={({ onClick }) => (
              <button
                onClick={() => {
                  console.log("FB login button clicked");
                  onClick();
                }}
                aria-label="Login with Facebook"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:shadow-sm"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="inline-block"
                >
                  <path
                    d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.22 10.44 22v-6.99H7.9v-2.94h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.85h2.74l-.44 2.94h-2.3V22C18.34 21.22 22 17.09 22 12.07z"
                    fill="#1877F2"
                  />
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            )}
          />
        </div>

        {/* REGISTER LINK */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
